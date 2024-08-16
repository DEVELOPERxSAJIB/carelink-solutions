import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import avatar from "../../src/assets/img/avatars/7.png";
import calling from "../assets/audio/ringing-151670.mp3";
import endCall from "../assets/audio/end-call-120633.mp3";
import { useGetAllUsersQuery, useMeQuery } from "../Redux/api/UserApi";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { getChatState, setChatData } from "./../Redux/slices/ChatSlic";
import EmojiPicker from "emoji-picker-react";

import {
  useCreateChatMutation,
  useGetAllChatsQuery,
  useGetAllChatsUsersQuery,
} from "../Redux/api/ChatApi";
const callingAudio = new Audio(calling);
const endCallAudio = new Audio(endCall);
callingAudio.loop = true;
const PushNotes = () => {
  const dispatch = useDispatch();
  const [activeChat, setActiveChat] = useState(null);
  const [chatUser, setChatUser] = useState(null);
  const [videoChat, setVideoChat] = useState(false);
  const [chat, setChat] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [dropMenu, setDropMenu] = useState(false);
  const [chatImage, setChatImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [activeUser, setActiveUser] = useState([]);
  const [sidebar, setSidebar] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [isCam, setIsCam] = useState(false);

  const socket = useRef(null);
  const scrollChat = useRef(null);
  const emojiClose = useRef(null);
  const peer = useRef(null);

  const { chatsData } = useSelector(getChatState);
  const { data: user } = useMeQuery();
  const { data: users } = useGetAllUsersQuery();
  const { data: chats, refetch } = useGetAllChatsQuery(chatUser?._id);
  const { data: loginChats } = useGetAllChatsUsersQuery(
    user?.payload?.user?._id
  );
  const [createChat, { data: newChat, isSuccess: isNewChatSuccess }] =
    useCreateChatMutation();

  useEffect(() => {
    // socket.current = io("http://localhost:5050");
     // Ensure you're using the correct protocol (https:// for secure, wss:// for WebSockets over HTTPS)
socket.current = io("https://carelinks-server.onrender.com", {
  transports: ['websocket', 'polling'],
  withCredentials: true
});

    socket?.current?.emit("setActiveUser", user?.payload?.user);
    socket?.current?.on("getActiveUser", (data) => setActiveUser(data));
    socket?.current?.on("realTimeMsgGet", (data) =>
      dispatch(setChatData([...(chatsData || []), data]))
    );
    socket?.current?.on("offer", handleIncomingCall);
    socket?.current?.on("call-accept", handleCallAccepted);
    socket?.current?.on("icecandidate", handleIceCandidate);
    socket?.current?.on("end-call", handleEndCall);
    socket?.current?.on("call-decline", handleCallDecline);
    return () => {
      socket?.current?.disconnect();
    };
  }, [user, dispatch, chatsData]);

  useEffect(() => {
    if (newChat?.chat) {
      socket?.current?.emit("realTimeMsgSend", newChat.chat);
    }
  }, [newChat?.chat]);

  useEffect(() => {
    scrollChat.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatsData, chats?.chats]);

  useEffect(() => {
    refetch();
    if (isNewChatSuccess) {
      setPreview(null);
    }
  }, [chatUser, refetch, newChat, isNewChatSuccess]);

  useEffect(() => {
    if (chats?.chats) {
      dispatch(setChatData(chats?.chats));
    } else {
      dispatch(setChatData([]));
    }
    refetch();
  }, [chats, dispatch, refetch]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, []);

  const handleChatCreate = (user) => {
    setActiveChat(user);
    setChatUser(user);
    setSidebar(false);
  };

  const handleMessageSend = (e) => {
    e.preventDefault();
    if (chat.trim() !== "") {
      const form_data = new FormData();
      form_data.append("chat", chat);
      form_data.append("receiverId", activeChat._id);
      form_data.append("chat-image", chatImage);

      createChat(form_data);
      setChat("");
      setChatImage(null);
    }
  };

  const handleChatPhoto = (e) => {
    setChatImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleEmojiSelect = (emojiObject) => {
    setChat((prevState) => prevState + " " + emojiObject.emoji);
  };

  const handleEmoji = () => {
    setShowEmoji(!showEmoji);
  };



  const handleClose = (e) => {
    if (emojiClose.current && !emojiClose.current.contains(e.target)) {
      setShowEmoji(false);
    }
  };

  const handleIncomingCall = (data) => {
    setIncomingCall(data);
    callingAudio.play()
    console.log(data);
  };

  const handleCallAccepted = (signal) => {
    setVideoChat(true);
    callingAudio.pause()
    peer.current
      .setRemoteDescription(new RTCSessionDescription(signal))
      .catch((error) =>
        console.error("Error setting remote description:", error)
      );
  };

  const handleIceCandidate = (data) => {
    // Ensure candidate is valid
    if (!data?.candidate) {
      console.warn("Received invalid ICE candidate");
      return;
    }

    // Check if peer connection is initialized
    if (peer?.current) {
      peer?.current
        ?.addIceCandidate(new RTCIceCandidate(data?.candidate))
        .catch((error) => console.error("Error adding ICE candidate:", error));
    } else {
      console.warn("Peer connection is not initialized");
    }
  };
  const peerConnectionConfig = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" }, // Google's public STUN server
      { urls: "turn:your-turn-server.com", username: "user", credential: "pass" } // Example TURN server
    ]
  };
  
 
  const initializePeerConnection = () => {
    if (!peer?.current) {
      peer.current = new RTCPeerConnection(peerConnectionConfig);

      peer.current.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("Sending ICE candidate");
          socket?.current?.emit("icecandidate", {
            userData: chatUser,
            candidate: event.candidate,
          });
        }
      };

      peer.current.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
      };
    }
  };

  const initiateCall = () => {
    setVideoChat(true);

    // Initialize peer if not already initialized
    initializePeerConnection();

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        console.log("Media stream acquired");
        setLocalStream(stream);
        stream
          .getTracks()
          .forEach((track) => peer.current?.addTrack(track, stream));

        return peer.current.createOffer();
      })
      .then((offer) => {
        console.log("Offer created", offer);
        return peer.current.setLocalDescription(offer);
      })
      .then(() => {
        console.log("Offer sent");
        socket?.current?.emit("offer", {
          userData: chatUser,
          offer: peer.current.localDescription,
        });
      })
      .catch((error) => {
        console.error("Error during call initiation:", error);
      });
  };

  const acceptCall = () => {
    callingAudio.pause()
    if (!incomingCall || !incomingCall.offer) {
      console.error("Incoming call signal is missing or invalid");
      return;
    }

    setIncomingCall(null);
    setVideoChat(true);

    peer.current = new RTCPeerConnection(peerConnectionConfig);
    peer.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket?.current?.emit("icecandidate", {
          userData: incomingCall.userData,
          candidate: event.candidate,
        });
      }
    };

    peer.current.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };

    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        if (videoDevices.length === 0) {
          console.error("No video devices available.");
          return;
        }

        return navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
      })
      .then((stream) => {
        setLocalStream(stream);
        stream
          .getTracks()
          .forEach((track) => peer?.current?.addTrack(track, stream));

        peer.current
          .setRemoteDescription(new RTCSessionDescription(incomingCall.offer))
          .then(() => peer.current.createAnswer())
          .then((answer) => peer.current.setLocalDescription(answer))
          .then(() => {
            socket?.current?.emit("answer", {
              answer: peer.current.localDescription,
              userData: incomingCall.userData,
            });
          })
          .catch((error) =>
            console.error("Error during call acceptance:", error)
          );
      })
      .catch((error) => {
        if (error.name === "NotAllowedError") {
          console.error("Permission to access media devices was denied.");
        } else if (error.name === "NotFoundError") {
          console.error("No media devices found.");
        } else if (error.name === "NotReadableError") {
          console.error("Media devices are already in use.");
        } else if (error.name === "OverconstrainedError") {
          console.error("Constraints could not be satisfied.");
        } else {
          console.error("Error accessing media devices:", error);
        }
      });
  };

  const declineCall = () => {
    setIncomingCall(null);
    callingAudio.pause()
    socket?.current?.emit("call-decline", {
      userData: chatUser,
    });
    createChat({chat:"missed call",receiverId:chatUser?._id});
  };

  const toggleAudio = () => {
    setIsMute(!isMute)

    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      console.log(audioTrack.enabled ? "Audio Unmuted" : "Audio Muted");
    }
  };

  const toggleVideo = () => {
    setIsCam(!isCam)
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      console.log(videoTrack.enabled ? "Camera On" : "Camera Off");
    }
  };

  const endCall = () => {
    
    if (peer.current) {
      peer?.current?.close();
      peer.current = null;
      socket?.current?.emit("end-call", { userData: chatUser });
      setVideoChat(false);
      const form_data = new FormData();
      form_data.append("chat", chat);
      form_data.append("receiverId", activeChat._id);

      createChat({chat:"call end",receiverId:chatUser?._id});
    }
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }
    if (remoteStream) {
      remoteStream.getTracks().forEach((track) => track.stop());
      setRemoteStream(null);
    }
    endCallAudio.play()
  };

  const handleEndCall = (data) => {
    setIncomingCall(null)
  
    setVideoChat(false);
    if (peer.current) {
      peer?.current?.close();
      peer.current = null;
    }
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }
    if (remoteStream) {
      remoteStream.getTracks().forEach((track) => track.stop());
      setRemoteStream(null);
    }
    endCallAudio.paly()
  };
  const handleCallDecline = (data) => {
    setIncomingCall(null);
    callingAudio.pause()
    if (peer.current) {
      peer.current.close();
      peer.current = null;
    }

    // Stop all tracks and release local media resources
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }

    // Stop all tracks and release remote media resources
    if (remoteStream) {
      remoteStream.getTracks().forEach((track) => track.stop());
      setRemoteStream(null);
    }
    // Update UI or state to reflect that the call was declined
    setVideoChat(false);
    endCallAudio.paly()
  };

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };
  // Users who have an existing chat with the logged-in user
  const filteredChattedUsers = users?.payload?.users?.filter((user) =>
    loginChats?.chats?.some(
      (chat) =>
        chat?.senderId === user?.userInfo?._id ||
        chat?.receiverId === user?.userInfo?._id
    )
  );

  // Users who do not have an existing chat with the logged-in user
  const filteredNonChattedUsers = users?.payload?.users?.filter(
    (user) =>
      !loginChats?.chats?.some(
        (chat) =>
          chat?.senderId === user?.userInfo?._id ||
          chat?.receiverId === user?.userInfo?._id
      )
  );

  return (
    <div className="row">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="app-chat card overflow-hidden">
          <div className="row g-0">
            {/* Sidebar Left */}
            <div
              className="col app-chat-sidebar-left app-sidebar overflow-hidden"
              id="app-chat-sidebar-left"
            >
              <div className="chat-sidebar-left-user sidebar-header d-flex flex-column justify-content-center align-items-center flex-wrap px-6 pt-12">
                <div className="avatar avatar-xl avatar-online chat-sidebar-avatar">
                  <img src={avatar} alt="Avatar" className="rounded-circle" />
                </div>
                <h5 className="mt-4 mb-0">John Doe</h5>
                <span>Admin</span>
                <button className="btn" onClick={() => setSidebar(false)}>
                  <i
                    className="ti ti-x ti-lg cursor-pointer close-sidebar"
                    data-bs-toggle="sidebar"
                    data-overlay=""
                    data-target="#app-chat-sidebar-left"
                  />
                </button>
              </div>
              <div className="sidebar-body px-6 pb-6">
                <div className="my-6">
                  <label
                    htmlFor="chat-sidebar-left-user-about"
                    className="text-uppercase  mb-1"
                  >
                    About
                  </label>
                  <textarea
                    id="chat-sidebar-left-user-about"
                    className="form-control chat-sidebar-left-user-about"
                    rows={3}
                    maxLength={120}
                    defaultValue={
                      "Hey there, we’re just writing to let you know that you’ve been subscribed to a repository on GitHub."
                    }
                  />
                </div>
                <div className="my-6">
                  <p className="text-uppercase  mb-1">Status</p>
                  <div className="d-grid gap-2 pt-2 text-heading ms-2">
                    <div className="form-check form-check-success">
                      <input
                        name="chat-user-status"
                        className="form-check-input"
                        type="radio"
                        defaultValue="active"
                        id="user-active"
                        defaultChecked=""
                      />
                      <label className="form-check-label" htmlFor="user-active">
                        Online
                      </label>
                    </div>
                    <div className="form-check form-check-warning">
                      <input
                        name="chat-user-status"
                        className="form-check-input"
                        type="radio"
                        defaultValue="away"
                        id="user-away"
                      />
                      <label className="form-check-label" htmlFor="user-away">
                        Away
                      </label>
                    </div>
                    <div className="form-check form-check-danger">
                      <input
                        name="chat-user-status"
                        className="form-check-input"
                        type="radio"
                        defaultValue="busy"
                        id="user-busy"
                      />
                      <label className="form-check-label" htmlFor="user-busy">
                        Do not Disturb
                      </label>
                    </div>
                    <div className="form-check form-check-secondary">
                      <input
                        name="chat-user-status"
                        className="form-check-input"
                        type="radio"
                        defaultValue="offline"
                        id="user-offline"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="user-offline"
                      >
                        Offline
                      </label>
                    </div>
                  </div>
                </div>
                <div className="my-6">
                  <p className="text-uppercase  mb-1">Settings</p>
                  <ul className="list-unstyled d-grid gap-4 ms-2 pt-2 text-heading">
                    <li className="d-flex justify-content-between align-items-center">
                      <div>
                        <i className="ti ti-lock ti-md me-1" />
                        <span className="align-middle">
                          Two-step Verification
                        </span>
                      </div>
                      <div className="form-check form-switch mb-0 me-1">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          defaultChecked=""
                        />
                      </div>
                    </li>
                    <li className="d-flex justify-content-between align-items-center">
                      <div>
                        <i className="ti ti-bell ti-md me-1" />
                        <span className="align-middle">Notification</span>
                      </div>
                      <div className="form-check form-switch mb-0 me-1">
                        <input type="checkbox" className="form-check-input" />
                      </div>
                    </li>
                    <li>
                      <i className="ti ti-user-plus ti-md me-1" />
                      <span className="align-middle">Invite Friends</span>
                    </li>
                    <li>
                      <i className="ti ti-trash ti-md me-1" />
                      <span className="align-middle">Delete Account</span>
                    </li>
                  </ul>
                </div>
                <div className="d-flex mt-6">
                  <button
                    className="btn btn-primary w-100"
                    data-bs-toggle="sidebar"
                    data-overlay=""
                    data-target="#app-chat-sidebar-left"
                  >
                    Logout
                    <i className="ti ti-logout ti-16px ms-2" />
                  </button>
                </div>
              </div>
            </div>
            {/* /Sidebar Left*/}
            {/* Chat & Contacts */}
            <div
              className={`col app-chat-contacts app-sidebar bg-white flex-grow-0 overflow-hidden border-end ${
                sidebar ? "show" : ""
              }`}
              id="app-chat-contacts"
            >
              <div className="sidebar-header h-px-75 px-5 border-bottom d-flex align-items-center">
                <div className="d-flex align-items-center me-6 me-lg-0">
                  <div
                    className="flex-shrink-0 avatar  me-4"
                    data-bs-toggle="sidebar"
                    data-overlay="app-overlay-ex"
                    data-target="#app-chat-sidebar-left"
                  >
                    <img
                      className="user-avatar rounded-circle cursor-pointer"
                      src={avatar}
                      alt="Avatar"
                    />
                  </div>
                  <div className="flex-grow-1 input-group input-group-merge">
                    <span
                      className="input-group-text"
                      id="basic-addon-search31"
                    >
                      <i className="ti ti-search" />
                    </span>
                    <input
                      type="text"
                      className="form-control chat-search-input"
                      placeholder="Search..."
                      aria-label="Search..."
                      aria-describedby="basic-addon-search31"
                    />
                  </div>
                </div>
                <button onClick={() => setSidebar(false)} className="btn">
                  <i
                    className="ti ti-x ti-lg cursor-pointer position-absolute top-50 end-0 translate-middle d-lg-none d-block"
                    data-overlay=""
                    data-bs-toggle="sidebar"
                    data-target="#app-chat-contacts"
                  />
                </button>
              </div>
              <div className="sidebar-body">
                {/* Chats */}
                <ul
                  className="list-unstyled chat-contact-list py-2 mb-0"
                  id="chat-list"
                >
                  <li className="chat-contact-list-item chat-contact-list-item-title mt-0">
                    <h5 className="text-primary mb-0">Chats</h5>
                  </li>
                  {filteredChattedUsers?.length > 0 ? (
                    <>
                      {filteredChattedUsers?.map((item, index) => {
                        return (
                          <li
                            key={index}
                            onClick={() => handleChatCreate(item?.userInfo)}
                            className="chat-contact-list-item mb-1"
                          >
                            <a className="d-flex align-items-center">
                              <div
                                className={`flex-shrink-0 avatar ${
                                  activeUser?.some(
                                    (activeItem) =>
                                      activeItem.userId === item?.userInfo?._id
                                  )
                                    ? "avatar-online"
                                    : "avatar-offline"
                                }`}
                              >
                                <img
                                  src={avatar}
                                  alt="Avatar"
                                  className="rounded-circle"
                                />
                              </div>

                              <div className="chat-contact-info flex-grow-1 ms-4">
                                <div className="d-flex justify-content-between align-items-center">
                                  <h6 className="chat-contact-name text-truncate m-0 fw-normal">
                                    {item?.userInfo?.firstName}
                                    {item?.userInfo?.lastName}
                                  </h6>
                                </div>
                                <small className="chat-contact-status text-truncate">
                                  {item?.lastMsg?.message?.text}
                                </small>
                                <small className="">
                                  {moment(item?.lastMsg?.createdAt).fromNow()}
                                </small>
                              </div>
                            </a>
                          </li>

                          // avatar avatar-busy
                          // avatar avatar-offline
                        );
                      })}
                    </>
                  ) : (
                    <li className="chat-contact-list-item chat-list-item-0">
                      <h6 className=" mb-0 text-danger">No Chats Found</h6>
                    </li>
                  )}
                </ul>
                {/* Contacts */}
                <ul
                  className="list-unstyled chat-contact-list mb-0 py-2"
                  id="contact-list"
                >
                  <li className="chat-contact-list-item chat-contact-list-item-title mt-0">
                    <h5 className="text-primary mb-0">Contacts</h5>
                  </li>

                  {filteredNonChattedUsers?.length > 0 ? (
                    filteredNonChattedUsers?.map((item, index) => {
                      return (
                        <li
                          key={index}
                          onClick={() => handleChatCreate(item?.userInfo)}
                          className="chat-contact-list-item mb-0"
                        >
                          <a className="d-flex align-items-center">
                            <div className="flex-shrink-0 avatar">
                              <img
                                src={avatar}
                                alt="Avatar"
                                className="rounded-circle"
                              />
                            </div>
                            <div className="chat-contact-info flex-grow-1 ms-4">
                              <h6 className="chat-contact-name text-truncate m-0 fw-normal">
                                {item?.userInfo?.firstName}
                                {item?.userInfo?.lastName}
                              </h6>
                              <small className="chat-contact-status text-truncate">
                                {item?.userInfo?.role}
                              </small>
                            </div>
                          </a>
                        </li>
                      );
                    })
                  ) : (
                    <li className="chat-contact-list-item contact-list-item-0 ">
                      <h6 className=" mb-0 text-danger">No Contacts Found</h6>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            {/* /Chat contacts */}
            {/* Chat History */}
            <div className="col app-chat-history">
              <div className="chat-history-wrapper">
                {chatUser && !videoChat ? (
                  <>
                    <div className="chat-history-header border-bottom">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex overflow-hidden align-items-center">
                          <button
                            onClick={() => setSidebar(!sidebar)}
                            className="btn btn-sm"
                          >
                            <i
                              className="ti ti-menu-2 ti-lg cursor-pointer d-lg-none d-block "
                              data-bs-toggle="sidebar"
                              data-overlay=""
                              data-target="#app-chat-contacts"
                            />
                          </button>
                          <div
                            className={`flex-shrink-0 avatar  ${
                              activeUser?.some(
                                (item) => item.userId === chatUser._id
                              )
                                ? "avatar-online"
                                : "avatar-offline"
                            }`}
                          >
                            <img
                              src={avatar}
                              alt="Avatar"
                              className="rounded-circle"
                              data-bs-toggle="sidebar"
                              data-overlay=""
                              data-target="#app-chat-sidebar-right"
                            />
                          </div>
                          <div className="chat-contact-info flex-grow-1 ms-4">
                            <h6 className="m-0 fw-normal">
                              {chatUser?.firstName}
                              {chatUser?.lastName}
                            </h6>
                            <small className="user-status text-body">
                              {chatUser?.role}
                            </small>
                          </div>
                        </div>
                        {dropMenu && (
                          <div className="d-flex gap-3 align-items-center">
                            <i className="ti ti-search ti-md cursor-pointer d-sm-inline-flex  me-1 btn btn-sm btn-text-secondary text-white btn-icon rounded-pill" />
                            <div className="dropdown">
                              <button
                                className="btn btn-sm btn-icon btn-text-secondary text-white rounded-pill dropdown-toggle hide-arrow"
                                data-bs-toggle="dropdown"
                                aria-expanded="true"
                                id="chat-header-actions"
                              >
                                <i className="ti ti-dots-vertical ti-md" />
                              </button>
                              <div
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="chat-header-actions"
                              >
                                <a className="dropdown-item" href="#">
                                  View Contact
                                </a>
                                <a className="dropdown-item" href="#">
                                  Mute Notifications
                                </a>
                                <a className="dropdown-item" href="#">
                                  Block Contact
                                </a>
                                <a className="dropdown-item" href="#">
                                  Clear Chat
                                </a>
                                <a className="dropdown-item" href="#">
                                  Report
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="call d-flex gap-3 align-items-center">
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={initiateCall}
                          >
                            <i className="ti ti-phone"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={initiateCall}
                          >
                            <i className="ti ti-video"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="chat-history-body ">
                      {incomingCall && (
                        <div
                          style={{
                            zIndex: 100,
                            left: 0,
                            padding: "0 10px 0 10px",
                          }}
                          className="position-absolute d-flex align-items-center gap-3 justify-content-between top-0 left-0 bg-secondary w-100 text-light"
                        >
                          <p className="mt-3 text-success">
                             <span className="text-white">{incomingCall?.userData?.firstName} {incomingCall?.userData?.lastName}</span> is calling...
                          </p>
                          <div className="d-flex gap-3 align-items-center ">
                            <button
                              className="btn btn-sm btn-success d-flex align-items-center gap-2"
                              onClick={acceptCall}
                            >
                             <i className="ti ti-phone"></i> accept
                            </button>
                            <button
                              className="btn btn-sm btn-danger d-flex align-items-center gap-2"
                              onClick={declineCall}
                            >
                            <i className="ti ti-phone-off"></i>   decline
                            </button>
                          </div>
                        </div>
                      )}

                      <ul className="list-unstyled chat-history chat-scrollbar">
                        {chatsData && chatsData?.length > 0 ? (
                          chatsData?.map((item, index) => {
                            return (
                              <li
                                key={index}
                                className={`chat-message ${
                                  item?.senderId !== chatUser?._id
                                    ? "chat-message-right text-light"
                                    : ""
                                } `}
                              >
                                <div
                                  className={`d-flex overflow-hidden ${
                                    item?.senderId !== chatUser?._id
                                      ? ""
                                      : "flex-row-reverse"
                                  } `}
                                >
                                  <div className="chat-message-wrapper flex-grow-1">
                                    <div className="chat-message-text">
                                      <p className={`mb-0 ${item?.message?.text=="missed call"||item?.message?.text=="call end"?"text-danger":""}`}>
                                        {item?.message?.text}
                                      </p>
                                    </div>
                                    <div className="text-end  mt-1">
                                      <i className="ti ti-checks ti-16px text-success me-1" />
                                      <small>
                                        {moment(item?.createdAt).fromNow()}
                                      </small>
                                    </div>
                                  </div>
                                  <div className="user-avatar flex-shrink-0 ms-4">
                                    <div className="avatar avatar-sm">
                                      <img
                                        src={avatar}
                                        alt="Avatar"
                                        className="rounded-circle"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })
                        ) : (
                          <p className="text-center">No Chat</p>
                        )}
                        <li ref={scrollChat}></li>
                      </ul>
                    </div>
                    {/* Chat message form */}
                    <div className="chat-history-footer shadow-xs position-relative">
                      <form
                        onSubmit={handleMessageSend}
                        className="form-send-message d-flex justify-content-between align-items-center"
                      >
                        <div style={{ position: "absolute", bottom: "55px" }}>
                          {preview && (
                            <img
                              style={{ width: "50px", height: "50px" }}
                              src={preview}
                              alt=""
                            />
                          )}
                        </div>
                        <input
                          value={chat}
                          onChange={(e) => setChat(e.target.value)}
                          className="form-control message-input border-0 me-4 shadow-none"
                          placeholder="Type your message here..."
                        />
                        <div className="message-actions d-flex justify-center align-items-center">
                          <label
                            htmlFor="attach-doc"
                            className="form-label d-block mb-0"
                          >
                            <i className="speech-to-text ti ti-microphone ti-md btn btn-sm btn-text-secondary btn-icon rounded-pill cursor-pointer text-heading" />
                          </label>
                          <label
                            htmlFor="attach-doc"
                            className="form-label  d-flex align-items-center mb-0"
                          >
                            <i className="ti ti-paperclip ti-md cursor-pointer btn btn-sm btn-text-secondary btn-icon rounded-pill mx-1 text-heading" />
                            <input
                              type="file"
                              onChange={handleChatPhoto}
                              id="attach-doc"
                              hidden="true"
                            />
                          </label>
                          <span className="btn" onClick={handleEmoji}>
                            <i
                              style={{ color: "#ffd900" }}
                              className="ti ti-mood-happy"
                            ></i>
                          </span>
                          <button
                            type="submit"
                            className="btn btn-primary d-flex send-msg-btn"
                          >
                            <span className="align-middle d-md-inline-block ">
                              Send
                            </span>
                            <i className="ti ti-send ti-16px ms-md-2 ms-0" />
                          </button>
                          {showEmoji && (
                            <div
                              ref={emojiClose}
                              style={{
                                position: "absolute",
                                bottom: "100px",
                                right: "50px",
                              }}
                            >
                              <EmojiPicker onEmojiClick={handleEmojiSelect} />
                            </div>
                          )}
                        </div>
                      </form>
                    </div>
                  </>
                ) : (
                  !videoChat && (
                    <div
                      style={{
                        margin: "0 auto",
                        display: "flex",
                        width: "100%",
                        height: "70vh",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <p className="text-success">Welcome,chat and connect!</p>
                      <button
                        className="btn btn-primary"
                        onClick={handleSidebar}
                      >
                        Start Conversation
                      </button>
                    </div>
                  )
                )}
               

                {videoChat && (
                  <div style={{width:"100%",height:"100%"}} className="video-chat-container border d-flex flex-column align-items-center justify-content-center">
                    <div style={{width:"100%",height:"100%"}} className="video-streams border overflow-hidden">
                      <video
                        style={{height:"",width:"100%"}}
                        ref={(ref) => ref && (ref.srcObject = localStream)}
                        autoPlay
                        muted
                        className="local-video"
                      />
                      <video
                       style={{height:"",width:"100%"}}
                        ref={(ref) => ref && (ref.srcObject = remoteStream)}
                        autoPlay
                        className="remote-video"
                      />
                    </div>
                    <div style={{position:"absolute",zIndex:50,bottom:"10px"}} className="video-controls  d-flex align-items-center justify-content-end gap-3 mr-5 mt-auto">
                      <button onClick={toggleAudio} className="btn btn-secondary">
                        {isMute?<i className="ti ti-microphone" />:<i className="ti ti-microphone-off" />}
                      </button>
                      <button onClick={toggleVideo} className="btn btn-secondary">
                        {isCam?<i className="ti ti-camera" />:<i className="ti ti-camera-off" />}
                      </button>
                      <button onClick={endCall} className="btn btn-danger">
                      <i className="ti ti-phone-off" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* /Chat History */}
            {/* Sidebar Right */}
            <div
              className="col app-chat-sidebar-right app-sidebar overflow-hidden"
              id="app-chat-sidebar-right"
            >
              <div className="sidebar-header d-flex flex-column justify-content-center align-items-center flex-wrap px-6 pt-12">
                <div className="avatar avatar-xl avatar-online chat-sidebar-avatar">
                  <img src={avatar} alt="Avatar" className="rounded-circle" />
                </div>
                <h5 className="mt-4 mb-0">Felecia Rower</h5>
                <span>NextJS Developer</span>
                <button onClick={() => setSidebar(false)}>
                  <i
                    className="ti ti-x ti-lg cursor-pointer close-sidebar d-block"
                    data-bs-toggle="sidebar"
                    data-overlay=""
                    data-target="#app-chat-sidebar-right"
                  />
                </button>
              </div>
              <div className="sidebar-body p-6 pt-0">
                <div className="my-6">
                  <p className="text-uppercase mb-1 ">About</p>
                  <p className="mb-0">
                    It is a long established fact that a reader will be
                    distracted by the readable content .
                  </p>
                </div>
                <div className="my-6">
                  <p className="text-uppercase mb-1 ">Personal Information</p>
                  <ul className="list-unstyled d-grid gap-4 mb-0 ms-2 py-2 text-heading">
                    <li className="d-flex align-items-center">
                      <i className="ti ti-mail ti-md" />
                      <span className="align-middle ms-2">
                        josephGreen@email.com
                      </span>
                    </li>
                    <li className="d-flex align-items-center">
                      <i className="ti ti-phone-call ti-md" />
                      <span className="align-middle ms-2">
                        +1(123) 456 - 7890
                      </span>
                    </li>
                    <li className="d-flex align-items-center">
                      <i className="ti ti-clock ti-md" />
                      <span className="align-middle ms-2">
                        Mon - Fri 10AM - 8PM
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="my-6">
                  <p className="text-uppercase  mb-1">Options</p>
                  <ul className="list-unstyled d-grid gap-4 ms-2 py-2 text-heading">
                    <li className="cursor-pointer d-flex align-items-center">
                      <i className="ti ti-badge ti-md" />
                      <span className="align-middle ms-2">Add Tag</span>
                    </li>
                    <li className="cursor-pointer d-flex align-items-center">
                      <i className="ti ti-star ti-md" />
                      <span className="align-middle ms-2">
                        Important Contact
                      </span>
                    </li>
                    <li className="cursor-pointer d-flex align-items-center">
                      <i className="ti ti-photo ti-md" />
                      <span className="align-middle ms-2">Shared Media</span>
                    </li>
                    <li className="cursor-pointer d-flex align-items-center">
                      <i className="ti ti-trash ti-md" />
                      <span className="align-middle ms-2">Delete Contact</span>
                    </li>
                    <li className="cursor-pointer d-flex align-items-center">
                      <i className="ti ti-ban ti-md" />
                      <span className="align-middle ms-2">Block Contact</span>
                    </li>
                  </ul>
                </div>
                <div className="d-flex mt-6">
                  <button
                    className="btn btn-danger w-100"
                    data-bs-toggle="sidebar"
                    data-overlay=""
                    data-target="#app-chat-sidebar-right"
                  >
                    Delete Contact
                    <i className="ti ti-trash ti-16px ms-2" />
                  </button>
                </div>
              </div>
            </div>
            {/* /Sidebar Right */}
            <div className="app-overlay" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PushNotes;

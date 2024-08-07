import PopupModal from "./../components/Models/PopupModel";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import avatar from "../../src/assets/img/avatars/7.png";
import calling from "../assets/audio/ringing-151670.mp3";
import endCall from "../assets/audio/end-call-120633.mp3";
import { useGetAllUsersQuery, useMeQuery } from "../Redux/api/UserApi";
import moment from "moment";
import {
  useCreateChatMutation,
  useGetAllChatsQuery,
} from "../Redux/api/ChatApi";
const PushNotes = () => {
  const [chatUser, setChatUser] = useState(null);
  const { data: lgData } = useMeQuery();
  const { data: users, refetch: userRefetch } = useGetAllUsersQuery();
  const {
    data: chats,
    refetch,
    isLoading: isChatLoading,
  } = useGetAllChatsQuery(chatUser?._id);

  const [createChat, { data: newChat, isSuccess: isNewChatSuccess, error }] =
    useCreateChatMutation();
  const [count, setCount] = useState(1);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [availableCameras, setAvailableCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const socketRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const callingSoundRef = useRef(new Audio());
  const endCallSoundRef = useRef(new Audio());
  const roomRef = useRef("room1");
  const [activeUsers, setActiveUsers] = useState([]);
  const [chatImage, setChatImage] = useState(null);
  useEffect(() => {
    // Fetch available cameras
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      setAvailableCameras(videoDevices);
      if (videoDevices.length > 0) {
        setSelectedCamera(videoDevices[0].deviceId);
      }
    });

    // Initialize the socket connection
    socketRef.current = io("http://localhost:5050");
    socketRef.current.emit("setActiveUser", lgData?.payload?.user);
    socketRef.current.on("getActiveUser", (data) => {
      //console.log(data);
      setActiveUsers(data);
    });
    // Set up media stream and WebRTC connection
    const constraints = {
      video: { deviceId: { exact: selectedCamera } },
      audio: true,
    };
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      mediaStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      const configuration = {
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      };
      peerConnectionRef.current = new RTCPeerConnection(configuration);
      stream
        .getTracks()
        .forEach((track) => peerConnectionRef.current.addTrack(track, stream));

      peerConnectionRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          socketRef.current.emit("candidate", {
            room: roomRef.current,
            candidate: event.candidate,
          });
        }
      };

      peerConnectionRef.current.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      socketRef.current.on("offer", (offer) => {
        peerConnectionRef.current.setRemoteDescription(
          new RTCSessionDescription(offer)
        );
        peerConnectionRef.current.createAnswer().then((answer) => {
          peerConnectionRef.current.setLocalDescription(answer);
          socketRef.current.emit("answer", { room: roomRef.current, answer });
        });
      });

      socketRef.current.on("answer", (answer) => {
        peerConnectionRef.current.setRemoteDescription(
          new RTCSessionDescription(answer)
        );
      });

      socketRef.current.on("candidate", (candidate) => {
        peerConnectionRef.current.addIceCandidate(
          new RTCIceCandidate(candidate)
        );
      });
      socketRef.current.on("setActiveUser", (data) => {
        //console.log(data);
      });

      socketRef.current.on("message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      // Create an offer to initiate a call
      peerConnectionRef.current.createOffer().then((offer) => {
        peerConnectionRef.current.setLocalDescription(offer);
        socketRef.current.emit("offer", { room: roomRef.current, offer });
        playSound(callingSoundRef, calling); // Set the source dynamically
      });
    });

    // Cleanup on component unmount
    return () => {
      handleEndCall();
    };
  }, []);

  const handleCameraChange = (event) => {
    setSelectedCamera(event.target.value);
    switchCamera(event.target.value);
  };

  const switchCamera = (deviceId) => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    const constraints = {
      video: { deviceId: { exact: deviceId } },
      audio: true,
    };
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      mediaStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      stream
        .getTracks()
        .forEach((track) => peerConnectionRef.current.addTrack(track, stream));
    });
  };

  const toggleAudio = () => {
    if (mediaStreamRef.current) {
      const audioTracks = mediaStreamRef.current.getAudioTracks();
      if (audioTracks.length > 0) {
        audioTracks[0].enabled = !isAudioEnabled;
        setIsAudioEnabled(!isAudioEnabled);
      }
    }
  };

  const toggleVideo = () => {
    if (mediaStreamRef.current) {
      const videoTracks = mediaStreamRef.current.getVideoTracks();
      if (videoTracks.length > 0) {
        videoTracks[0].enabled = !isVideoEnabled;
        setIsVideoEnabled(!isVideoEnabled);
      }
    }
  };

  const handleEndCall = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    stopSound(callingSoundRef, endCall, false);
    playSound(endCallSoundRef, endCall);
    setIsVideoEnabled(false); // Set the source dynamically
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
  };

  const playSound = (audioRef, src, loop) => {
    if (audioRef.current) {
      audioRef.current.src = src; // Set the source dynamically
      audioRef.current.currentTime = 0;
      audioRef.current.loop = loop; // Enable continuous playback
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
  };

  const stopSound = (audioRef) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleChatCreate = (data) => {
    //console.log(data);
    localStorage.setItem("ChatUser", JSON.stringify(data));
    setChatUser(data);
  };
  const handleSendMessage = (e) => {
    e.preventDefault();
    const form_data = new FormData();
    form_data.append("chat", message);
    form_data.append("receiverId", chatUser?._id);
    if (chatImage) {
      form_data.append("chat-image", chatImage);
    }

    createChat(form_data);
  };
  useEffect(() => {
    refetch();
  }, [chatUser]);
  useEffect(() => {
    const localChatData = JSON.parse(localStorage.getItem("ChatUser"));
    setChatUser(localChatData);
  }, [chatUser]);
  return (
    <div className="row">
      <div className="col-12 d-flex justify-content-center">
        {/* <PopupModal title="Add Note" id="Add_Note">
          <form onSubmit={handleSubmit}>
            {count === 1 && (
              <>
                <div className="mb-3">
                  <input
                    type="file"
                    id="Note_title"
                    name="title"
                    className="form-control"
                    placeholder="Enter title"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Note_title" className="form-label">
                    Note Title
                  </label>
                  <input
                    type="text"
                    id="Note_title"
                    name="title"
                    className="form-control"
                    placeholder="Enter title"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Note_description" className="form-label">
                    Note Description
                  </label>
                  <input
                    type="text"
                    id="Note_description"
                    name="description"
                    className="form-control"
                    placeholder="Enter description"
                    required
                  />
                </div>
                <button
                  onClick={() => setCount(2)}
                  type="submit"
                  className="btn btn-primary"
                >
                  <i className="ti ti-arrow-right"></i>
                </button>
              </>
            )}
            {count === 2 && (
              <>
                <input
                  type="search"
                  className="form-control"
                  placeholder="search"
                />
                <div className="d-flex flex-column gap-4 mt-5">
                  <div className="chat-contact-list-item d-flex align-items-center justify-content-between">
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
                          Krystal Norton
                        </h6>
                        <small className="chat-contact-status text-truncate">
                          Business Executive
                        </small>
                      </div>
                    </a>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="chat-contact-list-item d-flex align-items-center justify-content-between">
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
                          Krystal Norton
                        </h6>
                        <small className="chat-contact-status text-truncate">
                          Business Executive
                        </small>
                      </div>
                    </a>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="chat-contact-list-item d-flex align-items-center justify-content-between">
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
                          Krystal Norton
                        </h6>
                        <small className="chat-contact-status text-truncate">
                          Business Executive
                        </small>
                      </div>
                    </a>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="chat-contact-list-item d-flex align-items-center justify-content-between">
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
                          Krystal Norton
                        </h6>
                        <small className="chat-contact-status text-truncate">
                          Business Executive
                        </small>
                      </div>
                    </a>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="chat-contact-list-item d-flex align-items-center justify-content-between">
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
                          Krystal Norton
                        </h6>
                        <small className="chat-contact-status text-truncate">
                          Business Executive
                        </small>
                      </div>
                    </a>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="d-flex gap-3 align-items-center">
                    <button
                      onClick={() => setCount(1)}
                      type="submit"
                      className="btn btn-primary"
                    >
                      <i className="ti ti-arrow-left"></i>
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Done
                    </button>
                  </div>
                </div>
              </>
            )}
          </form>
        </PopupModal> */}
      </div>

      <div className="container-xxl flex-grow-1 container-p-y">
        <div></div>
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
                <i
                  className="ti ti-x ti-lg cursor-pointer close-sidebar"
                  data-bs-toggle="sidebar"
                  data-overlay=""
                  data-target="#app-chat-sidebar-left"
                />
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
              className="col app-chat-contacts app-sidebar flex-grow-0 overflow-hidden border-end"
              id="app-chat-contacts"
            >
              <div className="sidebar-header h-px-75 px-5 border-bottom d-flex align-items-center">
                <div className="d-flex align-items-center me-6 me-lg-0">
                  <div
                    className="flex-shrink-0 avatar avatar-online me-4"
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
                <i
                  className="ti ti-x ti-lg cursor-pointer position-absolute top-50 end-0 translate-middle d-lg-none d-block"
                  data-overlay=""
                  data-bs-toggle="sidebar"
                  data-target="#app-chat-contacts"
                />
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
                  {users?.payload?.users?.length > 0 ? (
                    <>
                      {users?.payload?.users?.map((item, index) => {
                        return (
                          <li
                            key={index}
                            className="chat-contact-list-item mb-1"
                          >
                            <a className="d-flex align-items-center">
                              <div className="flex-shrink-0 avatar avatar-online">
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
                                  <small className="">
                                    {moment(item?.createdAt).fromNow()}
                                  </small>
                                </div>
                                <small className="chat-contact-status text-truncate">
                                  {item?.lastMsg?.message?.text}
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
                    <li className="chat-contact-list-item chat-list-item-0 d-none">
                      <h6 className=" mb-0">No Chats Found</h6>
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
                  <li className="chat-contact-list-item contact-list-item-0 d-none">
                    <h6 className=" mb-0">No Contacts Found</h6>
                  </li>
                  {users?.payload?.users?.map((item, index) => {
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
                              {item?.userInfo?.firstName} {""}
                              {item?.userInfo?.lastName}
                            </h6>
                            <small className="chat-contact-status text-truncate">
                              {item?.userInfo?.role}
                            </small>
                          </div>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            {/* /Chat contacts */}
            {/* Chat History */}
            {chatUser && (
              <div className="col app-chat-history">
                <div className="chat-history-wrapper">
                  <div className="chat-history-header border-bottom">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex overflow-hidden align-items-center">
                        <i
                          className="ti ti-menu-2 ti-lg cursor-pointer d-lg-none d-block me-4"
                          data-bs-toggle="sidebar"
                          data-overlay=""
                          data-target="#app-chat-contacts"
                        />
                        <div className="flex-shrink-0 avatar avatar-online">
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
                      <div className="d-flex gap-3 align-items-center">
                        <PopupModal
                          style={{ minWidth: "500px", maxHeight: "80vh" }}
                          title={
                            <i
                              className={`ti ti-video ti-md cursor-pointer d-sm-inline-flex d-none me-1 btn btn-sm btn-text-secondary text-white btn-icon rounded-pill ${
                                isVideoEnabled ? "" : ""
                              }`}
                            />
                          }
                          id="video"
                        >
                          <div className="modal-body">
                            <video
                              style={{ width: "100%" }}
                              ref={localVideoRef}
                              autoPlay
                              playsInline
                              muted
                            ></video>
                            <video
                              style={{ width: "100%" }}
                              ref={remoteVideoRef}
                              autoPlay
                              playsInline
                              className="d-none"
                            ></video>
                            <div className="d-flex gap-3">
                              <button
                                onClick={toggleAudio}
                                className={`btn ${
                                  isAudioEnabled ? "btn-success" : "btn-warning"
                                } btn-secondary`}
                              >
                                <i
                                  className={`ti ${
                                    isAudioEnabled
                                      ? "ti-microphone"
                                      : "ti-microphone-off"
                                  } ti-md`}
                                ></i>
                              </button>
                              <button
                                onClick={toggleVideo}
                                className={`btn ${
                                  isVideoEnabled
                                    ? "btn-primary"
                                    : "btn-secondary"
                                } btn-secondary`}
                              >
                                <i
                                  className={`ti ti-md cursor-pointer d-sm-inline-flex d-none me-1 btn btn-sm btn-text-secondary text-white btn-icon rounded-pill ${
                                    isVideoEnabled
                                      ? "ti-video"
                                      : "ti-video-off "
                                  }`}
                                ></i>
                              </button>
                              <select
                                onChange={handleCameraChange}
                                value={selectedCamera}
                                className="form-select w-50"
                              >
                                {availableCameras.map((camera) => (
                                  <option
                                    key={camera.deviceId}
                                    value={camera.deviceId}
                                  >
                                    {camera.label ||
                                      `Camera ${camera.deviceId}`}
                                  </option>
                                ))}
                              </select>
                              {isVideoEnabled && (
                                <button
                                  onClick={handleEndCall}
                                  className="btn btn-danger"
                                >
                                  <i className="ti ti-phone-off"></i>
                                </button>
                              )}
                            </div>
                          </div>
                        </PopupModal>

                        {/* Audio Call Modal */}
                        <PopupModal
                          style={{ minWidth: "500px", maxHeight: "80vh" }}
                          title={
                            <i
                              className={`ti ti-phone ti-md cursor-pointer d-inline-flex me-1 btn btn-sm btn-text-secondary text-white btn-icon rounded-pill ${
                                isAudioEnabled ? "" : ""
                              }`}
                            />
                          }
                          id="audio"
                        >
                          <div className="modal-body">
                            <p>{isVideoEnabled ? "Calling..." : "Call End"}</p>
                            <div className="d-flex gap-3">
                              <button
                                onClick={toggleAudio}
                                className={`btn ${
                                  isAudioEnabled ? "btn-success" : "btn-warning"
                                } btn-secondary`}
                              >
                                <i
                                  className={`ti ${
                                    isAudioEnabled
                                      ? "ti-microphone"
                                      : "ti-microphone-off"
                                  } ti-md cursor-pointer d-sm-inline-flex d-none me-1 btn btn-sm btn-text-secondary text-white btn-icon rounded-pill`}
                                ></i>
                              </button>
                              <button
                                onClick={toggleVideo}
                                className={`btn ${
                                  isVideoEnabled
                                    ? "btn-primary"
                                    : "btn-secondary"
                                } btn-secondary`}
                              >
                                <i
                                  className={`ti ${
                                    isVideoEnabled
                                      ? "ti ti-phone"
                                      : "ti ti-phone-off "
                                  } ti-md cursor-pointer d-sm-inline-flex d-none me-1 btn btn-sm btn-text-secondary text-white btn-icon rounded-pill`}
                                ></i>
                              </button>
                              {isVideoEnabled && (
                                <button
                                  onClick={handleEndCall}
                                  className="btn btn-danger"
                                >
                                  <i className="ti ti-phone-off ti-md cursor-pointer d-sm-inline-flex d-none me-1 btn btn-sm btn-text-secondary text-white btn-icon rounded-pill"></i>
                                </button>
                              )}
                            </div>
                          </div>
                        </PopupModal>

                        {/* Calling and Call-End Sounds */}
                        {/* <audio ref={callingSoundRef} />
                      <audio ref={endCallSoundRef} /> */}

                        <i className="ti ti-search ti-md cursor-pointer d-sm-inline-flex d-none me-1 btn btn-sm btn-text-secondary text-white btn-icon rounded-pill" />
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
                            <a
                              className="dropdown-item"
                              href="javascript:void(0);"
                            >
                              View Contact
                            </a>
                            <a
                              className="dropdown-item"
                              href="javascript:void(0);"
                            >
                              Mute Notifications
                            </a>
                            <a
                              className="dropdown-item"
                              href="javascript:void(0);"
                            >
                              Block Contact
                            </a>
                            <a
                              className="dropdown-item"
                              href="javascript:void(0);"
                            >
                              Clear Chat
                            </a>
                            <a
                              className="dropdown-item"
                              href="javascript:void(0);"
                            >
                              Report
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="chat-history-body ">
                    <ul className="list-unstyled chat-history chat-scrollbar">
                      {chats?.chats?.length > 0 ? (
                        chats?.chats?.map((item, index) => {
                          return (
                            <li
                              key={index}
                              className={`chat-message ${
                                item?.senderId === chatUser?._id
                                  ? "chat-message-right"
                                  : ""
                              } `}
                            >
                              <div className="d-flex overflow-hidden">
                                <div className="chat-message-wrapper flex-grow-1">
                                  <div className="chat-message-text">
                                    <p className="mb-0">
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
                    </ul>
                  </div>
                  {/* Chat message form */}
                  <div className="chat-history-footer shadow-xs">
                    <form
                      onSubmit={handleSendMessage}
                      className="form-send-message d-flex justify-content-between align-items-center"
                    >
                      <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
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
                          <input type="file" id="attach-doc" hidden="true" />
                        </label>
                        <button
                          type="submit"
                          className="btn btn-primary d-flex send-msg-btn"
                        >
                          <span className="align-middle d-md-inline-block d-none">
                            Send
                          </span>
                          <i className="ti ti-send ti-16px ms-md-2 ms-0" />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

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
                <i
                  className="ti ti-x ti-lg cursor-pointer close-sidebar d-block"
                  data-bs-toggle="sidebar"
                  data-overlay=""
                  data-target="#app-chat-sidebar-right"
                />
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

import { useState, useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";
import { useCreateChatMutation } from "../../Redux/api/ChatApi";
import callingAudioMusic from "../../assets/audio/ringing-151670.mp3";
import endCallAudioMusice from "../../assets/audio/end-call-120633.mp3";
import { showToast } from "./../../utils/Toastify";
import avatar from "../../../src/assets/img/avatars/7.png";
const callingAudio = new Audio(callingAudioMusic);
const endCallAudio = new Audio(endCallAudioMusice);
callingAudio.loop = true;

const AudioChat = ({ chatUser, user, setAudioChat }) => {
  const peerConnection = useRef(null);
  const localStream = useRef(null);
  const remoteStream = useRef(new MediaStream());
  const [incomingCall, setIncomingCall] = useState(null);
  const [isCalling, setIsCalling] = useState(false);
  const [offer, setOffer] = useState(null);
  const [createChat] = useCreateChatMutation();
  const socket = useRef(null);
  const [isMute, setIsMute] = useState(true);
  const iceServers = {
    iceServers: [
      { urls: ["stun:stun1.google.com:19302", "stun:stun2.google.com:19302"] },
    ],
  };

  useEffect(() => {
    const localStreamInit = async () => {
      const localStreamData = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });
      document.getElementById("localVideo").srcObject = localStreamData;
      localStreamData.getAudioTracks()[0].enabled = true;
      localStream.current = localStreamData;
    };

    localStreamInit();
  }, []);

  useEffect(() => {
    if (localStream.current && offer) {
      handleIncomingCall(offer);
    }
  }, [offer]);

  const handleIncomingCall = async (offer) => {
    const pc = new RTCPeerConnection(iceServers);
    peerConnection.current = pc;
    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    callingAudio.play();
    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.current.addTrack(track);
      });
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.current.emit("icecandidate", {
          candidate: event.candidate,
          to: chatUser,
        });
      }
    };

    document.getElementById("remoteVideo").srcObject = remoteStream.current;
    localStream.current.getTracks().forEach((track) => {
      pc.addTrack(track, localStream.current);
    });
  };

  const acceptCall = async () => {
    try {
      const pc = new RTCPeerConnection(iceServers);
      setIsCalling(true);
      peerConnection.current = pc;
      callingAudio.pause();
      document.getElementById("remoteVideo").srcObject = remoteStream.current;
      setIncomingCall(null);
      localStream.current.getTracks().forEach((track) => {
        const sender = pc
          .getSenders()
          .find((s) => s.track && s.track.kind === track.kind);
        if (!sender) {
          pc.addTrack(track, localStream.current);
        }
      });

      pc.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
          if (!remoteStream.current.getTracks().includes(track)) {
            remoteStream.current.addTrack(track);
          }
        });
      };

      await pc.setRemoteDescription(offer);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socket.current.emit("answer", {
            answer: pc.localDescription,
            userData: chatUser,
            type: "audio",
          });
        }
      };
    } catch (error) {
      console.error("Error accepting call.", error);
    }
  };

  const createOffer = async () => {
    try {
      setIsCalling(true);
      if (isCalling) {
        showToast("error", "busy now");
      } else {
        const pc = new RTCPeerConnection(iceServers);
        peerConnection.current = pc;

        document.getElementById("remoteVideo").srcObject = remoteStream.current;

        localStream.current.getTracks().forEach((track) => {
          const sender = pc
            .getSenders()
            .find((s) => s.track && s.track.kind === track.kind);
          if (!sender) {
            pc.addTrack(track, localStream.current);
          }
        });

        pc.ontrack = (event) => {
          event.streams[0].getTracks().forEach((track) => {
            if (!remoteStream.current.getTracks().includes(track)) {
              remoteStream.current.addTrack(track);
            }
          });
        };

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        pc.onicecandidate = (event) => {
          if (event.candidate) {
            socket.current.emit("offer", {
              offer: pc.localDescription,
              userData: chatUser,
              type: "audio",
            });
          }
        };
        setIsCalling(true);
      }
    } catch (error) {
      console.error("Error creating offer.", error);
    }
  };

  const handleAnswer = async ({ answer }) => {
    try {
      if (peerConnection.current) {
        await peerConnection.current.setRemoteDescription(answer);
      } else {
        console.error("Peer connection does not exist.");
      }
    } catch (error) {
      console.error("Error handling answer.", error);
    }
  };

  const declineCall = () => {
    setIncomingCall(null);
    callingAudio.pause();
    endCallAudio.play();
    setAudioChat(false);
    setIsCalling(false);
    // Emit call decline event
    socket?.current?.emit("call-decline", {
      userData: chatUser,
      type: "audio",
      callerData: user,
    });

    // Create a missed call chat message
    createChat({ chat: "audio Missed call", receiverId: chatUser?._id });

    // Clean up resources
  };

  const toggleAudio = () => {
    setIsMute(!isMute);

    if (localStream.current) {
      const audioTrack = localStream.current.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      console.log(audioTrack.enabled ? "Audio Unmuted" : "Audio Muted");
    }
  };

  const endCall = () => {
    setIsCalling(false);
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
      setAudioChat(false);
      socket?.current?.emit("end-call", {
        userData: chatUser,
        type: "audio",
        callerData: user,
      });
      setIncomingCall(null);

      createChat({ chat: "Call ended", receiverId: chatUser?._id });
    }

    // Clean up local and remote streams
    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => track.stop());
      localStream.current = null;
    }

    if (remoteStream.current) {
      remoteStream.current.getTracks().forEach((track) => track.stop());
      remoteStream.current = null;
    }

    callingAudio.pause();
    endCallAudio.play();
  };

  const handleEndCall = useCallback(() => {
    setIncomingCall(null);
    setAudioChat(false);
    setIsCalling(false);
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }

    // Clean up local and remote streams
    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => track.stop());
      localStream.current = null;
    }

    if (remoteStream.current) {
      remoteStream.current.getTracks().forEach((track) => track.stop());
      remoteStream.current = null;
    }

    callingAudio.pause();
    endCallAudio.play();
  }, [setAudioChat]);
  const handleCancel =()=>{
    setAudioChat(false)
    callingAudio.pause();
  }
  const handleCallDecline = useCallback(() => {
    setIncomingCall(null);
    callingAudio.pause();
    setAudioChat(false);
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }

    // Clean up local and remote streams
    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => track.stop());
      localStream.current = null;
    }

    if (remoteStream.current) {
      remoteStream.current.getTracks().forEach((track) => track.stop());
      remoteStream.current = null;
    }

    endCallAudio.play();
  }, []);
  useEffect(() => {
    callingAudio.pause();
  });
  useEffect(() => {
    // socket.current = io("ws://localhost:5050");
     socket.current = io('wss://carelinks-server.onrender.com');
    socket?.current?.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket?.current?.emit("setActiveUser", user);
    socket?.current?.on("offer", ({ userData, offer }) => {
      setIncomingCall(userData);
      setOffer(offer); // Store the offer
    });
    socket?.current?.on("answer", handleAnswer);
    socket?.current?.on("call-decline", handleCallDecline);
    socket?.current?.on("end-call", handleEndCall);

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
      if (localStream.current) {
        localStream.current.getTracks().forEach((track) => track.stop());
      }
      if (peerConnection.current) {
        peerConnection.current.close();
      }
    };
  }, [user, handleEndCall, handleCallDecline, chatUser]);
  return (
    <div
      style={{ width: "100%", height: "100%" }}
      className="video-chat-container  d-flex bg-primary flex-column align-items-center justify-content-center"
    >
      <div className="video-streams  overflow-hidden ">
        {incomingCall && (
          <div
            style={{
              zIndex: 10000,
              left: 0,
              padding: "0 10px 0 10px",
              position: "absolute",
              top: 0,
            }}
            className="d-flex bg-primary align-items-center gap-3 justify-content-between  bg-primary shadow w-100 text-light flex-wrap p-2"
          >
            <span className="mt-3 text-success text-capitalize mb-0 pb-0">
              <span className="text-white">{incomingCall?.firstName}</span>
                is calling...
            </span>
            <div className="d-flex gap-3 align-items-center  ml-auto">
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
                <i className="ti ti-phone-off"></i> decline
              </button>
            </div>
          </div>
        )}
        <div
          style={{
            background: "black",
          }}
        >
          <audio id="remoteVideo" autoPlay></audio>
        </div>
        <div
          style={{
            width: `${"100px"}`,
            height: "100px",
            borderRadius: "100px",
            position: "absolute",
            top: 50,
            right: 50,
            zIndex: 100,
            overflow: "hidden",
          }}
        >
          <audio
            id="localVideo"
            style={{
              width: `${"100%"}`,
              height: "100%",
            }}
            autoPlay
            muted
          ></audio>
        </div>
        <div className="d-flex flex-column gap-2 align-items-center">
          <img
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "100%",
            }}
            src={chatUser?.avatar ? chatUser?.avatar : avatar}
            alt=""
          />
          <h5 className="text-capitalize text-white truncate">
            {chatUser?.firstName}

            {chatUser?.lastName}
          </h5>
        </div>
        <div
          style={{
            position: "absolute",
            zIndex: 50,
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            boxShadow: "0px 0px 10px purple",
          }}
          className="video-controls bg-primary p-2 rounded  d-flex align-items-center justify-content-end gap-3 mr-5 mt-auto"
        >
          <button onClick={toggleAudio} className="btn btn-dark">
            {isMute ? (
              <i className="ti ti-microphone" />
            ) : (
              <i className="ti ti-microphone-off" />
            )}
          </button>

          {isCalling ? (
            <button onClick={endCall} className="btn btn-danger">
              <i className="ti ti-phone-off" />
            </button>
          ) : (
            !incomingCall && <div className="d-flex gap-2"><button onClick={createOffer} className="btn btn-sm btn-success">
            <i className="ti ti-phone"></i>
          </button>
            <button onClick={handleCancel} className="btn btn-sm btn-danger">
            Cancel
          </button>
          </div>
          
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioChat;

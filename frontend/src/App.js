import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { BsMicMute, BsMic, BsMegaphoneFill, BsMegaphone } from "react-icons/bs";
import { GiSpeakerOff, GiSpeaker } from "react-icons/gi";
import { World, NameForm, MobileScreen } from "./components";
import { ToastContainer, toast } from "react-toastify";

const socket = io("https://javaughnpryce.live:6060");

export default function App() {
  const [mute, setMute] = useState(false);
  const [microphone, setMicrophone] = useState(false);
  const [voiceData, setVoiceData] = useState();
  const [name, setName] = useState(localStorage.getItem("name"));
  const [userColour, setUserColour] = useState(localStorage.getItem("colour"));
  const [mobile, setMobile] = useState(false);
  const [isAddressAll, setIsAddressAll] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "KeyM") {
        setMute((mute) => !mute);
      }
      if (e.code === "KeyZ") {
        setMicrophone((microphone) => !microphone);
      }
    };
    document.addEventListener("keypress", handleKeyDown);
    return () => {
      document.removeEventListener("keypress", handleKeyDown);
    };
  }, [mute, microphone]);

  const resize = () => {
    if (window.innerHeight <= 600 || window.innerWidth <= 768) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", resize);
    if (window.innerHeight <= 600 || window.innerWidth <= 768) {
      setMobile(true);
    } else {
      setMobile(false);
    }
    // eslint-disable-next-line
  }, []);

  const audio = (time) => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
      })
      .then((stream) => {
        let mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        let audioChunks = [];

        mediaRecorder.addEventListener("dataavailable", (event) => {
          audioChunks.push(event.data);
        });
        mediaRecorder.addEventListener("stop", () => {
          let audioBlob = new Blob(audioChunks);

          audioChunks = [];

          let fileReader = new FileReader();
          fileReader.readAsDataURL(audioBlob);
          fileReader.onloadend = () => {
            let base64String = fileReader.result;
            setVoiceData(base64String);
          };

          mediaRecorder.start();

          setTimeout(() => {
            mediaRecorder.stop();
          }, time);
        });
        setTimeout(() => {
          mediaRecorder.stop();
        }, time);
      });
  };

  useEffect(() => {
    if (!mobile && name && userColour) {
      const data = {
        mute,
        name,
        userColour,
        microphone,
      };
      socket.emit("usersData", data);
    }
    // eslint-disable-next-line
  }, [mobile, name, userColour]);

  useEffect(() => {
    const data = {
      mute,
      microphone,
    };
    socket.emit("userDataUpdated", data);
  }, [mute, microphone]);

  useEffect(() => {
    audio(500);
  }, []);

  useEffect(() => {
    socket.on("megaphone", (data) => {
      setIsAddressAll(data);
    });
  }, []);

  useEffect(() => {
    socket.on("newUserConnected", (user) => {
      notify(user.user.name, "has entered the space!");
    });
    socket.on("userDisconnected", (user) => {
      notify(user.name, "has left the space!");
    });
  }, []);

  const notify = (name, message) =>
    toast(`${name} ${message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

  if (name && userColour && !mobile)
    return (
      <div className="flex flex-col justify-between h-screen bg-zinc-900">
        <div className="bg-gray-900 h-full w-full">
          <World
            socket={socket}
            mute={mute}
            microphone={microphone}
            voiceData={voiceData}
            isAddressAll={isAddressAll}
          />
        </div>
        <div className="flex justify-between items-end px-4 py-2 max-w-5xl mx-auto w-full">
          <div className="flex justify-between items-center space-x-2">
            {microphone ? (
              <BsMic
                onClick={() => setMicrophone(!microphone)}
                className="text-3xl text-blue-500"
              />
            ) : (
              <BsMicMute
                onClick={() => setMicrophone(!microphone)}
                className="text-3xl text-red-500"
              />
            )}
            <span className="text-white font-medium text-base">
              Z to mute/unmute
            </span>
          </div>
          <div className="flex justify-between items-center space-x-2">
            {mute ? (
              <GiSpeakerOff
                onClick={() => setMute(!mute)}
                className="text-4xl text-red-500"
              />
            ) : (
              <GiSpeaker
                onClick={() => setMute(!mute)}
                className="text-4xl text-blue-500"
              />
            )}
            <span className="text-white font-medium text-base">
              M to mute/unmute
            </span>
          </div>
          <div className="flex justify-between items-center space-x-3">
            {isAddressAll ? (
              <BsMegaphoneFill className="text-3xl text-blue-500" />
            ) : (
              <BsMegaphone className="text-3xl text-red-500" />
            )}
          </div>
        </div>
        <h3 className="text-center text-white font-semibold text-base">
          For best experience please use headphones
        </h3>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
        />
      </div>
    );
  if (mobile)
    return (
      <div className="bg-slate-800 h-screen">
        <MobileScreen />
      </div>
    );
  else return <NameForm setName={setName} setUserColour={setUserColour} />;
}

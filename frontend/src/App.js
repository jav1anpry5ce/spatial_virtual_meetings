import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { BsMicMute, BsMic } from "react-icons/bs";
import { GiSpeakerOff, GiSpeaker } from "react-icons/gi";
import { World, NameForm, MobileScreen } from "./components";

const socket = io("https://javaughnpryce.live:6060");

function App() {
  const [mute, setMute] = useState(false);
  const [microphone, setMicrophone] = useState(false);
  const [voiceData, setVoiceData] = useState();
  const [name, setName] = useState(localStorage.getItem("name"));
  const [userColour, setUserColour] = useState(localStorage.getItem("colour"));
  const [mobile, setMobile] = useState(false);

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

    window.addEventListener("keydown", (e) => {
      if (
        (e.altKey && e.key === "m") ||
        (e.code === "AltLeft" && e.key === "m")
      )
        setMute(!mute);
      if (
        (e.altKey && e.key === "z") ||
        (e.code === "AltLeft" && e.key === "z")
      )
        setMicrophone(!microphone);
    });
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
    if (name && userColour) {
      const data = {
        mute,
        name,
        userColour,
      };
      socket.emit("usersData", data);
    }
    // eslint-disable-next-line
  }, [mute, name, userColour]);

  useEffect(() => {
    audio(1000);
  }, []);

  if (name && userColour && !mobile)
    return (
      <div className="flex flex-col justify-between w-full h-screen bg-zinc-900">
        <div className="bg-gray-900 h-full">
          <World
            socket={socket}
            mute={mute}
            microphone={microphone}
            voiceData={voiceData}
          />
        </div>
        <div className="flex justify-between items-end px-4 py-2 max-w-3xl mx-auto w-full">
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
              Alt + z to mute/unmute
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
              Alt + m to mute/unmute
            </span>
          </div>
        </div>
        <h3 className="text-center text-white font-semibold text-base">
          For best experience please use headphones
        </h3>
      </div>
    );
  if (mobile)
    return (
      <div className="bg-slate-800 h-screen w-screen">
        <MobileScreen />
      </div>
    );
  else return <NameForm setName={setName} setUserColour={setUserColour} />;
}

export default App;

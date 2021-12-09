import { useEffect, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";
import { BsMicMute, BsMic } from "react-icons/bs";
import { GiSpeakerOff, GiSpeaker } from "react-icons/gi";
import { World, NameForm } from "./components";

const socket = io("https://javaughnpryce.live:6060");

function App() {
  const [mute, setMute] = useState(true);
  const [microphone, setMicrophone] = useState(false);
  const [voiceData, setVoiceData] = useState();
  const [name, setName] = useState(localStorage.getItem("name"));
  const [userColour, setUserColour] = useState(localStorage.getItem("colour"));

  window.addEventListener("keydown", (e) => {
    if (e.altKey && e.key === "m") setMute(!mute);
    if (e.altKey && e.key === "a") setMicrophone(!microphone);
  });

  const audio = (time) => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
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
          //socket.emit("voice", base64String);
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
    const data = {
      mute,
      name,
      userColour,
    };
    socket.emit("usersData", data);
    // eslint-disable-next-line
  }, [mute, name]);

  useEffect(() => {
    audio(500);
  }, []);

  if (name)
    return (
      <div className="flex flex-col justify-between w-full h-screen">
        <div className="bg-gray-900 h-full">
          <World
            socket={socket}
            mute={mute}
            microphone={microphone}
            voiceData={voiceData}
          />
        </div>
        <div className="flex justify-between items-end px-4 py-2 max-w-2xl mx-auto w-full">
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
        </div>
      </div>
    );
  else return <NameForm setName={setName} setUserColour={setUserColour} />;
}

export default App;

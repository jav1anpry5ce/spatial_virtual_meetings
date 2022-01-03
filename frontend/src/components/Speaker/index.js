import React, { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { useThree, useLoader } from "@react-three/fiber";
import { useBox } from "@react-three/cannon";
import SpeakerBox from "./SpeakerBox";
import music from "../../asset/mix.mp3";

function Sound({
  url,
  mute,
  socket,
  currentTime,
  isAddressAll,
  userIsAddressAll,
  microphone,
}) {
  const sound = useRef();
  const { camera } = useThree();
  const [listener] = useState(() => new THREE.AudioListener());
  const buffer = useLoader(THREE.AudioLoader, url);

  useEffect(() => {
    sound.current.setBuffer(buffer);
    sound.current.setRefDistance(0.25);
    sound.current.setLoop(true);
    sound.current.offset = currentTime;
    sound.current.play();
    camera.add(listener);
    return () => camera.remove(listener);
    // eslint-disable-next-line
  }, []);

  if (sound.current) {
    if (socket) socket.emit("songTime", sound.current.context.currentTime);
  }

  useEffect(() => {
    mute ? sound.current.setVolume(0) : sound.current.setVolume(1);
  }, [mute]);

  useEffect(() => {
    (isAddressAll && !mute) || (userIsAddressAll && microphone && !mute)
      ? sound.current.setVolume(0.1)
      : mute
      ? sound.current.setVolume(0)
      : sound.current.setVolume(1);
  }, [isAddressAll, mute, userIsAddressAll, microphone]);

  return <positionalAudio ref={sound} args={[listener]} />;
}

export default function Speaker({
  mute,
  position,
  rotation,
  socket,
  currentTime,
  isAddressAll,
  userIsAddressAll,
  microphone,
}) {
  const [ref] = useBox(() => ({
    position: position,
    rotation: rotation,
    type: "Static",
    args: [2, 4, 1],
    scale: [0, 0, 0],
  }));
  return (
    <mesh ref={ref}>
      <Sound
        url={music}
        mute={mute}
        socket={socket}
        currentTime={currentTime}
        isAddressAll={isAddressAll}
        userIsAddressAll={userIsAddressAll}
        microphone={microphone}
      />
      <SpeakerBox />
    </mesh>
  );
}

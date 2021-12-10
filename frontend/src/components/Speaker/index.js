import React, { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { useThree, useLoader } from "@react-three/fiber";
import { useBox } from "@react-three/cannon";
import SpeakerBox from "./SpeakerBox";
import music from "../../asset/song.mp3";

function Sound({ url, mute }) {
  const sound = useRef();
  const { camera } = useThree();
  const [listener] = useState(() => new THREE.AudioListener());
  const buffer = useLoader(THREE.AudioLoader, url);

  useEffect(() => {
    sound.current.setBuffer(buffer);
    sound.current.setRefDistance(0.1);
    sound.current.setLoop(true);
    camera.add(listener);
    return () => camera.remove(listener);
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   if (listener) listener.context.currentTime = 50;
  // });

  useEffect(() => {
    mute ? sound.current.pause() : sound.current.play();
  }, [mute]);
  return <positionalAudio ref={sound} args={[listener]} />;
}

export default function Speaker({ mute, position, rotation }) {
  const [ref] = useBox(() => ({
    position: position,
    rotation: rotation,
    type: "Static",
    args: [0.2, 1.3, 0.2],
  }));
  return (
    <mesh ref={ref}>
      <Sound url={music} mute={mute} />
      <SpeakerBox />
    </mesh>
  );
}

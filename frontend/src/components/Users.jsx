import { useEffect, useRef, useState, Suspense } from "react";
import * as THREE from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useSphere } from "@react-three/cannon";
import { BsMicMute, BsMic } from "react-icons/bs";
import { GiSpeakerOff, GiSpeaker } from "react-icons/gi";

function Sound({ audio }) {
  const sound = useRef();
  const { camera } = useThree();
  const [listener] = useState(() => new THREE.AudioListener());
  const buffer = useLoader(THREE.AudioLoader, audio);

  useEffect(() => {
    sound.current.setBuffer(buffer);
    // eslint-disable-next-line
  }, [audio]);

  useEffect(() => {
    sound.current.setRefDistance(0.75);
    sound.current.setLoop(false);
    camera.add(listener);
    return () => camera.remove(listener);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!sound.current.isPlaying) sound.current.play();
  }, [audio]);

  return <positionalAudio ref={sound} args={[listener]} />;
}

export default function Users({
  position,
  rotation,

  audio,
  name,
  microphone,
  mute,
  image,
  schoolRef,
}) {
  const [audioData, setAudioData] = useState();
  const [hidden, set] = useState(false);
  const [ref, api] = useSphere(() => ({
    mass: 10,
    type: "Static",
    args: [0, 0, 0],
    scale: [0, 0, 0],
  }));
  useFrame(() => {
    api.position.set(position.x, position.y, position.z);
    api.rotation.set(rotation[0], rotation[1], rotation[2]);
  });
  useEffect(() => {
    setAudioData(audio);
  }, [audio]);
  return (
    <mesh ref={ref} scale={[0, 0, 0]}>
      <Html
        as="div"
        prepend={true}
        distanceFactor={7}
        position={[0, -0.31, 0]}
        center
        className="flex flex-col space-y-2 items-center w-[16rem] h-[16rem]"
        occlude={[schoolRef]}
        onOcclude={set}
        style={{
          transition: "all 0.09s",
          opacity: hidden ? 0 : 1,
        }}
      >
        <div className="flex items-center text-white">
          {name}
          <div>
            {microphone ? (
              <BsMic className="text-base text-white" />
            ) : (
              <BsMicMute className="text-base text-white" />
            )}
            {mute ? (
              <GiSpeakerOff className="text-base text-white" />
            ) : (
              <GiSpeaker className="text-base text-white" />
            )}
          </div>
        </div>
        <img
          src={image}
          alt="pic"
          className="w-[6.5rem] h-[6.5rem] aspect-square rounded-full object-cover object-center"
        />
      </Html>
      <Suspense fallback={null}>
        <Sound audio={audioData} />
      </Suspense>
    </mesh>
  );
}

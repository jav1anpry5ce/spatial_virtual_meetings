import { useEffect, useRef, useState, Suspense } from "react";
import * as THREE from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { Html, Sphere } from "@react-three/drei";
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
  colour,
  audio,
  name,
  microphone,
  mute,
  image,
}) {
  // const [img, setImg] = useState(
  //   "https://thumbs.dreamstime.com/b/cosmos-beauty-deep-space-elements-image-furnished-nasa-science-fiction-art-102581846.jpg"
  // );
  // const texture = useLoader(THREE.TextureLoader, img);
  const [audioData, setAudioData] = useState();
  const [ref, api] = useSphere(() => ({
    mass: 10,
    type: "Static",
    args: [0, 0, 0],
    scale: [0.4, 0.4, 0.4],
  }));

  useFrame(() => {
    api.position.set(position.x, position.y, position.z);
    api.rotation.set(rotation[0], rotation[1], rotation[2]);
  });
  // useEffect(() => {
  //   if (image) setImg(image);
  // }, [image]);
  useEffect(() => {
    setAudioData(audio);
  }, [audio]);
  return (
    <mesh ref={ref} scale={[0.4, 0.4, 0.4]}>
      <Sphere>
        <meshBasicMaterial attach="material" color={colour} />
        <Html
          className="text-white font-semibold text-xs font-mono tracking-widest capitalize overflow-ellipsis break-normal flex items-center"
          center
          position={[0, 1.2, -1]}
        >
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
        </Html>
      </Sphere>
      <Suspense fallback={null}>
        <Sound audio={audioData} />
      </Suspense>
    </mesh>
  );
}

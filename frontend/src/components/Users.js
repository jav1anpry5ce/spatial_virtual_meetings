import { useEffect, useRef, useState, Suspense } from "react";
import * as THREE from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { Html, Sphere } from "@react-three/drei";
import { useSphere } from "@react-three/cannon";

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
    sound.current.setRefDistance(0.95);
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

export default function Users({ position, rotation, colour, audio, name }) {
  const [audioData, setAudioData] = useState();
  const [ref, api] = useSphere(() => ({
    mass: 10,
    type: "Static",
    args: [0, 0, 0],
    scale: [0.5, 0.5, 0.5],
  }));

  useFrame(() => {
    api.position.set(position.x, position.y, position.z);
    api.rotation.set(rotation[0], rotation[1], rotation[2]);
  });
  useEffect(() => {
    setAudioData(audio);
  }, [audio]);
  return (
    <mesh ref={ref}>
      <Sphere scale={[0.5, 0.5, 0.5]}>
        <meshBasicMaterial attach="material" color={colour} />
        <Html
          className="text-white font-semibold text-sm w-full font-mono tracking-widest text-center capitalize overflow-ellipsis break-normal"
          center
          position={[0, 1.2, -1]}
        >
          {name}
        </Html>
      </Sphere>
      <Suspense fallback={null}>
        <Sound audio={audioData} />
      </Suspense>
    </mesh>
  );
}

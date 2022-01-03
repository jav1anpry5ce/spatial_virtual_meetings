import React from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, Html } from "@react-three/drei";

export default function MobileScreen() {
  return (
    <Canvas>
      <Html center>
        <h1 className="text-gray-100 font-bold text-4xl font-mono tracking-widest capitalize break-words">
          For the best experience please use a computer
        </h1>
      </Html>
      <Stars />
    </Canvas>
  );
}

import React from "react";
import Three from "./Three";
import { useCylinder } from "@react-three/cannon";

export default function ChristmasTree() {
  const [ref] = useCylinder(() => ({
    position: [0.6, 0, 26.5],
    type: "Static",
    args: [0.9, 1, 10],
  }));
  return (
    <mesh ref={ref}>
      <Three />
    </mesh>
  );
}

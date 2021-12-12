import React from "react";
import BarCounter from "./Barcounter";

export default function Bar() {
  return (
    <BarCounter
      position={[-25, 0, 33.5]}
      rotation={[0, 2.2, 0]}
      scale={[0.8, 0.8, 0.8]}
    />
  );
}

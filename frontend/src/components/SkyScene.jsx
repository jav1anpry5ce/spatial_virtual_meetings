import React from "react";
import { Stars, Sky } from "@react-three/drei";

export default function SkyScene() {
  return (
    <>
      <Sky
        distance={10000}
        turbidity={0}
        rayleigh={15}
        mieCoefficient={0}
        mieDirectionalG={0}
        inclination={0}
        azimuth={0}
      />
      <Stars />
    </>
  );
}

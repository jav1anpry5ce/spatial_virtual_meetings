import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/BarCounter.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh004.geometry}
        material={nodes.Mesh004.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh004_1.geometry}
        material={materials.Material__0}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh004_2.geometry}
        material={materials._10873_WineBottle_v1glassSG}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh004_3.geometry}
        material={materials._10873_WineBottle_v1blinn1SG}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh004_4.geometry}
        material={materials._10873_WineBottle_v1lambert3SG}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Theke.geometry}
        material={nodes.Theke.material}
        position={[0, 0.29, 0]}
      />
    </group>
  );
}

useGLTF.preload("/BarCounter.glb");

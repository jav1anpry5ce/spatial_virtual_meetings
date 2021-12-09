import React from "react";
import { useGLTF } from "@react-three/drei";
import { useBox } from "@react-three/cannon";

export default function Model(props) {
  const [ref] = useBox(() => ({}));
  const { nodes, materials } = useGLTF("/Speaker.glb");
  return (
    <group ref={ref} {...props} dispose={null}>
      <group position={[0, 0.07, 0]} rotation={[Math.PI / 2, 0, 1.5]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Mesh_(2)_1"].geometry}
          material={materials.Speaker}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Mesh_(2)_2"].geometry}
          material={materials.KAsa}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Mesh_(2)_3"].geometry}
          material={materials.Box}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Mesh_(2)_4"].geometry}
          material={materials.AirOut}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Mesh_(2)_5"].geometry}
          material={materials.Kabel}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/Speaker.glb");

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/tree.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0, 0, 0]} scale={[0.09, 0.09, 0.09]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["12150_Christmas_Tree_V2_L2"].geometry}
          material={materials.cloth}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["12150_Christmas_Tree_V2_L2_1"].geometry}
          material={materials.red}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["12150_Christmas_Tree_V2_L2_2"].geometry}
          material={materials.loop}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["12150_Christmas_Tree_V2_L2_3"].geometry}
          material={materials.ball_metall}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["12150_Christmas_Tree_V2_L2_4"].geometry}
          material={materials.pink}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["12150_Christmas_Tree_V2_L2_5"].geometry}
          material={materials.blue}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["12150_Christmas_Tree_V2_L2_6"].geometry}
          material={materials.yellow}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["12150_Christmas_Tree_V2_L2_7"].geometry}
          material={materials.Christmas_Tree}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/tree.glb");

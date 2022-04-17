import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Model() {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/dance.glb");
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    actions.rock.play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <group ref={group} dispose={null}>
      <group
        rotation={[Math.PI / 2, 0, 1.7]}
        scale={[0.017, 0.017, 0.017]}
        position={[7, 0, 17]}
      >
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          geometry={nodes.Ch03.geometry}
          material={materials["Ch03_Body.002"]}
          skeleton={nodes.Ch03.skeleton}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/dance.glb");

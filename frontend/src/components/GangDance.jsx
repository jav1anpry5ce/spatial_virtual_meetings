import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/gang.glb");
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    actions.gang.play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <group ref={group} {...props} dispose={null}>
      <group
        rotation={[Math.PI / 2, 0, 1.7]}
        scale={[0.014, 0.014, 0.014]}
        position={[7, 0, 20]}
      >
        <primitive object={nodes.mixamorig4Hips} />
        <skinnedMesh
          geometry={nodes.Mesh.geometry}
          material={materials.Ch12_body}
          skeleton={nodes.Mesh.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Mesh_1.geometry}
          material={materials.Ch12_hair}
          skeleton={nodes.Mesh_1.skeleton}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/gang.glb");

import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { setSchoolRef } = props;
  useEffect(() => {
    setSchoolRef(group);
    // eslint-disable-next-line
  }, []);
  const { nodes, materials } = useGLTF("/School.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.DoorFrame.geometry}
        material={nodes.DoorFrame.material}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Door.geometry}
          material={nodes.Door.material}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Handle_Back.geometry}
            material={nodes.Handle_Back.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Handle_Front.geometry}
            material={nodes.Handle_Front.material}
          />
        </mesh>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.DoorFrame001.geometry}
        material={nodes.DoorFrame001.material}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Door001.geometry}
          material={nodes.Door001.material}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Handle_Back001.geometry}
            material={nodes.Handle_Back001.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Handle_Front001.geometry}
            material={nodes.Handle_Front001.material}
          />
        </mesh>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.DoorFrame002.geometry}
        material={nodes.DoorFrame002.material}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Door002.geometry}
          material={nodes.Door002.material}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Handle_Back002.geometry}
            material={nodes.Handle_Back002.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Handle_Front002.geometry}
            material={nodes.Handle_Front002.material}
          />
        </mesh>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.DoorFrame003.geometry}
        material={nodes.DoorFrame003.material}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Door003.geometry}
          material={nodes.Door003.material}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Handle_Back003.geometry}
            material={nodes.Handle_Back003.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Handle_Front003.geometry}
            material={nodes.Handle_Front003.material}
          />
        </mesh>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.DoorFrame004.geometry}
        material={nodes.DoorFrame004.material}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Door004_1.geometry}
          material={nodes.Door004_1.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Door004_2.geometry}
          material={nodes.Door004_2.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Handle_Back004.geometry}
          material={nodes.Handle_Back004.material}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.DoorFrame005.geometry}
        material={nodes.DoorFrame005.material}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Door005.geometry}
          material={nodes.Door005.material}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Handle_Back005.geometry}
            material={nodes.Handle_Back005.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Handle_Front004_1.geometry}
            material={nodes.Handle_Front004_1.material}
          />
        </mesh>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.DoorFrame006.geometry}
        material={nodes.DoorFrame006.material}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Door006_1.geometry}
          material={nodes.Door006_1.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Door006_2.geometry}
          material={nodes.Door006_2.material}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.DoorFrame007.geometry}
        material={nodes.DoorFrame007.material}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Door007.geometry}
          material={nodes.Door007.material}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Handle_Back006_1.geometry}
            material={nodes.Handle_Back006_1.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Handle_Front005.geometry}
            material={nodes.Handle_Front005.material}
          />
        </mesh>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.DoorFrame008.geometry}
        material={nodes.DoorFrame008.material}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Door008.geometry}
          material={nodes.Door008.material}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Handle_Back007.geometry}
            material={nodes.Handle_Back007.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Handle_Front006_1.geometry}
            material={nodes.Handle_Front006_1.material}
          />
        </mesh>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CTRL_Baseboard009.geometry}
        material={materials.hidden_material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.DoorFrame009.geometry}
        material={nodes.DoorFrame009.material}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Door009.geometry}
          material={nodes.Door009.material}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Handle_Back008.geometry}
            material={nodes.Handle_Back008.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Handle_Front007.geometry}
            material={nodes.Handle_Front007.material}
          />
        </mesh>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.DoorFrame010.geometry}
        material={nodes.DoorFrame010.material}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Door010.geometry}
          material={nodes.Door010.material}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Handle_Back009.geometry}
            material={nodes.Handle_Back009.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Handle_Front008.geometry}
            material={nodes.Handle_Front008.material}
          />
        </mesh>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano002.geometry}
        material={nodes.Carroceria_Plano002.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano002_1.geometry}
        material={nodes.Carroceria_Plano002_1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano002_2.geometry}
        material={nodes.Carroceria_Plano002_2.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano002_3.geometry}
        material={nodes.Carroceria_Plano002_3.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano002_4.geometry}
        material={nodes.Carroceria_Plano002_4.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano002_5.geometry}
        material={nodes.Carroceria_Plano002_5.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano002_6.geometry}
        material={nodes.Carroceria_Plano002_6.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano002_7.geometry}
        material={nodes.Carroceria_Plano002_7.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano002_8.geometry}
        material={nodes.Carroceria_Plano002_8.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano002_9.geometry}
        material={nodes.Carroceria_Plano002_9.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano002_10.geometry}
        material={nodes.Carroceria_Plano002_10.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano002_11.geometry}
        material={nodes.Carroceria_Plano002_11.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano002_12.geometry}
        material={nodes.Carroceria_Plano002_12.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano002_13.geometry}
        material={nodes.Carroceria_Plano002_13.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano002_14.geometry}
        material={nodes.Carroceria_Plano002_14.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano002_15.geometry}
        material={materials.Color_A07}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Wall.geometry}
        material={nodes.Wall.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Main001.geometry}
        material={nodes.Main001.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Stairs.geometry}
        material={nodes.Stairs.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fountain.geometry}
        material={nodes.Fountain.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube010.geometry}
        material={nodes.Cube010.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube010_1.geometry}
        material={nodes.Cube010_1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube011.geometry}
        material={nodes.Cube011.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube011_1.geometry}
        material={nodes.Cube011_1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={nodes.Plane001.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001_1.geometry}
        material={nodes.Plane001_1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001_2.geometry}
        material={materials.Board2}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001_3.geometry}
        material={materials.Board1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={materials.Road}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane_1.geometry}
        material={nodes.Plane_1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane_2.geometry}
        material={nodes.Plane_2.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane_3.geometry}
        material={materials.Dirt}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane_4.geometry}
        material={nodes.Plane_4.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Stairs001.geometry}
        material={nodes.Stairs001.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pillars.geometry}
        material={nodes.Pillars.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={nodes.Cube.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bench.geometry}
        material={nodes.Bench.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bench001.geometry}
        material={nodes.Bench001.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bench007.geometry}
        material={nodes.Bench007.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bench002.geometry}
        material={nodes.Bench002.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bench003.geometry}
        material={nodes.Bench003.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bench004.geometry}
        material={nodes.Bench004.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004.geometry}
        material={nodes.Cube004.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004_1.geometry}
        material={nodes.Cube004_1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004_2.geometry}
        material={nodes.Cube004_2.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004_3.geometry}
        material={nodes.Cube004_3.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube005.geometry}
        material={nodes.Cube005.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube005_1.geometry}
        material={nodes.Cube005_1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube008.geometry}
        material={nodes.Cube008.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube008_1.geometry}
        material={nodes.Cube008_1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube012.geometry}
        material={nodes.Cube012.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube012_1.geometry}
        material={nodes.Cube012_1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano001.geometry}
        material={nodes.Carroceria_Plano001.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano001_1.geometry}
        material={nodes.Carroceria_Plano001_1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano001_2.geometry}
        material={nodes.Carroceria_Plano001_2.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano001_3.geometry}
        material={nodes.Carroceria_Plano001_3.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano001_4.geometry}
        material={nodes.Carroceria_Plano001_4.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano001_5.geometry}
        material={nodes.Carroceria_Plano001_5.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano001_6.geometry}
        material={nodes.Carroceria_Plano001_6.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano001_7.geometry}
        material={nodes.Carroceria_Plano001_7.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano001_8.geometry}
        material={nodes.Carroceria_Plano001_8.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano001_9.geometry}
        material={nodes.Carroceria_Plano001_9.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano001_10.geometry}
        material={nodes.Carroceria_Plano001_10.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano001_11.geometry}
        material={nodes.Carroceria_Plano001_11.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano001_12.geometry}
        material={nodes.Carroceria_Plano001_12.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano001_13.geometry}
        material={nodes.Carroceria_Plano001_13.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano001_14.geometry}
        material={nodes.Carroceria_Plano001_14.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano001_15.geometry}
        material={nodes.Carroceria_Plano001_15.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano003.geometry}
        material={materials.Christmas_Tree}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano003_1.geometry}
        material={nodes.Carroceria_Plano003_1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano003_2.geometry}
        material={nodes.Carroceria_Plano003_2.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano003_3.geometry}
        material={nodes.Carroceria_Plano003_3.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano003_4.geometry}
        material={nodes.Carroceria_Plano003_4.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano003_5.geometry}
        material={nodes.Carroceria_Plano003_5.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano003_6.geometry}
        material={nodes.Carroceria_Plano003_6.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano003_7.geometry}
        material={nodes.Carroceria_Plano003_7.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano003_8.geometry}
        material={nodes.Carroceria_Plano003_8.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano003_9.geometry}
        material={nodes.Carroceria_Plano003_9.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano003_10.geometry}
        material={nodes.Carroceria_Plano003_10.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano003_11.geometry}
        material={nodes.Carroceria_Plano003_11.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano003_12.geometry}
        material={nodes.Carroceria_Plano003_12.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano003_13.geometry}
        material={nodes.Carroceria_Plano003_13.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano003_14.geometry}
        material={nodes.Carroceria_Plano003_14.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Carroceria_Plano003_15.geometry}
        material={nodes.Carroceria_Plano003_15.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={nodes.Cube001.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001_1.geometry}
        material={nodes.Cube001_1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001_2.geometry}
        material={nodes.Cube001_2.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001_3.geometry}
        material={materials.Logo2}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001_4.geometry}
        material={materials.YellowLogo}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001_5.geometry}
        material={materials.Logo3}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={nodes.Cube003.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003_1.geometry}
        material={materials.Mark}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle001.geometry}
        material={nodes.Circle001.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle001_1.geometry}
        material={materials.BlueLogo}
      />
    </group>
  );
}

useGLTF.preload("/School.glb");

/* eslint-disable array-callback-return */
import React, { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  PointerLockControls,
  Html,
  useProgress,
  Stats,
} from "@react-three/drei";
import { Physics, usePlane } from "@react-three/cannon";
import {
  User,
  Sky,
  Users,
  School,
  Speaker,
  Dance,
  ChristmasTree,
} from "../components";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center className="bg-gray-700 h-screen w-screen">
      <div className="flex items-center justify-center max-w-3xl mx-auto h-screen">
        <h3 className="text-3xl font-semibold text-white">
          {progress} % loaded
        </h3>
      </div>
    </Html>
  );
}

function Plane(props) {
  const [ref] = usePlane(() => ({
    mass: 100,
    rotation: [-Math.PI / 2, 0, 0],
    type: "Static",
  }));
  return (
    <mesh {...props} ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <meshPhongMaterial attach="material" color="#000" />
    </mesh>
  );
}

export default function World({ socket, mute, microphone, voiceData }) {
  const [userId, setUserId] = useState();
  const [users, setUsers] = useState([]);
  const [usersVoice, setUsersVoice] = useState();
  useEffect(() => {
    socket.on("welcome", ({ id, users }) => {
      setUserId(id);
      setUsers(users);
    });
    socket.on("newUserConnected", ({ new_user_id, user }) => {
      setUsers((users) => [...users, user]);
    });
    socket.on("userDisconnected", (data) => {
      setUsers((users) => users.filter((user) => user.id !== data));
    });
    socket.on("userPositions", (data) => {
      setUsers(data);
    });
    socket.on("send", (data) => {
      setUsersVoice(data);
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (microphone && voiceData) {
      const data = {
        id: userId,
        data: voiceData,
      };
      socket.emit("voice", data);
    }
    // eslint-disable-next-line
  }, [voiceData, microphone, userId]);
  return (
    <div className="h-full">
      <Canvas shadows>
        <Stats showPanel={0} className="stats" />
        <Sky />
        <Physics gravity={[0, -35, 0]}>
          <User
            position={[Math.random() * (5, 10) + 5, 1, Math.random() * (5, 10)]}
            socket={socket}
          />

          <Suspense fallback={<Loader />}>
            <Speaker mute={mute} position={[10, 0.5, 5]} rotation={[0, 0, 0]} />
            <Speaker
              mute={mute}
              position={[10, 0.5, 15]}
              rotation={[0, 0, 0]}
            />
            <Speaker
              mute={mute}
              position={[10, 0.5, 25]}
              rotation={[0, 0, 0]}
            />
            <Speaker
              mute={mute}
              position={[10, 0.5, 35]}
              rotation={[0, 0, 0]}
            />
            <Speaker
              mute={mute}
              position={[-5, 0.5, 3]}
              rotation={[0, 1.5, 0]}
            />
            <Speaker
              mute={mute}
              position={[-15, 0.5, 3]}
              rotation={[0, 1.5, 0]}
            />
            <Speaker
              mute={mute}
              position={[-25, 0.5, 3]}
              rotation={[0, 1.5, 0]}
            />
            <Speaker
              mute={mute}
              position={[-35, 0.5, 3]}
              rotation={[0, 1.5, 0]}
            />
            <School />
            <Dance />
            <ChristmasTree />
            {users.map((user, index) => {
              if (user.id !== userId) {
                return (
                  <Users
                    key={index}
                    position={user.position}
                    rotation={user.rotation}
                    colour={user.colour}
                    audio={
                      usersVoice && usersVoice.id === user.id
                        ? usersVoice.data
                        : null
                    }
                    name={user.name}
                  />
                );
              }
            })}
          </Suspense>
          <Plane />
        </Physics>
        <ambientLight intensity={0.6} />
        <PointerLockControls />
      </Canvas>
    </div>
  );
}

/* eslint-disable array-callback-return */
import React, { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PointerLockControls, Html, useProgress } from "@react-three/drei";
import { Physics, usePlane } from "@react-three/cannon";
import {
  User,
  Sky,
  Users,
  School,
  Speaker,
  Dance,
  ChristmasTree,
  Bar,
} from "./index";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html
      center
      className="bg-slate-700 h-screen w-screen"
      position={[-67, 0, 0]}
    >
      <div className="flex items-center justify-center max-w-3xl mx-auto h-screen">
        <h3 className="text-3xl font-semibold text-white">
          <CircularProgressbar
            value={progress}
            text={`${Math.round(progress)}%`}
            strokeWidth={5}
            styles={buildStyles({
              textColor: "white",
              pathColor: "#10b981",
              textSize: "12px",
            })}
          />
        </h3>
      </div>
    </Html>
  );
}

function Plane(props) {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    type: "Static",
  }));
  return (
    <mesh {...props} ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <meshPhongMaterial attach="material" color="#000" />
    </mesh>
  );
}

export default function World({
  socket,
  mute,
  microphone,
  voiceData,
  isAddressAll,
}) {
  const [userId, setUserId] = useState();
  const [users, setUsers] = useState([]);
  const [usersVoice, setUsersVoice] = useState();
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (socket) {
      socket.on("welcome", ({ id, users, currentTime }) => {
        setUserId(id);
        setUsers(users);
        setCurrentTime(currentTime);
      });
      socket.on("newUserConnected", ({ user }) => {
        setUsers((users) => [...users, user]);
      });
      socket.on("userDisconnected", (data) => {
        setUsers((users) => users.filter((user) => user.id !== data.id));
      });
      socket.on("userPositions", (data) => {
        setUsers(data);
      });
      socket.on("send", (data) => {
        setUsersVoice(data);
      });
    }
    // eslint-disable-next-line
  }, [socket]);

  useEffect(() => {
    if (microphone && voiceData) {
      const data = {
        id: userId,
        data: voiceData,
        isAddressAll,
      };
      if (socket) socket.emit("voice", data);
    }
    // eslint-disable-next-line
  }, [voiceData, microphone, userId, socket]);

  useEffect(() => {
    if (usersVoice) {
      let voiceData = new Audio(usersVoice.data);
      if (usersVoice.isAddressAll) voiceData.play();
    }
  }, [usersVoice]);

  return (
    <div className="h-full">
      <Canvas frameloop="demand" mode="concurrent">
        <Physics gravity={[0, -35, 0]}>
          <Plane />
          <User
            position={[
              Math.random() * -1 + -67,
              Math.random() * 2 + 1,
              Math.random() * 27 + 26,
            ]}
            socket={socket}
          />
          <Suspense fallback={<Loader />}>
            <Sky />
            <Speaker
              mute={mute}
              position={[10, 0.5, 5]}
              rotation={[0, 0, 0]}
              socket={socket}
              currentTime={currentTime}
              isAddressAll={
                usersVoice && usersVoice.isAddressAll ? true : false
              }
              userIsAddressAll={isAddressAll}
              microphone={microphone}
            />
            <Speaker
              mute={mute}
              position={[10, 0.5, 35]}
              rotation={[0, 0, 0]}
              socket={socket}
              currentTime={currentTime}
              isAddressAll={
                usersVoice && usersVoice.isAddressAll ? true : false
              }
              userIsAddressAll={isAddressAll}
              microphone={microphone}
            />
            <Speaker
              mute={mute}
              position={[-35, 0.5, 1.5]}
              rotation={[0, 1.5, 0]}
              socket={socket}
              currentTime={currentTime}
              isAddressAll={
                usersVoice && usersVoice.isAddressAll ? true : false
              }
              userIsAddressAll={isAddressAll}
              microphone={microphone}
            />
            <Speaker
              mute={mute}
              position={[-45, 0.5, 36]}
              rotation={[0, 4.7, 0]}
              socket={socket}
              currentTime={currentTime}
              isAddressAll={
                usersVoice && usersVoice.isAddressAll ? true : false
              }
              userIsAddressAll={isAddressAll}
              microphone={microphone}
            />

            <School />
            <Bar />
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
                    microphone={user.microphone}
                    mute={user.mute}
                    image={user.image}
                  />
                );
              }
            })}
          </Suspense>
        </Physics>
        <ambientLight intensity={0.7} />
        <PointerLockControls />
      </Canvas>
    </div>
  );
}

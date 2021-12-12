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
  Bar,
  // GangDance,
} from "../components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center className="bg-slate-700 h-screen w-screen">
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
          {/* {Math.round(progress)} % loaded */}
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
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (microphone && voiceData) {
      const data = {
        id: userId,
        data: voiceData,
        isAddressAll,
      };
      socket.emit("voice", data);
    }
    // eslint-disable-next-line
  }, [voiceData, microphone, userId]);

  useEffect(() => {
    if (usersVoice) {
      let voiceData = new Audio(usersVoice.data);
      if (usersVoice.isAddressAll) voiceData.play();
    }
  }, [usersVoice]);

  return (
    <div className="h-full">
      <Canvas frameloop="demand" mode="concurrent">
        <Physics
          gravity={[0, -35, 0]}
          size={100}
          tolerance={0.001}
          iterations={5}
          broadphase={"Naive"}
          step={1 / 60}
          shouldInvalidate={true}
          children
          allowSleep={false}
          axisIndex={0}
          defaultContactMaterial={1e6}
        >
          <Suspense fallback={<Loader />}>
            <Stats showPanel={0} />
            <Sky />
            <User
              position={[
                Math.random() * -1 + -67,
                Math.random() * 2 + 1,
                Math.random() * 27 + 26,
              ]}
              socket={socket}
            />
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
              position={[10, 0.5, 15]}
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
              position={[10, 0.5, 25]}
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
              position={[-5, 0.5, 3.5]}
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
              position={[-15, 0.5, 3.5]}
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
              position={[-25, 0.5, 3.5]}
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
              position={[-35, 0.5, 3.5]}
              rotation={[0, 1.5, 0]}
              socket={socket}
              currentTime={currentTime}
              isAddressAll={
                usersVoice && usersVoice.isAddressAll ? true : false
              }
              userIsAddressAll={isAddressAll}
              microphone={microphone}
            />
            <School />
            <Dance />
            {/* <GangDance /> */}
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
            <Bar />
            <Plane />
          </Suspense>
        </Physics>
        <ambientLight intensity={0.6} />
        <PointerLockControls />
      </Canvas>
    </div>
  );
}

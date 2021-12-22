import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export default function Loading({ progress }) {
  return (
    <div center className="bg-slate-700 h-screen w-screen">
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
    </div>
  );
}

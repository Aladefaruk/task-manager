/** @format */

import React from "react";


const Board = ({ data, active, changeTab, removeBoard, setDefault }) => {
  return (
    <div
      className={`${
        data?._id !== active ? "bg-[#1E1E1E]" : "bg-[#fff]"
      } w-[150px] p-2 rounded-md`}
      onClick={() => changeTab()}
    >
      <div className="flex justify-center text-[10px] lg:text-[13px] text-center">
        <h2>
          {data?.name}
          {data?.name?.length > 14 ? "..." : ""}{" "}
        </h2>
        {/* <span
          onClick={() => {
            removeBoard(data?._id);
            changeTab();
          }}
          className={`ml-2  cursor-pointer ${
            data?._id !== active ? "text-[#fff]" : "text-[#1E1E1E]"
          } `}
        >
          x
        </span> */}
      </div>
    </div>
  );
};
export default Board;

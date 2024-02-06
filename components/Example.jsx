"use client";
import Image from "next/image";
import { videoEx } from "@/assets";
import { useContext } from "react";
import { BoardContext } from "@/context/BoardGuruContext";

const Example = () => {
  const context = useContext(BoardContext);

  return (
    <>
      <div className=" w-full h-screen  absolute top-0 bottom-0 z-10 bg-black/30 " />
      <section
        className="bg-gray-50 w-10/12 md:w-1/2 p-6 rounded-md flex flex-col items-center
      absolute top-16 z-30 left-0 right-0 mx-auto"
      >
        <h2 className="font-bold text-xl md:text-3xl text-center">
          Welcome to Board
          <span className="  p-1 mr-2 rounded-md  bg-gradient-to-r from-purple-400 to-yellow-400">
            Guru
          </span>
        </h2>

        <p className="text-center py-5">
          Seamlessly organize tasks with Board Guru. Just drag and drop tasks
          across columns for a hassle-free and efficient project management
          experience.
        </p>

        <Image
          src={videoEx}
          alt="video"
          priority
          className="object-contain rounded-md mb-5 w-6/12 h-56"
        />
        <button
          onClick={context.handleExample}
          className="p-5 bg-yellow-300 rounded-lg"
        >
          Get Started
        </button>
      </section>
    </>
  );
};

export default Example;

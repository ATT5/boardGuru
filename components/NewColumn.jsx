"use client";
import { useContext, useState } from "react";
import { BoardContext } from "@/context/BoardGuruContext";
import Image from "next/image";
import { closeIcon } from "@/assets";
const NewColumn = () => {
  const context = useContext(BoardContext);
  const [title, setTitle] = useState("");

  const handleTitle = (e) => setTitle(e.target.value);

  const handleAddNewColum = (e) => {
    e.preventDefault();
    if (title.trim().length === 0) return;

    context.addColumnHandler(title);
    context.handleNewColum();
  };

  return (
    <>
      <div
        onClick={context.handleNewColum}
        className=" w-full h-screen  absolute top-0 bottom-0 z-10 bg-black/30 "
      />
      <form
        action=""
        onSubmit={handleAddNewColum}
        className="bg-gray-50  w-5/6 md:w-1/2 px-9 py-4 rounded-lg flex flex-col gap-2 absolute top-10 left-0 right-0  mx-auto z-20 
        shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] animated animatedFadeInUp fadeInUp  dark:dark:bg-[#383838] dark:text-white "
      >
        <Image
          src={closeIcon}
          width={30}
          height={30}
          alt="close"
          className="self-end m-0 cursor-pointer"
          onClick={context.handleNewColum}
        />
        <h2 className="font-bold text-xl">Add new card</h2>
        <input
          className=" border-2   p-2 rounded-md  dark:bg-black/40 dark:border-black  "
          type="text"
          placeholder="Title..."
          required
          onChange={handleTitle}
        />
        <button className="self-start bg-green-500 py-2 px-4 rounded-lg active:bg-green-400 text-white">
          Add new card
        </button>
      </form>
    </>
  );
};

export default NewColumn;

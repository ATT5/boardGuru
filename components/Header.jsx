"use client";
import { userIcon, sunIcon, logoIcon } from "@/assets";
import Image from "next/image";
import { useContext, useState } from "react";
import { BoardContext } from "@/context/BoardGuruContext";
import LoginModule from "./LoginModule";

const Header = () => {
  const context = useContext(BoardContext);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <header
      className=" py-2 flex justify-between items-center bg-[#DCDCDC]  border-b-2 border-gray-200 text-black/85 
    dark:bg-black dark:text-white z-10"
    >
      <h1 className=" text-3xl font-bold flex items-center ml-4">
        <Image
          src={logoIcon}
          width={25}
          height={25}
          alt="sun"
          className="mr-1"
        />
        B
        <span className="  mr-2 rounded-md  bg-gradient-to-r from-purple-400 to-yellow-400">
          G
        </span>
      </h1>
      <p className=" hidden md:block font-bold bg-gradient-to-r from-purple-400 to-yellow-400 p-1 rounded-md">
        Where Every Project Finds its Flow.
      </p>
      <div className="flex font-bold items-center gap-2  h-full ">
        <Image
          src={sunIcon}
          width={20}
          height={20}
          alt="sun"
          className="mr-1 md:mr-5 cursor-pointer"
          onClick={context.handleDarkMode}
        />
        {!context.user ? (
          <p
            onClick={() => setShowLogin(true)}
            className=" font-bold hover:text-blue-400 border-2 border-gray-500 p-1  rounded-md cursor-pointer "
          >
            Log in
          </p>
        ) : (
          <p
            className=" font-bold hover:text-blue-400 border-2 border-gray-500 p-1  rounded-md cursor-pointer "
            onClick={() => setShowLogin(true)}
          >
            Log out
          </p>
        )}
        <Image src={userIcon} width={40} height={40} alt="user Icon" />
      </div>
      <div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100
      rounded-md filter blur-3xl opacity-50 -z-50 "
      />
      {showLogin && <LoginModule showLogin={setShowLogin} />}
    </header>
  );
};

export default Header;

import Image from "next/image";
import { openIcon } from "@/assets";
import { useState, useContext } from "react";
import { BoardContext } from "@/context/BoardGuruContext";
import Menu from "./Menu";

const BoardMenu = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const context = useContext(BoardContext);

  return (
    <section
      className={`h-full bg-[#DCDCDC] dark:bg-[#404040] fixed z-[5] top-14 left-0 flex flex-col  ${
        openMenu ? "p-4 w-72" : "w-3"
      }  dark:text-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]`}
    >
      <div
        onClick={() => setOpenMenu((prev) => !prev)}
        className="w-20 h-14 bg-[#DCDCDC]  dark:bg-[#404040] absolute -z-30 top-1/2 -right-4 rounded-3xl  flex justify-end items-center cursor-pointer"
      >
        <Image
          alt="open"
          width={20}
          height={20}
          src={openIcon}
          className={`${openMenu ? "-rotate-90" : "rotate-90"}`}
        />
      </div>
      {openMenu && <Menu />}
    </section>
  );
};

export default BoardMenu;

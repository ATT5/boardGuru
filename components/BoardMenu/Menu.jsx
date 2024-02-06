import { BoardContext } from "@/context/BoardGuruContext";
import { useContext, useState } from "react";
import Image from "next/image";
import { personIcon } from "@/assets";

const colors = [
  "bg-customOrange",
  "bg-customPink",
  "bg-customBlue",
  "bg-customGreen",
];

const Menu = () => {
  const context = useContext(BoardContext);
  const members = context.state.members;
  const [assignTask, setAssignTask] = useState(true);
  const [member, setMember] = useState("");

  const BoxColor = (color) => (
    <div
      style={{ backgroundColor: `${color}` }}
      className={`w-9 h-9 rounded-sm bg-[${color}]  cursor-pointer border-[1px] border-black text-center`}
      onClick={() => context.setBackgroundColor(color)}
    />
  );

  return (
    <>
      <button
        className="min-w-64 h-12 p-2  bg-white/20 rounded-md text-start active:bg-slate-50 font-medium
                shadow-lg ring-1 ring-black/5 flex items-center gap-3 dark:text-white mb-6"
        onClick={context.handleNewColum}
      >
        <span className="w-5 h-5 p-1 border-2 rounded-full border-black flex items-center justify-center dark:text-black">
          +
        </span>
        Add Column
      </button>
      <p className="text-start font-bold">Background Color</p>
      <p
        className=" text-blue-400 cursor-pointer hover:text-black dark:hover:text-white mb-2"
        onClick={() => context.setBackgroundColor(null)}
      >
        Original
      </p>
      <div className=" flex gap-2  pb-3 border-b-[1px]">
        {colors.map((color) => (
          <button
            key={color}
            className={`w-9 h-9 rounded-sm ${color}  cursor-pointer border-[1px] border-black text-center`}
            onClick={() => context.setBackgroundColor(color)}
          ></button>
        ))}
      </div>
      <p className="mt-4 mb-2 font-bold">Members</p>
      <div className="flex">
        <Image src={personIcon} width={25} height={25} alt="user" />
        {assignTask ? (
          <p
            className="text-blue-500 cursor-pointer hover:text-blue-200 mb-2"
            onClick={() => setAssignTask(false)}
          >
            Create Member
          </p>
        ) : (
          <div className="flex gap-1 mb-2">
            <input
              type="text"
              placeholder="Add Member"
              value={member}
              className=" border-2   p-2 rounded-md  dark:bg-black/40 dark:border-black "
              onChange={(e) => setMember(e.target.value)}
            />
            <button
              className="bg-green-400 p-2 rounded-md active:bg-green-300"
              onClick={() => {
                context.createMember(member);
                setMember("");
              }}
            >
              Add
            </button>
          </div>
        )}
      </div>
      <div className="border-b-[1px] pb-2 overflow-y-auto max-h-72 px-1">
        {members.map((member) => (
          <p
            key={member}
            className="bg-slate-200 dark:bg-black p-2 rounded-2xl flex gap-1 my-1 overflow-hidden"
          >
            <Image src={personIcon} width={15} height={15} alt="user" />
            {member}
          </p>
        ))}
      </div>
    </>
  );
};

export default Menu;

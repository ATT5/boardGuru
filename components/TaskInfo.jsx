"use client";
import { useContext, useState } from "react";
import { BoardContext } from "@/context/BoardGuruContext";
import { dateIcon, textIcon, personIcon, closeIcon } from "@/assets";
import Image from "next/image";

const TaskInfo = () => {
  const context = useContext(BoardContext);
  const task = context.taskInfo;
  const [assignTask, setAssignTask] = useState(true);
  const [assignedPerson, setAssignedPerson] = useState(""); // New state to hold assigned person
  const members = context.state.members;

  const handleAddPerson = (member) => {
    context.assignTaskHandler(task.id, member);
    setAssignedPerson("");
  };
  console.log(task);
  return (
    <>
      <div
        className=" w-full h-screen  absolute top-0 bottom-0 z-10 bg-black/30 "
        onClick={context.taskInfoHandler}
      />
      <section
        className="bg-gray-50  w-5/6 md:w-1/2 px-9 py-4 rounded-lg flex flex-col gap-2 absolute top-10 left-0 right-0  mx-auto z-20 
        shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] animated animatedFadeInUp fadeInUp  dark:dark:bg-[#383838] dark:text-white"
      >
        <Image
          src={closeIcon}
          width={30}
          height={30}
          alt="close"
          className="self-end m-0 cursor-pointer"
          onClick={context.taskInfoHandler}
        />
        <h3 className="text-gray-500 text-lg">Task Description</h3>
        <p className="font-medium text-2xl">- {task.content}</p>
        <div className="flex gap-2 border-b-[1px] pb-5">
          <Image width={25} height={25} alt="date" src={dateIcon} />
          <p
            className={`${
              task.date.length === 0
                ? ""
                : "bg-[#ffe58f] p-2 rounded-md dark:text-gray-400 "
            }`}
          >
            {task.date.length === 0 ? "No date" : task.date}
          </p>
        </div>
        <div className="flex gap-2 border-b-[1px] pb-5 mb-4">
          <Image width={25} height={25} alt="date" src={textIcon} />
          <p>
            {task.description.length === 0
              ? "No additional information"
              : task.description}
          </p>
        </div>
        <div className="flex gap-2 items-center border-b-[1px] pb-2">
          {assignTask ? (
            <>
              <Image src={personIcon} width={25} height={25} alt="user" />
              <p
                className="text-blue-500 cursor-pointer hover:text-blue-200"
                onClick={() => setAssignTask(false)}
              >
                Assign Task
              </p>
            </>
          ) : (
            <>
              <p>Select member:</p>
              <div className="flex gap-2">
                {members.map((member, index) => (
                  <p
                    key={`member-${index}`}
                    className="bg-slate-200 dark:bg-black p-2 rounded-2xl flex gap-1 my-1 cursor-pointer"
                    onClick={() => handleAddPerson(member)}
                  >
                    <Image src={personIcon} width={15} height={15} alt="user" />
                    {member}
                  </p>
                ))}
              </div>
            </>
          )}
        </div>
        <p>Member for this task:</p>{" "}
        <div className="flex gap-2">
          {task.assignedTo.map((member, index) => (
            <p
              key={`member-${index}`}
              className="bg-red-300 dark:bg-black p-2 rounded-2xl flex gap-1 my-1 cursor-pointer"
            >
              {member}
            </p>
          ))}{" "}
        </div>
        {task.important && (
          <p className="text-red-500">{"This task is a priority"} </p>
        )}
      </section>
    </>
  );
};

export default TaskInfo;

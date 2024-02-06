"use client";
import { Draggable } from "@hello-pangea/dnd";
import { deleteIcon, iconInfo, dateIcon } from "@/assets";
import Image from "next/image";
import { useContext } from "react";
import { BoardContext } from "@/context/BoardGuruContext";

const Task = ({ task, index, columnId }) => {
  const context = useContext(BoardContext);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <section
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`w-full  my-2 rounded-lg flex flex-col justify-between p-1  ${
            snapshot.isDragging
              ? "bg-blue-100 dark:bg-gray-300"
              : "bg-gray-100/90  dark:bg-[#353535]  "
          } ${
            task.important ? "border-l-8 border-red-500" : ""
          }  shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]`}
        >
          <div className=" flex justify-between p-2 hover-child relative ">
            <div className="overflow-hidden">
              <div className="flex items-center gap-3">
                <Image
                  alt="information"
                  src={iconInfo}
                  width={20}
                  height={20}
                  className="cursor-pointer"
                  onClick={() => context.taskInfoHandler(task)}
                />
                <p>{task.content}</p>
              </div>
              {task.date.length > 0 && (
                <div className="flex gap-1">
                  <Image width={20} height={20} alt="date" src={dateIcon} />
                  <p className="bg-[#ffe58f] w-20 p-2 rounded-md dark:text-gray-400 ">
                    {task.date}
                  </p>
                </div>
              )}
            </div>

            <Image
              alt="delete"
              src={deleteIcon}
              width={20}
              height={20}
              className="cursor-pointer hidden  cursor-pointer"
              onClick={() => context.deleteTaskHandler(task, columnId)}
            />
          </div>

          {task.img && (
            <img
              src={task.img}
              alt={task.content}
              className="w-full h-52 object-cover rounded-b-lg"
            />
          )}
        </section>
      )}
    </Draggable>
  );
};

export default Task;

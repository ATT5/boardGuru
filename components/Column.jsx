"use client";
import Task from "./Task";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useContext } from "react";
import { BoardContext } from "@/context/BoardGuruContext";
import { deleteIcon } from "@/assets";
import Image from "next/image";
const Column = ({ column, tasks, index }) => {
  const context = useContext(BoardContext);

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex justify-center min-w-80  max-w-80   md:mb-10 flex-col flex-grow   rounded-lg bg-white/65
           shadow-lg ring-1 ring-black/5  p-2 dark:bg-[#1e1e1e] dark:text-white "
        >
          {tasks && (
            <>
              <div
                className="flex  px-2 items-center  hover-child rounded-lg border-b-2 border-gray-200
              bg-[#f0f0f0] dark:border-0 dark:bg-black/30"
              >
                <h2 className="w-full p-2 font-extrabold text-xl  ">
                  {column.title}
                </h2>
                <Image
                  alt="delete"
                  src={deleteIcon}
                  width={20}
                  height={20}
                  className="cursor-pointer md:hidden"
                  onClick={() => context.deleteColumn(column.id)}
                />
              </div>

              <Droppable droppableId={column.id} type="task">
                {(provided, snapshot) => (
                  <>
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={` p-2 h-full rounded-md  ${
                        snapshot.isDraggingOver
                          ? "bg-green-300 mt-2 dark:bg-gray-500"
                          : ""
                      }`}
                    >
                      {tasks.map((task, index) => {
                        return (
                          <Task
                            key={task.id}
                            task={task}
                            index={index}
                            columnId={column.id}
                          />
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  </>
                )}
              </Droppable>
            </>
          )}
          <div className=" flex justify-end p-2 rounded-xl">
            <button
              onClick={() => context.openNewTaskHandler(column.id)}
              className="w-7 h-7 bg-green-400 rounded-full text-center active:bg-green-600 text-white"
            >
              +
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Column;

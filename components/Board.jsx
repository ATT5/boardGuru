"use client";

import Column from "./Column";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useContext } from "react";
import { BoardContext } from "@/context/BoardGuruContext";
import BoardMenu from "./BoardMenu/BoardMenu";

const Board = () => {
  const context = useContext(BoardContext);

  const onDragEndHandler = (event) => {
    const { destination, source, draggableId, type } = event;
    context.tasksHandler(destination, source, draggableId, type);
  };

  return (
    <DragDropContext onDragEnd={onDragEndHandler}>
      <Droppable
        droppableId="all-columns"
        direction={"horizontal"}
        type="column"
      >
        {(provided) => (
          <>
            <section
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`w-full  px-5 flex items-start  pt-4 overflow-x-auto gap-10  absolute top-14 bottom-0 left-0 right-0
             ${
               context.backgroundColor ? `bg-[${context.backgroundColor}]` : ""
             }   ${
                context.backgroundColor
                  ? `dark:bg-[${context.backgroundColor}]`
                  : "dark:bg-[#121212]"
              }   `}
            >
              <BoardMenu />
              {context.state.columnOrder.map((columnId, index) => {
                const column = context.state.columns[columnId];
                const task = column.taskIds.map(
                  (taskId) => context.state.tasks[taskId]
                );

                return (
                  <Column
                    key={column.id}
                    column={column}
                    tasks={task}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}{" "}
              {/* <button
                onClick={context.handleNewColum}
                className="min-w-64 h-12 p-2  bg-white/20 rounded-md text-start active:bg-slate-50 font-medium
                shadow-lg ring-1 ring-black/5 flex items-center gap-3 dark:text-white"
              >
                <span className="w-5 h-5 p-1 border-2 rounded-full border-black flex items-center justify-center dark:text-black">
                  +
                </span>
                Add Column
              </button> */}
            </section>{" "}
          </>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;

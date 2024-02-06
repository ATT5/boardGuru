"use client";
import Board from "@/components/Board";
import Header from "@/components/Header";
import NewTask from "@/components/NewTask";
import Example from "@/components/Example";
import NewColumn from "@/components/NewColumn";
import TaskInfo from "@/components/TaskInfo";

import { useContext, useEffect } from "react";
import { BoardContext } from "@/context/BoardGuruContext";

export default function Home() {
  const context = useContext(BoardContext);

  return (
    <main
      className={`w-full relative h-screen max-h-screen  ${
        context.darkMode ? "dark" : ""
      }`}
    >
      {context.closeExample && <Example />}
      {context.newColumn && <NewColumn />}
      {context.showTaskInfo && <TaskInfo />}
      <Header />
      <Board />
      {context.newTask.open && <NewTask />}
    </main>
  );
}

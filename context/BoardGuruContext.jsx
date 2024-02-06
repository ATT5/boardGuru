"use client";
import { createContext } from "react";
import { useState } from "react";
import supabase from "@/config/supabaseClient";

export const BoardContext = createContext(null);

export const initialState = {
  tasks: {},
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: [],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: [],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
  members: [],
};

const BoardGuruContext = ({ children }) => {
  const [state, setState] = useState(initialState);
  const [closeExample, setCloseExample] = useState(true);
  const [newColumn, setNewColumn] = useState(false);
  const [taskInfo, setTaskInfo] = useState("");
  const [showTaskInfo, setShowTaskInfo] = useState(false);
  const [newTask, setNewTask] = useState({ open: false, column: "" });
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(null);

  ///////////////////////////////////////////////////////
  const handleExample = () => setCloseExample(false);

  const openNewTaskHandler = (column) =>
    setNewTask({ open: true, column: column });

  const closeNewTaskHandler = () => setNewTask({ open: false, column: "" });

  const handleNewColum = () => setNewColumn((prev) => !prev);
  const handleDarkMode = () => setDarkMode((prev) => !prev);

  const taskInfoHandler = (task) => {
    setTaskInfo(task);
    setShowTaskInfo((prev) => !prev);
  };

  //Add new task to the state 🆕
  const addTaskHandler = (newTask, selectedColumnId) => {
    // Create a copy of the state to avoid directly mutating it
    const newState = { ...state };

    newState.tasks[newTask.id] = {
      id: newTask.id,
      content: newTask.content,
      img: newTask.imageUrl,
      description: newTask.description,
      date: newTask.date,
      important: newTask.important,
      assignedTo: [],
    };

    // Add the new task ID to the taskIds array of the selected column
    newState.columns[selectedColumnId].taskIds.push(newTask.id);

    setState(newState);

    if (user) updateUserData(newState);
  };

  // delete tasks 🔥
  const deleteTaskHandler = (task, columnId) => {
    const newState = { ...state };

    // Remove the task from the tasks object
    delete newState.tasks[task.id];

    // Remove the task ID from the taskIds array of the associated column
    newState.columns[columnId].taskIds = newState.columns[
      columnId
    ].taskIds.filter((id) => id !== task.id);

    // Set the updated state
    setState(newState);

    if (user) updateUserData(newState);
  };

  //Add new column
  const addColumnHandler = (title) => {
    const newState = { ...state };

    const newColumnId = `column-${Object.keys(state.columns).length + 1}`;

    newState.columns[newColumnId] = {
      id: newColumnId,
      title: title,
      taskIds: [],
    };

    newState.columnOrder.push(newColumnId);
    setState(newState);

    if (user) updateUserData(newState);
  };

  const deleteColumn = (columnId) => {
    const newState = { ...state };

    newState.columns[columnId].taskIds.forEach((taskId) => {
      delete newState.tasks[taskId];
    });

    delete newState.columns[columnId];

    newState.columnOrder = newState.columnOrder.filter((id) => id !== columnId);

    console.log(newState);
    setState(newState);

    if (user) updateUserData(newState);
  };

  const assignTaskHandler = (taskId, assignedPerson) => {
    const newState = { ...state };
    if (!newState.tasks[taskId].assignedTo.includes(assignedPerson)) {
      newState.tasks[taskId].assignedTo.push(assignedPerson);
      console.log(newState);
      setState(newState);
      if (user) updateUserData(newState);
    }
  };

  const createMember = (member) => {
    if (!member.trim()) return;
    const newState = { ...state };

    newState.members.push(member);
    setState(newState);
  };

  //handle the moves of the tasks 🚀
  const tasksHandler = (destination, source, draggableId, type) => {
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    //Reordering columns
    if (type === "column") {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...state,
        columnOrder: newColumnOrder,
      };

      setState(newState);

      if (user) updateUserData(newState);
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    ///reordering tasks
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);

      //Remove the select element from the Array
      newTaskIds.splice(source.index, 1);
      //Relocates the element in the Array
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...start, taskIds: newTaskIds };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);

      if (user) updateUserData(newState);
      return;
    }

    //Moving from one list to another one

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);

    const newStart = { ...start, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finish.taskIds);

    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setState(newState);

    if (user) updateUserData(newState);
    return;
  };

  //////////////////login functions

  const submitBoardData = async (userId) => {
    console.log(state);
    const { data, error } = await supabase
      .from("board")
      .insert({ user: userId, boardInfo: state });

    if (error) {
      console.log(error);
      return;
    }
  };

  const getUserData = async (userId) => {
    let { data: board, error } = await supabase
      .from("board")
      .select("boardInfo")
      .eq("user", userId);

    if (error) {
      console.log(error);
      return;
    }

    if (board) {
      const userBoard = board[0].boardInfo;
      setState(userBoard);
    }
  };

  async function updateUserData(newState) {
    const { data, error } = await supabase
      .from("board")
      .update({ boardInfo: newState })
      .eq("user", user.id)
      .select();

    if (error) {
      console.log(error);
      return;
    }
  }

  return (
    <BoardContext.Provider
      value={{
        state,
        newTask,
        newColumn,
        closeExample,
        showTaskInfo,
        taskInfo,
        darkMode,
        user,
        loading,
        backgroundColor,
        setBackgroundColor,
        setUser,
        handleExample,
        tasksHandler,
        openNewTaskHandler,
        closeNewTaskHandler,
        addTaskHandler,
        addColumnHandler,
        deleteTaskHandler,
        handleNewColum,
        deleteColumn,
        taskInfoHandler,
        handleDarkMode,
        assignTaskHandler,
        createMember,
        ///// database
        submitBoardData,
        getUserData,
        setState,
        setLoading,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardGuruContext;

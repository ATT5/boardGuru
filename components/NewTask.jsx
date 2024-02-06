"use client";
import Image from "next/image";
import { useState, useContext } from "react";
import { BoardContext } from "@/context/BoardGuruContext";
import { closeIcon } from "@/assets";

const NewTask = () => {
  const context = useContext(BoardContext);

  const [taskName, setTaskName] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [importantTask, setImportantTask] = useState(false);

  const handleCloseNewTask = () => context.closeNewTaskHandler();

  const handleTaskNameChange = (e) => setTaskName(e.target.value);

  const handleImageUrlChange = (e) => setImageUrl(e.target.value);

  const handleDescription = (e) => setDescription(e.target.value);

  const handleCheckBox = (e) => setImportantTask(e.target.checked);

  const handleDate = (e) => {
    const dateObject = new Date(e.target.value);

    const day = String(dateObject.getDate()).padStart(2, "0");
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const year = String(dateObject.getFullYear()).slice(-2);

    // Format the date as dd/mm/yy
    const formattedDate = `${day}-${month}-${year}`;

    setDate(formattedDate);
  };

  const handleAddNewTask = (e) => {
    e.preventDefault();

    const trimmedTaskName = taskName.trim();

    if (!trimmedTaskName) return;

    const newTaskId = `task-${Object.keys(context.state.tasks).length + 1}`;

    const newTask = {
      id: newTaskId,
      content: taskName,
      imageUrl: imageUrl,
      description: description,
      date: date,
      important: importantTask,
    };

    context.addTaskHandler(newTask, context.newTask.column);

    setTaskName("");
    setImageUrl("");

    // Close the new task form
    handleCloseNewTask();
  };

  return (
    <>
      <div
        className=" w-full h-screen  absolute top-0 bottom-0 z-10 bg-black/30 "
        onClick={handleCloseNewTask}
      />
      <form
        action=""
        onSubmit={handleAddNewTask}
        className="bg-gray-50  w-5/6 md:w-1/2 px-9 py-4 rounded-lg flex flex-col gap-2 absolute top-10 left-0 right-0  mx-auto z-20 
        shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] animated animatedFadeInUp fadeInUp  dark:dark:bg-[#383838] dark:text-white"
      >
        <Image
          src={closeIcon}
          width={30}
          height={30}
          alt="close"
          className="self-end m-0 cursor-pointer"
          onClick={handleCloseNewTask}
        />
        <h2 className="font-bold">Add a Task</h2>
        <p>Task *</p>
        <input
          className=" border-2   p-2 rounded-md  dark:bg-black/40 dark:border-black "
          type="text"
          placeholder="Enter a task here..."
          onChange={handleTaskNameChange}
          required
        />
        <p>Image</p>
        <input
          className=" border-2   p-2 rounded-md  dark:bg-black/40 dark:border-black  "
          type="text"
          placeholder="Add Image url..."
          onChange={handleImageUrlChange}
        />
        <p>Description</p>
        <textarea
          name="description"
          className="resize-none w-full h-14 border-2 mb-4 p-2 rounded-md  dark:bg-black/40 dark:border-black"
          placeholder="Add description..."
          onChange={handleDescription}
        ></textarea>
        <div className=" flex justify-between">
          <input
            type="date"
            name="date"
            className="w-1/4 border-2 border-black rounded-md  p-1  dark:bg-black/40 dark:border-black"
            onChange={handleDate}
          />
          <span className="flex gap-6 items-center mr-14">
            <p>Important Task</p>
            <input
              type="checkbox"
              onChange={handleCheckBox}
              className="w-4 h-4 "
            />
          </span>
        </div>
        <button className="self-start bg-green-500 py-2 px-4 rounded-lg active:bg-green-400 text-white">
          Add Task
        </button>
      </form>
    </>
  );
};

export default NewTask;

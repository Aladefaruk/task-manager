/** @format */
import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import TaskForm from "./TaskForm";

const List = ({
  list,
  index: listIndex,
  handleTaskAddition,
  handleEditTask,
  handleDeleteTask,
}) => {
  const [addTaskDropDown, setAddTaskDropDown] = useState(false);
  const [newTaskModal, setNewTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [edit, setEdit] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignee: "",
    dueDate: "",
    priority: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) {
      alert("Task title cannot be empty");
      return;
    }

    handleTaskAddition(listIndex, {
      ...newTask,
      _id: Date.now().toString(),
    });

    setNewTask({
      title: "",
      description: "",
      assignee: "",
      dueDate: "",
      priority: "",
    });

    setAddTaskDropDown(false);
    setNewTaskModal(false);
  };

  const SaveChanges = (listIndex, taskId) => {
    console.log(newTask);
    handleEditTask(listIndex, taskId, newTask);

    setNewTask({
      title: "",
      description: "",
      assignee: "",
      dueDate: "",
    });
    setNewTaskModal(false);
  };

  return (
    <div className="my-10 mx-1 lg:mx-4" key={listIndex}>
      <div
        className="w-[260px] lg:w-[304px] rounded-[12px] bg-[#EAEAEA] px-1 lg:px-4 py-2 text-[#333333] text-[15px] "
        style={{ border: "1px solid #ddd" }}
      >
        <div className="flex items-center justify-between mb-7">
          <h3>{list.title}</h3>
          <div className="relative inline-block text-left">
            <div
              onClick={() => {
                setNewTaskModal(true);
                setEdit(false);
              }}
              className="w-full flex justify-center text-center items-center cursor-pointer rounded-md bg-white px-3  text-sm  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              +
            </div>

            {addTaskDropDown && (
              <div
                className="absolute w-[200px] left-6 z-10 mt-14  px-2 py-3  mx-auto  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
              >
                <p
                  className="text-[12px] lg:text-[14px] text-[grey] my-2 cursor-pointer"
                  onClick={() => {
                    setNewTaskModal(true);
                    setEdit(true);
                    setAddTaskDropDown(false);
                  }}
                >
                  Edit
                </p>
                <p
                  className="text-[12px] lg:text-[14px] text-red-500 cursor-pointer"
                  onClick={() => {
                    handleDeleteTask(listIndex, selectedTask._id);
                    setAddTaskDropDown(false);
                  }}
                >
                  Delete
                </p>
              </div>
            )}
          </div>
        </div>
        <Droppable
          droppableId={`list-${list?._id}`}
          key={list._id.toString()}
          type="task"
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="task-list"
            >
              {list?.tasks?.map((task, index) => (
                <Draggable
                  key={task._id.toString()}
                  draggableId={`task-${task?._id}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`w-full border-[1px] flex items-center  text-white justify-between shadow-sm rounded-[5px] p-1 px-2 ${
                        task?.priority === "High"
                          ? "bg-red-500"
                          : task?.priority === "Medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      } my-2 cursor-pointer ${
                        snapshot.isDragging ? "dragging" : ""
                      }`}
                    >
                      <p>{task.title}</p>
                      <h1
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedTask(task);
                          setAddTaskDropDown(!addTaskDropDown);
                        }}
                      >
                        ...
                      </h1>
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </div>
      {newTaskModal && (
        <TaskForm
          selectedTask={selectedTask}
          close={() => setNewTaskModal(false)}
          handleInputChange={(e) => handleInputChange(e)}
          onAddTask={(prop) =>
            edit
              ? SaveChanges(listIndex, selectedTask?._id)
              : handleAddTask(prop)
          }
        />
      )}
    </div>
  );
};

export default List;

/** @format */

import React, { useState, useEffect } from "react";
import Board from "../components/Board";
import List from "../components/List";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Main = () => {
  const [activeBoard, setActiveBoard] = useState(0);
  const [addListDropDown, setAddListDropDown] = useState(false);
  const [boardDropDown, setBoardDropDown] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [listName, setListName] = useState("");
  const [allBoards, setAllBoards] = useState([
    {
      _id: 0,
      name: "Default Board",
      lists: [
        {
          _id: 0,
          title: "To Do",
          tasks: [
            {
              _id: Date.now() + "22a",
              title: "Title of task1",
              dueDate: "",
              assignee: "",
              priority: "",
            },
            {
              _id: Date.now() + "224a",
              title: "Title of task2",
              dueDate: "",
              assignee: "",
              priority: "",
            },
          ],
        },
        {
          _id: 1,
          title: "  In Progress",
          tasks: [
            {
              _id: Date.now() + "22b",
              title: "Title of task1",
              dueDate: "",
              assignee: "",
              priority: "",
            },
            {
              _id: Date.now() + "223b",
              title: "Title of task2",
              dueDate: "",
              assignee: "",
              priority: "",
            },
          ],
        },
        {
          _id: 2,
          title: "Done",
          tasks: [
            {
              _id: Date.now() + "22c",
              title: "Title of task1",
              dueDate: "",
              assignee: "",
              priority: "",
            },
            {
              _id: Date.now() + "223c",
              title: "Title of task2",
              dueDate: "",
              assignee: "",
              priority: "",
            },
          ],
        },
      ],
    },
  ]);

  //Code to call state from local storage
  useEffect(() => {
    let boards = JSON.parse(localStorage.getItem("tm_boards"));
    if (boards) {
      setAllBoards(boards);
      localStorage.setItem("tm_boards", JSON.stringify(allBoards));
    } else {
      localStorage.setItem("tm_boards", JSON.stringify(allBoards));
    }
  }, []);

  //Code to update state
  const updateBoard = (updatedBoards) => {
    localStorage.setItem("tm_boards", JSON.stringify(updatedBoards));
  };

  //Code to remove Board
  const RemoveBoard = (boardId) => {
    const updatedBoards = allBoards.filter((board) => board._id !== boardId);
    setAllBoards(updatedBoards);
    updateBoard(updatedBoards);
    setActiveBoard(0);
  };

  //Code to add new board to the database
  const AddBoard = (index) => {
    const newBoard = {
      _id: index.toString(),
      name: boardName,
      lists: [
        {
          _id: 0,
          title: "To Do",
          tasks: [
            {
              _id: Date.now() + "12a",
              title: "Title of task1",
              dueDate: "",
              assignee: "",
              priority: "",
            },
          ],
        },
        {
          _id: 1,
          title: "  In Progress",
          tasks: [
            {
              _id: Date.now() + "12b",
              title: "Title of task2",
              dueDate: "",
              assignee: "",
              priority: "",
            },
          ],
        },
        {
          _id: 2,
          title: "Done",
          tasks: [
            {
              _id: Date.now() + "12c",
              title: "Title of task3",
              dueDate: "",
              assignee: "",
              priority: "",
            },
          ],
        },
      ],
    };
    setAllBoards([...allBoards, newBoard]);

    let boards = JSON.parse(localStorage.getItem("tm_boards"));

    updateBoard([...boards, newBoard]);
  };

  //Code to update state
  useEffect(() => {
    localStorage.setItem("tm_boards", JSON.stringify(allBoards));
  }, [allBoards]);

  //Code to add new list to the active board
  const AddNewList = (prop) => {
    const updatedBoards = allBoards.map((board, index) => {
      if (board?._id === activeBoard) {
        return {
          ...board,
          lists: [
            ...board.lists,
            {
              _id: Date.now(),
              title: prop,
              tasks: [
                {
                  _id: Date.now(),
                  title: "Default Task",
                  description: "Describe  what Task is about",
                  dueDate: "Due date of task",
                  assignee: "assignee's email",
                  priority: "Low",
                },
              ],
            },
          ],
        };
      }
      return board;
    });

    setAllBoards(updatedBoards);
    updateBoard(updatedBoards);
  };

  //Drag and drop logic
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const newBoards = Array.from(allBoards);
    const [removed] = newBoards.splice(source.index, 1);
    newBoards.splice(destination.index, 0, removed);
    setAllBoards(newBoards);
  };

  const handleDragEnd = (result) => {
    const { source, destination, type } = result;
    console.log(result);

    // If there's no destination, do not do anything
    if (!destination) return;

    if (type === "lists") {
      const [movedList] = allBoards[activeBoard]?.lists.splice(source.index, 1);
      allBoards[activeBoard]?.lists.splice(destination.index, 0, movedList);
      setAllBoards([...allBoards]);
      return;
    }

    // If the task is dropped in the same position, do not do anything
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Get the source and destination lists
    const sourceListIndex = parseInt(source.droppableId.split("-")[1]);
    const destinationListIndex = parseInt(
      destination.droppableId.split("-")[1]
    );
    const sourceList = allBoards[activeBoard].lists.find(
      (list) => list._id === sourceListIndex
    );
    const destinationList = allBoards[activeBoard].lists.find(
      (list) => list._id === destinationListIndex
    );

    const [movedTask] = sourceList?.tasks?.splice(source.index, 1);
    console?.log(destinationList);
    if (!destinationList?.tasks) {
      console.log(destinationList);
      destinationList.tasks = [];
    }
    destinationList.tasks.splice(destination.index, 0, movedTask);

    // Update the state
    const updatedBoards = [...allBoards];

    setAllBoards(updatedBoards);
  };

  //Logic to add task
  const handleTaskAddition = (listIndex, newTask) => {
    const updatedBoards = [...allBoards]; // Make a copy of the current state
    const activeList = updatedBoards[activeBoard].lists[listIndex]; // Access the target list

    // Ensure the list has a tasks array
    if (!activeList.tasks) {
      activeList.tasks = [];
    }

    // Add the new task to the tasks array
    activeList.tasks.push(newTask);

    // Update the state with the modified boards array
    setAllBoards(updatedBoards);
  };
  //Logic to delete task
  const handleDeleteTask = (listIndex, taskId) => {
    const updatedBoards = [...allBoards];

    const activeList = updatedBoards[activeBoard].lists[listIndex];

    const updatedTasks = activeList.tasks.filter((task) => task._id !== taskId);

    updatedBoards[activeBoard].lists[listIndex].tasks = updatedTasks;

    setAllBoards(updatedBoards);
  };

  //Logic to edit task
  const handleEditTask = (listIndex, taskId, updatedTask) => {
    const updatedBoards = [...allBoards];
    console.log(updatedBoards, "active board", listIndex);

    const activeList = updatedBoards[activeBoard].lists[listIndex];
    const taskIndex = activeList.tasks.findIndex((task) => task._id === taskId);

    if (taskIndex === -1) {
      console.error("Task not found");
      return;
    }

    activeList.tasks[taskIndex] = {
      ...activeList.tasks[taskIndex],
      ...updatedTask,
    };

    setAllBoards(updatedBoards);
  };

  return (
    <div className="bg-[#fff] h-[100vh]">
      <div className="bg-[#323232] p-5 text-[18px] lg:text-[24px] w-full text-center shadow-2xl">
        <h2 className="text-[#fff]">Task Management Board</h2>
      </div>

      <div className="flex items-center justify-between bg-[darkGrey] p-3 py-1   relative w-full">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable-board" direction="horizontal">
            {(provided) => (
              <div
                className="flex items-center scroll-auto w-11/12 h-[50px]"
                style={{ overflow: "auto" }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {allBoards?.map((board, index) => (
                  <Draggable
                    key={board._id.toString()}
                    draggableId={board._id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        className={`text-[grey] rounded-md mr-2 cursor-pointer ${
                          snapshot.isDragging ? "bg-blue-200" : "bg-white"
                        }`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          boxShadow: snapshot.isDragging
                            ? "0 4px 8px rgba(0, 0, 0, 0.2)"
                            : "none",
                        }}
                      >
                        <Board
                          data={board}
                          key={index}
                          active={activeBoard}
                          changeTab={() => setActiveBoard(board?._id)}
                          removeBoard={(prop) => RemoveBoard(prop)}
                          setDefault={() => setActiveBoard(0)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div
          className="bg-[white] p-2 rounded-md cursor-pointer text-[10px] lg:text-[13px] w-[90px] lg:w-[100px]"
          onClick={() => setBoardDropDown(!boardDropDown)}
        >
          Add Board +
        </div>
        {boardDropDown && (
          <div class="absolute  h-full right-20 top-8 h-[120px] w-[200px] bg-white z-5 mt-5  px-2 py-3   rounded-md  shadow-lg  bg-[white] focus:outline-none">
            <div className="flex items-center justify-between">
              {" "}
              <p className="text-[14px]"> New Board</p>
              <p
                onClick={() => setBoardDropDown(false)}
                className="cursor-pointer"
              >
                x
              </p>
            </div>
            <form>
              <input
                type="text"
                className="p-1 text-[12px] outline-none border-[1px] boarder-[#333] my-2 rounded-sm w-full"
                placeholder="Board Name"
                onChange={(e) => setBoardName(e.target.value)}
              />
              <button
                className="bg-blue-400 text-[14px] p-1 text-[#fff] w-1/2 rounded-md cursor-pointer"
                disabled={boardName === "" ? true : false}
                onClick={() => {
                  AddBoard(allBoards?.length);
                  setBoardDropDown(false);
                }}
              >
                Add Board
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="flex items-center">
        <h1 className="text-[grey] text-[25px] p-2">
          {allBoards[activeBoard]?.name} Lists
        </h1>
      </div>
      <div className="mx-3">
        <h1 className=" text-[#333]">Priority Legend</h1>
        <div>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-sm mr-3"></span>
            <p className="text-[12px] lg:text-[14px]">High</p>
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-sm mr-3"></span>
            <p className="text-[12px] lg:text-[14px]">Medium</p>
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-sm mr-3"></span>
            <p className="text-[12px] lg:text-[14px]">Low</p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden mr-10">
        <div
          className="flex items-start scroll-auto h-[100vh]"
          style={{
            overflow: "auto",
            scrollbarWidth: "none",
          }}
        >
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable
              droppableId={`lists-${activeBoard}`}
              direction="horizontal"
              type="lists"
            >
              {(provided) => (
                <div
                  className="flex items-start"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {allBoards[activeBoard]?.lists.map((list, index) => (
                    <Draggable
                      key={list._id.toString()}
                      draggableId={list._id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          className={`text-[grey] rounded-md mr-2 cursor-pointer ${
                            snapshot.isDragging ? "" : ""
                          }`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            boxShadow: snapshot.isDragging
                              ? "0 4px 8px rgba(0, 0, 0, 0.2)"
                              : "none",
                          }}
                        >
                          <List
                            list={list}
                            index={index}
                            handleTaskAddition={handleTaskAddition}
                            handleEditTask={handleEditTask}
                            handleDeleteTask={handleDeleteTask}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <div className="my-10 mx-4 relative flex justify-end">
            <div
              className="w-[120px] text-center text-[skyBlue] text-[14px] bg-[grey] border-[#333] p-2 rounded-md text-white cursor-pointer"
              onClick={() => {
                setAddListDropDown(!addListDropDown);
              }}
            >
              Add New List
            </div>
            <div>
              {addListDropDown && (
                <div
                  class="absolute w-[200px] left-14 z-10 mt-10  mx-2 px-2 py-3   origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabindex="-1"
                >
                  <div className="flex items-center justify-between">
                    {" "}
                    <p className="text-[14px]"> New List</p>
                    <p
                      onClick={() => setAddListDropDown(false)}
                      className="cursor-pointer"
                    >
                      x
                    </p>
                  </div>

                  <form>
                    <input
                      type="text"
                      className="p-1 text-[12px] outline-none border-[1px] boarder-[#333] my-2 rounded-sm w-full"
                      placeholder="List Name"
                      onChange={(e) => setListName(e.target.value)}
                    />
                    <button
                      className="bg-blue-400 text-[14px] p-1 text-[#fff] w-1/2 rounded-md"
                      disabled={listName === "" ? true : false}
                      onClick={() => {
                        AddNewList(listName);
                        setAddListDropDown(false);
                      }}
                    >
                      Add List
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

/** @format */

import React, { useState } from "react";

const TaskForm = ({ onAddTask, close, selectedTask, handleInputChange }) => {
  const [title, setTitle] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask({ id: Date.now(), title });
    setTitle("");
  };

  return (
    <div
      class="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div class="fixed inset-0 z-10 w-full overflow-y-auto">
        <div class="flex my-10 w-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="relative w-10/12 lg:w-2/6 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all ">
            <form className="w-full lg:w-full p-5 ">
              <h1 className="text-[15px] lg:text-[18px]">Add new task</h1>
              <div>
                <label className="text-[12px] lg:text-[14px] text-[grey]">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  // defaultValue={selectedTask?.title}
                  onChange={(e) => handleInputChange(e)}
                  className="p-2 text-[12px] outline-none border-[1px] border-[gray] my-2 rounded-md w-full"
                  placeholder={selectedTask?.title || "Title"}
                />
              </div>

              <div>
                <label className="text-[12px] lg:text-[14px] text-[grey]">
                  Description
                </label>
                <textarea
                  type="text"
                  name="description"
                  // defaultValue={selectedTask?.description}
                  onChange={(e) => handleInputChange(e)}
                  className="p-2 text-[12px] outline-none border-[1px] border-[gray] resize-none  my-2 rounded-md h-[100px] w-full"
                  placeholder={selectedTask?.description || "Description"}
                ></textarea>
              </div>

              <div>
                <label className="text-[12px] lg:text-[14px] text-[grey]">
                  Assignee
                </label>
                <input
                  type="email"
                  name="assignee"
                  // defaultValue={selectedTask?.assignee}
                  onChange={(e) => handleInputChange(e)}
                  className="p-2 text-[12px] outline-none border-[1px] border-[gray] my-2 rounded-md w-full"
                  placeholder={selectedTask?.assignee || "Assignee"}
                />
              </div>

              <div>
                <label className="text-[12px] lg:text-[14px] text-[grey]">
                  Due date <span>{`${selectedTask?.dueDate}`}</span>
                </label>
                <input
                  type="date"
                  name="dueDate"
                  // defaultValue={selectedTask?.dueDate}
                  onChange={(e) => handleInputChange(e)}
                  className="p-2 text-[12px] outline-none border-[1px] border-[gray] my-2 rounded-md w-full"
                />
              </div>

              <div>
                <label className="text-[12px] lg:text-[14px] text-[grey]">
                  Priority
                </label>
                <select
                  name="priority"
                  onChange={(e) => handleInputChange(e)}
                  className="p-2 text-[12px] capitalize outline-none border-[1px] border-[gray] my-2 rounded-md w-full"
                  placeholder=""
                  defaultValue={selectedTask?.priority}
                >
                  <option value="none" selected disabled hidden>
                    {selectedTask?.priority || "Select Priority"}
                  </option>
                  {/* {selectedTask?.priority !== "" && (
                    <option className="capitalize">
                      {selectedTask?.priority}
                    </option>
                  )} */}
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  onClick={(e) => onAddTask(e)}
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Add Task
                </button>
                <button
                  onClick={() => close()}
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;

import React, { useState } from "react";

const DashBoard = ({ tasks, setTasks, darkMode }) => {
  const [newTask, setNewTask] = useState("");
  const [columns, setColumns] = useState(["today", "week", "later"]);
  const [draggedTask, setDraggedTask] = useState(null);

  // ADD TASK
  const addTask = () => {
    if (!newTask.trim()) return;

    const newTaskObj = {
      id: Date.now(),
      title: newTask,
      status: "inbox",
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  // DELETE TASK
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // EDIT TASK
  const editTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    const updated = prompt("Edit task:", task.title);
    if (!updated) return;

    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, title: updated } : t
      )
    );
  };

  // DRAG
  const handleDragStart = (task) => setDraggedTask(task);

  const handleDrop = (status) => {
    if (!draggedTask) return;

    setTasks(
      tasks.map((t) =>
        t.id === draggedTask.id ? { ...t, status } : t
      )
    );

    setDraggedTask(null);
  };

  // ADD COLUMN
  const addColumn = () => {
    const name = prompt("Enter column name");
    if (!name) return;

    setColumns([...columns, name.toLowerCase()]);
  };

  // DELETE COLUMN (only custom ones)
  const deleteColumn = (colName) => {
    // prevent deleting default columns
    if (["today", "week", "later"].includes(colName)) return;

    // move tasks back to inbox before deleting column
    setTasks(
      tasks.map((t) =>
        t.status === colName ? { ...t, status: "inbox" } : t
      )
    );

    setColumns(columns.filter((col) => col !== colName));
  };

  return (
    <div className="min-h-screen w-full flex bg-[#1d2125]">

      {/* ================= LEFT (INBOX) ================= */}
      <div className=" rounded-xl p-2 bg-[#1d2125] h-full">
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop("inbox")}
          className="w-[300px] h-[600px] rounded-2xl p-4 flex flex-col border bg-[#1E2F4D] border-[#2F4A73] text-gray-200"
        >
          <h2 className="font-bold mb-4">Inbox</h2>

          {/* INPUT */}
          <div className="flex gap-2 mb-4">
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add task"
              className="flex-1 p-2 rounded bg-[#2C2C2C] text-white outline-none"
            />
            <button
              onClick={addTask}
              className="bg-blue-500 px-3 rounded text-white"
            >
              +
            </button>
          </div>

          {/* TASKS */}
          <div className="flex flex-col gap-3 overflow-y-auto">
            {tasks
              .filter((t) => t.status === "inbox")
              .map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={() => handleDragStart(task)}
                  className="bg-[#2C2C2C] text-gray-200 p-3 rounded-lg shadow-md flex justify-between items-center"
                >
                  <span>{task.title}</span>

                  <div className="flex gap-2">
                    <button onClick={() => editTask(task.id)}>✏️</button>
                    <button onClick={() => deleteTask(task.id)}>❌</button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* ================= RIGHT (BOARD) ================= */}
      <div className="flex-1 flex gap-4 p-6 bg-[#7C4D7E] h-full rounded-xl mt-[18px] overflow-x-auto w-full">

        {columns.map((col) => {
          let bgColor = "bg-[#2C2C2C]";

          if (col === "today") bgColor = "bg-[#5C4500]";
          else if (col === "week") bgColor = "bg-[#164B35]";
          else if (col === "later") bgColor = "bg-[#0C0F0A]";

          return (
            <div
              key={col}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(col)}
              className={`min-w-[300px] h-[500px] ${bgColor} rounded-2xl p-4 shadow-lg
              transform hover:scale-105 hover:-translate-y-1 transition-all duration-300`}
            >
              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold capitalize text-white">
                  {col}
                </h3>

                {/* ❌ DELETE BUTTON (only for custom columns) */}
                {!["today", "week", "later"].includes(col) && (
                  <button
                    onClick={() => deleteColumn(col)}
                    className="text-red-400 hover:text-red-600"
                  >
                    ❌
                  </button>
                )}
              </div>

              {/* TASKS (SCROLL ONLY HERE) */}
              <div className="flex flex-col gap-2 overflow-y-auto max-h-[400px] pr-1">
                {tasks
                  .filter((t) => t.status === col)
                  .map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={() => handleDragStart(task)}
                      className="bg-[#2C2C2C] text-gray-200 p-3 rounded-lg shadow-md cursor-grab"
                    >
                      {task.title}
                    </div>
                  ))}
              </div>
            </div>
          );
        })}

        {/* ADD COLUMN */}
        <div className="min-w-[200px] flex items-center">
          <button
            onClick={addColumn}
            className="bg-blue-500 px-4 py-2 rounded text-white"
          >
            + Add Column
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
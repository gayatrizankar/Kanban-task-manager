import React, { useState } from "react";

const DashBoard = ({ tasks, setTasks, darkMode }) => {

  const [newTask, setNewTask] = useState("");
  const [columns, setColumns] = useState(["today", "week", "later"]);
  const [draggedTask, setDraggedTask] = useState(null);

  // ADD TASK
  const addTask = () => {
    if (!newTask.trim()) return;

    setTasks([
      ...tasks,
      { id: Date.now(), title: newTask, status: "inbox" }
    ]);

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

  // DRAG START
  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  // DROP
  const handleDrop = (status) => {
    if (!draggedTask) return;

    setTasks(
      tasks.map((t) =>
        t.id === draggedTask.id
          ? { ...t, status }
          : t
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

  // DELETE COLUMN
  const deleteColumn = (colName) => {
    if (["today", "week", "later"].includes(colName)) return;

    setColumns(columns.filter((c) => c !== colName));

    setTasks(
      tasks.map((task) =>
        task.status === colName
          ? { ...task, status: "inbox" }
          : task
      )
    );
  };

  return (
    <div
      className={`min-h-screen w-full flex gap-4 p-4 ${
        darkMode
          ? "bg-[#1d2125] text-white"
          : "bg-gray-100 text-black"
      }`}
    >

      {/* INBOX */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop("inbox")}
        className={`w-[300px] h-[600px] rounded-2xl p-4 flex flex-col ${
          darkMode ? "bg-sky-800" : "bg-blue-200"
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <i className="fa-solid fa-inbox"></i>
          <h2 className="font-bold">Inbox</h2>
        </div>

        {/* INPUT */}
        <div className="flex gap-2 mb-4">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add task"
            className={`flex-1 p-2 rounded outline-none ${
              darkMode
                ? "bg-sky-700 text-white"
                : "bg-white text-black"
            }`}
          />
          <button onClick={addTask} className="bg-blue-500 px-3 rounded text-white">
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
                className={`p-3 rounded flex justify-between items-center cursor-grab ${
                  darkMode
                    ? "bg-sky-700 text-white"
                    : "bg-blue-300 text-black"
                }`}
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

      {/* BOARD */}
      <div className="flex-1 flex gap-4 overflow-x-auto">

        {columns.map((col, index) => {

          let bgColor = "bg-gray-800";
          let cardColor = "bg-gray-700";

          if (col === "today") {
            bgColor = darkMode ? "bg-yellow-700" : "bg-yellow-300";
            cardColor = darkMode ? "bg-yellow-600" : "bg-yellow-200";
          } else if (col === "week") {
            bgColor = darkMode ? "bg-green-700" : "bg-green-300";
            cardColor = darkMode ? "bg-green-600" : "bg-green-200";
          } else if (col === "later") {
            bgColor = darkMode ? "bg-gray-800" : "bg-gray-300";
            cardColor = darkMode ? "bg-gray-700" : "bg-gray-200";
          }

          return (
            <div
              key={col}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(col)}
              className={`min-w-[350px] h-[400px] ${bgColor} rounded-2xl p-4 hover:scale-[1.02] transition`}
            >
              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold capitalize">{col}</h3>

                {!["today", "week", "later"].includes(col) && (
                  <button
                    onClick={() => deleteColumn(col)}
                    className="text-red-400"
                  >
                    ❌
                  </button>
                )}
              </div>

              {/* TASKS */}
              {tasks
                .filter((t) => t.status === col)
                .map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(task)}
                    className={`${cardColor} p-3 rounded mb-2 cursor-grab`}
                  >
                    {task.title}
                  </div>
                ))}
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
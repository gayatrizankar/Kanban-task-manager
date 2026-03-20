import React, { useState } from "react";

const DashBoard = () => {

  const [tasks, setTasks] = useState([
    { id: 1, title: "Sample Task", status: "inbox" },
    { id: 2, title: "Another Task", status: "inbox" },
  ]);

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

    // prevent deleting default columns (optional)
    if (["today", "week", "later"].includes(colName)) return;

    // remove column
    setColumns(columns.filter((c) => c !== colName));

    // move tasks back to inbox
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
  style={{
    background: "linear-gradient(135deg, #000000, #2a2222, #383593)"
  }}
  className="min-h-screen w-full flex gap-4 p-4"
>
    <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop("inbox")}
        className="w-[300px] h-[600px] bg-sky-800 rounded-2xl p-4 flex flex-col"
      >
        <div className="flex items-center gap-3 mb-4">
          <i className="fa-solid fa-inbox text-white"></i>
          <h2 className="text-white font-bold">Inbox</h2>
        </div>

        {/* INPUT */}
        <div className="flex gap-2 mb-4">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add task"
            className="flex-1 p-2 rounded bg-sky-700 text-white outline-none"
          />
          <button onClick={addTask} className="bg-blue-500 px-3 rounded">
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
                className="bg-sky-700 p-3 rounded text-white flex justify-between items-center cursor-grab active:cursor-grabbing"
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
            bgColor = "bg-yellow-700";
            cardColor = "bg-yellow-600";
          } else if (col === "week") {
            bgColor = "bg-green-700";
            cardColor = "bg-green-600";
          } else if (col === "later") {
            bgColor = "bg-gray-800";
            cardColor = "bg-gray-700";
          } else {
            const colors = [
              "bg-purple-700",
              "bg-pink-700",
              "bg-indigo-700",
              "bg-teal-700"
            ];
            const cardColors = [
              "bg-purple-600",
              "bg-pink-600",
              "bg-indigo-600",
              "bg-teal-600"
            ];

            bgColor = colors[index % colors.length];
            cardColor = cardColors[index % cardColors.length];
          }

          return (
            <div
              key={col}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(col)}
              className={`min-w-[350px] h-[400px] ${bgColor} rounded-2xl p-4 text-white hover:scale-[1.02] transition`}
            >
              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold capitalize">{col}</h3>

                {/* DELETE COLUMN */}
                {!["today", "week", "later"].includes(col) && (
                  <button
                    onClick={() => deleteColumn(col)}
                    className="text-red-300 hover:text-red-500"
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
import React from "react";

const Task = ({ tasks = [], darkMode }) => {

  // COUNT TASKS
  const total = tasks.length;
  const inbox = tasks.filter(t => t.status === "inbox").length;
  const today = tasks.filter(t => t.status === "today").length;
  const week = tasks.filter(t => t.status === "week").length;
  const later = tasks.filter(t => t.status === "later").length;

  return (
    <div className={`min-h-screen p-6 ${
      darkMode ? "bg-[#1d2125] text-white" : "bg-gray-100 text-black"
    }`}>

      <h1 className="text-2xl font-bold mb-6">📊 Task Overview</h1>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

        <div className="bg-blue-500 p-4 rounded-xl text-center">
          <h2 className="text-lg font-bold">{total}</h2>
          <p>Total Tasks</p>
        </div>

        <div className="bg-sky-500 p-4 rounded-xl text-center">
          <h2 className="text-lg font-bold">{inbox}</h2>
          <p>Inbox</p>
        </div>

        <div className="bg-yellow-500 p-4 rounded-xl text-center">
          <h2 className="text-lg font-bold">{today}</h2>
          <p>Today</p>
        </div>

        <div className="bg-green-500 p-4 rounded-xl text-center">
          <h2 className="text-lg font-bold">{week}</h2>
          <p>This Week</p>
        </div>

        <div className="bg-gray-500 p-4 rounded-xl text-center col-span-2 md:col-span-1">
          <h2 className="text-lg font-bold">{later}</h2>
          <p>Later</p>
        </div>

      </div>

      {/* TASK LIST */}
      <div className="bg-[#2c333a] p-4 rounded-xl">
        <h2 className="text-lg font-semibold mb-4">All Tasks</h2>

        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {tasks.length === 0 ? (
            <p className="text-gray-400">No tasks yet</p>
          ) : (
            tasks.map(task => (
              <div
                key={task.id}
                className="flex justify-between items-center p-3 rounded bg-[#1d2125] hover:scale-[1.02] transition"
              >
                <span>{task.title}</span>
                <span className="text-sm capitalize text-gray-400">
                  {task.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};

export default Task;
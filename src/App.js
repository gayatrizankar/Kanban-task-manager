import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import DashBoard from "./components/DashBoard";
import Setting from "./components/setting"; // ✅ make sure file name is "Setting.jsx"
import Task from "./components/Task";

function App() {

  // 🌙 THEME (LOAD FROM STORAGE)
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme !== null ? JSON.parse(savedTheme) : true;
  });

  // 💾 SAVE THEME
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(darkMode));
  }, [darkMode]);

  // 📌 TASKS (LOAD FROM STORAGE)
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks
      ? JSON.parse(savedTasks)
      : [
          { id: 1, title: "Sample Task", status: "inbox" },
          { id: 2, title: "Another Task", status: "inbox" },
        ];
  });

  // 💾 SAVE TASKS
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <BrowserRouter>
      <Navbar darkMode={darkMode} />

      <Routes>

        {/* DASHBOARD */}
        <Route
          path="/"
          element={
            <DashBoard
              tasks={tasks}
              setTasks={setTasks}
              darkMode={darkMode}
            />
          }
        />

        {/* SETTINGS */}
        <Route
          path="/settings"
          element={
            <Setting
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        {/* TASK PAGE */}
        <Route
          path="/tasks"
          element={
            <Task
              tasks={tasks}
              darkMode={darkMode}
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
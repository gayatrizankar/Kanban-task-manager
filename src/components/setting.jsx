import React, { useState } from "react";

const Setting = ({ darkMode, setDarkMode, setTasks }) => {

  const [username, setUsername] = useState("Guest");
  const [email, setEmail] = useState("");
  const [notifications, setNotifications] = useState(true);

  // 🔥 DELETE ALL TASKS
  const handleDeleteAll = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete all tasks?");
    
    if (confirmDelete) {
      setTasks([]); // ✅ clears everything
    }
  };

  return (
    <div className={`min-h-screen p-6 flex justify-center ${
      darkMode ? "bg-[#1d2125] text-white" : "bg-gray-100 text-black"
    }`}>

      <div className={`w-full max-w-2xl rounded-2xl p-6 shadow-lg ${
        darkMode ? "bg-[#2c333a]" : "bg-white"
      }`}>

        <h1 className="text-2xl font-bold mb-6">⚙️ Settings</h1>

        {/* Profile */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Profile</h2>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`p-2 rounded outline-none ${
                darkMode ? "bg-[#1d2125]" : "bg-gray-200"
              }`}
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`p-2 rounded outline-none ${
                darkMode ? "bg-[#1d2125]" : "bg-gray-200"
              }`}
            />
          </div>
        </div>

        {/* Theme */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Appearance</h2>

          <div className={`flex justify-between p-3 rounded ${
            darkMode ? "bg-[#1d2125]" : "bg-gray-200"
          }`}>
            <span>Dark Mode</span>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-4 py-1 rounded ${
                darkMode ? "bg-green-500" : "bg-gray-500"
              }`}
            >
              {darkMode ? "OFF" : "ON"}
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Notifications</h2>

          <div className={`flex justify-between p-3 rounded ${
            darkMode ? "bg-[#1d2125]" : "bg-gray-200"
          }`}>
            <span>Email Notifications</span>

            <button
              onClick={() => setNotifications(!notifications)}
              className={`px-4 py-1 rounded ${
                notifications ? "bg-green-500" : "bg-gray-500"
              }`}
            >
              {notifications ? "ON" : "OFF"}
            </button>
          </div>
        </div>

        {/* Danger */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-red-400">
            Danger Zone
          </h2>

          <button
            onClick={handleDeleteAll}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Delete All Tasks
          </button>
        </div>

      </div>
    </div>
  );
};

export default Setting;
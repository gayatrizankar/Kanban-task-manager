import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ darkMode }) => {
  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  const handleCreate = () => {
    alert("Create new task clicked!");
  };

  return (
    <div className={`flex items-center justify-between px-4 h-[70px] w-full relative ${
      darkMode ? "bg-[#1d2125] text-white" : "bg-white text-black"
    }`}>

      {/* LEFT */}
      <div className="flex items-center gap-4">

        {/* MENU ICON */}
        <i
          onClick={() => setShowMenu(!showMenu)}
          className="fa-solid fa-table-cells text-lg cursor-pointer"
        ></i>

        {/* LOGO */}
        <h1
          onClick={() => navigate("/")}
          className="font-bold text-lg cursor-pointer"
        >
          TaskFlow
        </h1>

        {/* SEARCH */}
        <div className={`px-3 py-1 rounded flex items-center ${
          darkMode ? "bg-[#2c333a]" : "bg-gray-200"
        }`}>
          <i className="fa-solid fa-magnifying-glass text-gray-400 mr-2"></i>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search"
            className="bg-transparent w-[300px] text-sm outline-none"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* CREATE */}
        <button
          onClick={handleCreate}
          className="bg-blue-500 px-3 py-1 rounded text-sm hover:bg-blue-600"
        >
          Create
        </button>

        {/* NOTIFICATIONS */}
        <div className="relative">
          <i
            onClick={() => setShowNotifications(!showNotifications)}
            className="fa-solid fa-bell cursor-pointer"
          ></i>

          {showNotifications && (
            <div className={`absolute right-0 mt-2 w-60 p-3 rounded shadow-lg ${
              darkMode ? "bg-[#2c333a]" : "bg-white text-black"
            }`}>
              <p className="text-sm">No new notifications 🔔</p>
            </div>
          )}
        </div>

        {/* HELP */}
        <div className="relative">
          <i
            onClick={() => setShowHelp(!showHelp)}
            className="fa-solid fa-circle-question cursor-pointer"
          ></i>

          {showHelp && (
            <div className={`absolute right-0 mt-2 w-60 p-3 rounded shadow-lg ${
              darkMode ? "bg-[#2c333a]" : "bg-white text-black"
            }`}>
              <p className="text-sm">Help Section</p>
              <ul className="text-xs mt-2 space-y-1">
                <li>• Create tasks</li>
                <li>• Drag & drop tasks</li>
                <li>• Organize columns</li>
              </ul>
            </div>
          )}
        </div>

        {/* PROFILE */}
        <div className="relative">
          <div
            onClick={() => setShowProfile(!showProfile)}
            className="bg-orange-500 w-8 h-8 flex items-center justify-center rounded-full font-bold cursor-pointer"
          >
            GZ
          </div>

          {showProfile && (
            <div className={`absolute right-0 mt-2 w-40 rounded shadow-lg ${
              darkMode ? "bg-[#2c333a]" : "bg-white text-black"
            }`}>
              
              <button
                onClick={() => {
                  setShowProfile(false);
                  navigate("/");
                }}
                className="block w-full text-left px-3 py-2 hover:bg-gray-400"
              >
                Dashboard
              </button>

              <button
                onClick={() => {
                  setShowProfile(false);
                  navigate("/settings");
                }}
                className="block w-full text-left px-3 py-2 hover:bg-gray-400"
              >
                Settings
              </button>

              <button className="block w-full text-left px-3 py-2 hover:bg-red-500">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MENU PANEL */}
      {showMenu && (
        <div className={`absolute top-[70px] left-0 w-60 h-[calc(100vh-70px)] p-4 ${
          darkMode ? "bg-[#2c333a]" : "bg-gray-200 text-black"
        }`}>
          <p className="mb-2 font-bold">Menu</p>
          <ul className="space-y-2 text-sm">

            <li
              onClick={() => {
                navigate("/");
                setShowMenu(false);
              }}
              className="cursor-pointer hover:text-blue-400"
            >
              Dashboard
            </li>

            <li
            onClick={() => {
                navigate("/tasks");
                setShowMenu(false);
              }}

            className="cursor-pointer hover:text-blue-400">
              Tasks
            </li>

            <li
              onClick={() => {
                navigate("/settings");
                setShowMenu(false);
              }}
              className="cursor-pointer hover:text-blue-400"
            >
              Settings
            </li>

          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import DashBoard from "./components/DashBoard";
import Setting from "./components/setting";


function App() {

  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("theme")) ?? true
  );

  // Save theme
  useEffect(() => {
    localStorage.setItem("theme", darkMode);
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Navbar darkMode={darkMode} />
      <Routes>
        <Route path="/" element={<DashBoard darkMode={darkMode} />} />
        <Route
          path="/settings"
          element={
            <Setting darkMode={darkMode} setDarkMode={setDarkMode} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
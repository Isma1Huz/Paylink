// AuthComponent.jsx
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "../../pages/Register";
import Loginy from "../Login";

function LogSig() {
  const navigate = useNavigate();

  return (
    <div>
      <Routes>
        <Route path="login" element={<Login navigate={navigate} />} />
        <Route path="register" element={<Register navigate={navigate} />} />
      </Routes>
    </div>
  );
}

export default LogSig;

import React from "react";
import { Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<div>root</div>} />
      <Route path="/about" element={<div>about</div>} />
      <Route path="*" element={<div>404Page</div>} />
    </Routes>
  );
};

export default App;

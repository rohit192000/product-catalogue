import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./components/Admin/Form";
import VariantModal from "./components/Admin/VariantModal";
import Homepage from "./components/User/Homepage";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/admin" element={<Form />} />
          <Route path="/modal" element={<VariantModal />} />

          <Route path="/" element={<Homepage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

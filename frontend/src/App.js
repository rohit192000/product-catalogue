import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const Homepage = lazy(() => import("./components/User/Homepage"));
const Form = lazy(() => import("./components/Admin/Form"));
const VariantModal = lazy(() => import("./components/Admin/VariantModal"));
const App = () => {
  console.log(window.location.href);
  return (
    <div className="App" style={{ background: "#dfd3c3" }}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/admin" element={<Form />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/VariantModal" element={<VariantModal />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;

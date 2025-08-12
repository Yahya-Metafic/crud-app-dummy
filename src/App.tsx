import "./App.css";
import FormModal from "./modal/FormModal.js";
import HomePage from "./pages/HomePage.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.js";
import PrivateRoute from "./pages/PrivateRoute.js";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/addUser"
            element={
              <PrivateRoute>
                <FormModal />
              </PrivateRoute>
            }
          />
          <Route
            path="/editUser/:id"
            element={
              <PrivateRoute>
                <FormModal />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;

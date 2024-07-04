import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./context/PrivateRoute";
import PageLayout from './pages/PageLayout';
import HomeSection from "./components/HomeSection";
import LoginSection from "./pages/auth/LoginSection";
import HomePage from "./pages/dashboard/HomePage";
import ManageAdmins from "./pages/dashboard/admins/ManageAdmins";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginSection />} />
          <Route path="/dashboard" element={<PrivateRoute><PageLayout/></PrivateRoute>}>
            <Route index element={<HomeSection />} />
            <Route path="manage-admins" element={<ManageAdmins />} />
            <Route path="create-channel" element={
              <div className="text-blue-800 text-xl min-h-screen bg-gray-950 flex justify-center items-center">Create Channel Page Here</div>
            } />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

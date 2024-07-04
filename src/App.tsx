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
import ChannelSection from "./pages/dashboard/channel/ChannelSection";

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
            <Route path="create-channel" element={<ChannelSection />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

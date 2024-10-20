import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { useContext } from 'react';
import { AuthProvider, AuthContext } from "./context/AuthContext";
import PrivateRoute from "./context/PrivateRoute";
import PageLayout from './components/pages/PageLayout';
import LoginSection from "./components/pages/auth/LoginSection";
// import LandingPage from "./components/pages/dashboard/LandingPage"; // No longer needed according to Emrys so i removed it
import HomePage from "./components/pages/dashboard/home/HomePage";
import InsightsPage from "./components/pages/dashboard/insights/Page";
import AlertsPage from "./components/pages/dashboard/alerts/Page";
import NewChannel from "./components/pages/dashboard/channels/NewPage";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useContext(AuthContext);
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginSection />} />
          <Route path="/login" element={<LoginSection />} />
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/channels" element={<ProtectedRoute><NewChannel /></ProtectedRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><PageLayout/></PrivateRoute>}>
            <Route index element={<HomePage/>}/>
            <Route path="home" element={<HomePage/>}/>
            <Route path="insights" element={<InsightsPage />}/>
            <Route path="alerts" element={<AlertsPage />}/>
            <Route path="channels" element={<NewChannel />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

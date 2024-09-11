import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./context/PrivateRoute";
import PageLayout from './components/pages/PageLayout';
import LoginSection from "./components/pages/auth/LoginSection";
import LandingPage from "./components/pages/dashboard/LandingPage";
import HomePage from "./components/pages/dashboard/home/HomePage";
import InsightsPage from "./components/pages/dashboard/insights/Page";
import AlertsPage from "./components/pages/dashboard/alerts/Page";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginSection />} />
          <Route path="/dashboard" element={<PrivateRoute><PageLayout/></PrivateRoute>}>
            <Route index element={<HomePage/>}/>
            <Route path="home" element={<HomePage/>}/>
            <Route path="insights" element={<InsightsPage />}/>
            <Route path="alerts" element={<AlertsPage />}/>
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

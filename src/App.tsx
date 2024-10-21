import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Navigate,
} from "react-router-dom";
import "./App.css";
// import { useContext } from 'react';
import { AuthProvider} from "./context/AuthContext";
import PrivateRoute from "./context/PrivateRoute";
import PageLayout from './components/pages/PageLayout';
import LoginSection from "./components/pages/auth/LoginSection";
import HomePage from "./components/pages/dashboard/home/HomePage";
import InsightsPage from "./components/pages/dashboard/insights/Page";
import AlertsPage from "./components/pages/dashboard/alerts/Page";
import NewChannel from "./components/pages/dashboard/channels/NewPage";
import NotFoundPage from "./components/pages/dashboard/channels/NotFoundPage";

// ProtectedRoute to protect non-dashboard routes (if needed)
// const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
//   const { isAuthenticated } = useContext(AuthContext);
//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Login Routes */}
          <Route path="/" element={<LoginSection />} />
          <Route path="/login" element={<LoginSection />} />
          
          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={<PrivateRoute><PageLayout/></PrivateRoute>}>
            <Route index element={<HomePage/>}/>
            <Route path="home" element={<HomePage/>}/>
            <Route path="insights" element={<InsightsPage />}/>
            <Route path="alerts" element={<AlertsPage />}/>
            <Route path="channels" element={<NewChannel />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
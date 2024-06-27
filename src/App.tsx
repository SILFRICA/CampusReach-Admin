import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import PageLayout from './pages/PageLayout';
import HomeSection from "./components/HomeSection";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div className="text-teal-800 text-xl min-h-screen bg-gray-950 flex justify-center items-center">Home Page here</div>,
    },
    {
      path: "/login",
      element: <div className="text-yellow-800 text-xl min-h-screen bg-gray-950 flex justify-center items-center">Login Page Here</div>,
    },
    {
      path: "/dashboard",
      element: <PageLayout />,
      children: [
        {
          path: "",
          element: <HomeSection />,
        },
        {
          path: "manage-admins",
          element: <div className="text-purple-800 text-xl min-h-screen bg-gray-950 flex justify-center items-center">Manage Admin Page Here</div>,
        },
        {
          path: "create-channel",
          element: <div className="text-blue-800 text-xl min-h-screen bg-gray-950 flex justify-center items-center">Create Channel Page Here</div>,
        },
      ],
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;

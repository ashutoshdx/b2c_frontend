import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import DashboardLayout from "./components/DashboardLayout";
import EmailAccounts from "./components/EmailAccounts";
import WamupTemplates from "./components/WarmupTemplates";
import Subscriptions from "./components/Subscriptions";
import Register from "./components/Register";
import EmailAccountSettings from "./components/EmailAccountSettings";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "email-accounts",
        element: <EmailAccounts />,
        children: [
          {
            path: "settings/:senderId",
            element: <EmailAccountSettings />,
          },
        ],
      },
      {
        path: "warmup-templates",
        element: <WamupTemplates />,
      },
      {
        path: "subscriptions",
        element: <Subscriptions />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);

import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App.jsx";
import HomePage from "../pages/HomePage.jsx";
import AuthPage from "../pages/AuthPage.jsx";
import UserPage from "../pages/UserPage.jsx";
import PostPage from "../pages/PostPage.jsx";
import UpdateProfilePage from "../pages/UpdateProfilePage.jsx";
import UnauthorizedError from "../components/UnauthorizedError.jsx";
import { useNavigate } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/update",
        element: <UpdateProfilePage />,
      },
      {
        path: "/:username",
        element: <UserPage />,
        loader: async () => {
          const userToken = localStorage.getItem("user-token");
          console.log("in profile loader, the user token is: ", userToken);

          return JSON.parse(userToken);
        },
        children: [],
      },
      {
        path: "/:username/post/:pid",
        element: <PostPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);

export default router;

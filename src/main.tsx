import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "styles/globals.css";
import { AuthLoader } from "./loader/AuthLoader";
import { RootLoader } from "./loader/RootLoader";
import Home from "./pages/Home";
import Login, { action } from "./pages/Login";
import Register from "./pages/Register";
import Verification from "./pages/Verification";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home/>,
		loader: RootLoader,
	},
	{
		path: "register",
		element: <Register/>,
		loader: AuthLoader
	},
	{
		path: "login",
		element: <Login/>,
		action: action,
		loader: AuthLoader
	},
	{
		path: "verification",
		element: <Verification/>
	}
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

postMessage({ payload: "removeLoading" }, "*");

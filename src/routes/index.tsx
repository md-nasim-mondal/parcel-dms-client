import App from "@/App";
import About from "@/pages/public/About";
import Login from "@/pages/public/authentication/Login";
import Register from "@/pages/public/authentication/Register";
import Contact from "@/pages/public/Contact";
import Home from "@/pages/public/Home";
import Services from "@/pages/public/Services";
import Tracking from "@/pages/public/TrackParcel";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Home,
        index: true,
      },
      {
        Component: Tracking,
        path: "/tracking",
      },
      {
        Component: Services,
        path: "/services",
      },
      {
        Component: About,
        path: "/about",
      },
      {
        Component: Contact,
        path: "/contact",
      },
    ],
  },
  {
    Component: Login,
    path: "login",
  },
  {
    Component: Register,
    path: "register",
  },
]);

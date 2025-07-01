import Events from "@/Pages/Events";
import App from "../App";

import { createBrowserRouter } from "react-router";
import AddEvent from "@/Pages/AddEvent";
import MyEvents from "@/Pages/MyEvents";
import Registration from "@/Pages/Registration";
import Login from "@/Pages/Login";
import HomeBanner from "@/Pages/HomeBanner";
import ErrorPage from "@/Pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomeBanner />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/addEvent",
        element: (
          <PrivateRoute>
            <AddEvent />
          </PrivateRoute>
        ),
      },
      {
        path: "/myEvents",
        element: <MyEvents />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;

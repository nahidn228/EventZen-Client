import Events from "@/Pages/Events";
import App from "../App";

import { createBrowserRouter } from "react-router";
import AddEvent from "@/Pages/AddEvent";
import MyEvents from "@/Pages/MyEvents";
import Registration from "@/Pages/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/addEvent",
        element: <AddEvent />,
      },
      {
        path: "/myEvents",
        element: <MyEvents />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
    ],
  },
]);

export default router;

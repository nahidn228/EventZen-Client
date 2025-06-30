import Events from "@/Pages/Events";
import App from "../App";

import { createBrowserRouter } from "react-router";
import AddEvent from "@/Pages/AddEvent";

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
    ],
  },
]);

export default router;

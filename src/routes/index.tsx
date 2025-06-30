import Events from "@/Pages/Events";
import App from "../App";

import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/events",
        element: <Events />,
      },
    ],
  },
]);

export default router;

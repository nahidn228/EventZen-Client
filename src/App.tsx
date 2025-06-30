import { Outlet } from "react-router";
import Navbar from "./components/Layouts/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;

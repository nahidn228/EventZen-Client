import { Outlet } from "react-router";
import Navbar from "./components/Layouts/Navbar";
import Footer from "./components/Layouts/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;

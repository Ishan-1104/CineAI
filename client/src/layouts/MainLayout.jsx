import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
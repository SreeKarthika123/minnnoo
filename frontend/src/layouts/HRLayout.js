import { Outlet } from "react-router-dom";
import Sidebarhr from "../components/Sidebarhr";
import Topbar from "../components/Topbar";
import TopCards from "../components/TopCards";

export default function HRLayout() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-950 to-blue-950 text-white">
      
      {/* Sidebar */}
      <Sidebarhr />

      {/* Main Content */}
      <div className="flex-1">
        <Topbar />

        <div className="pt-28 px-8 pb-20 space-y-10">
          <TopCards />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

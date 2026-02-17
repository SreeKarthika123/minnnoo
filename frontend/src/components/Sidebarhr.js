import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebarhr() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/hr-login");
  };

  return (
    <aside className="w-64 bg-black border-r border-blue-500/20 min-h-screen p-6">
      <h2 className="text-xl font-bold text-blue-400 mb-8">
        HR PANEL
      </h2>

      <nav className="space-y-4">
        <NavLink to="/home" className="block text-gray-300 hover:text-blue-400">
          Dashboard
        </NavLink>

        <NavLink to="/create-job" className="block text-gray-300 hover:text-blue-400">
          Create Job
        </NavLink>

        <NavLink to="/applications" className="block text-gray-300 hover:text-blue-400">
          Applications
        </NavLink>

        <NavLink to="/vacancies" className="block text-gray-300 hover:text-blue-400">
          Vacancies
        </NavLink>

        <button
          onClick={logout}
          className="text-red-400 hover:text-red-500 mt-8"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}

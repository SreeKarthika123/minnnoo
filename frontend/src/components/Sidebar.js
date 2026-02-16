// import { Home, User, Briefcase, HelpCircle } from "lucide-react";
 
// export default function Sidebar() {
//   return (
//     <div className="w-20 bg-white border-r flex flex-col items-center py-6 space-y-8">
//       {/* <img
//         src="/darwinbox-logo.png"
//         alt="logo"
//         className="w-10"
//       /> */}
 
//       <Home className="text-gray-600 hover:text-blue-600 cursor-pointer" />
//       <User className="text-gray-600 hover:text-blue-600 cursor-pointer" />
//       <Briefcase className="text-gray-600 hover:text-blue-600 cursor-pointer" />
//       <HelpCircle className="text-gray-600 hover:text-blue-600 cursor-pointer" />
//     </div>
//   );




// import { Link, useLocation } from "react-router-dom";

// export default function Sidebar() {
//   const location = useLocation();
//   const menuItems = [
//     { name: "Journeys", path: "/journeys" },
//     { name: "Task Box", path: "/tasks" },
//     { name: "Profile", path: "/profile" },
//     { name: "Time", path: "/time" },
//     { name: "Vibe", path: "/vibe" },
//     { name: "Recruitment", path: "/recruitment" },
//     { name: "Helpdesk", path: "/helpdesk" },
//   ];

//   return (
//     <div className="w-60 bg-white border-r min-h-screen p-4 space-y-4 fixed top-0 left-0 pt-24">
//       {menuItems.map((item) => (
//         <Link
//           key={item.name}
//           to={item.path}
//           className={`block px-4 py-2 rounded hover:bg-gray-200 ${
//             location.pathname === item.path ? "bg-gray-200 font-semibold" : ""
//           }`}
//         >
//           {item.name}
//         </Link>
//       ))}
//     </div>
//   );
// }



// import { Link, useLocation } from "react-router-dom";

// export default function Sidebar() {
//   const location = useLocation();
//   const menuItems = [
//     { name: "Journeys", path: "/journeys" },
//     { name: "Task Box", path: "/tasks" },
//     { name: "Profile", path: "/profile" },
//     { name: "Time", path: "/time" },
//     { name: "Vibe", path: "/vibe" },
//     { name: "Recruitment", path: "/recruitment" },
//     { name: "Helpdesk", path: "/helpdesk" },
//   ];

//   return (
//     <div className="w-60 bg-white border-r min-h-screen fixed top-0 left-0 pt-24 p-4 space-y-4">
//       {menuItems.map((item) => (
//         <Link
//           key={item.name}
//           to={item.path}
//           className={`block px-4 py-2 rounded hover:bg-gray-200 ${
//             location.pathname === item.path ? "bg-gray-200 font-semibold" : ""
//           }`}
//         >
//           {item.name}
//         </Link>
//       ))}
//     </div>
//   );
// }


// import { Link, useLocation } from "react-router-dom";

// export default function Sidebar({ isOpen, setIsOpen }) {
//   const location = useLocation();

//   const menuItems = [
//     { name: "Journeys", path: "/journeys" },
//     { name: "Task Box", path: "/tasks" },
//     { name: "Profile", path: "/profile" },
//     { name: "Time", path: "/time" },
//     { name: "Vibe", path: "/vibe" },
//     { name: "Recruitment", path: "/recruitment" },
//     { name: "Helpdesk", path: "/helpdesk" },
//   ];

//   return (
//     <div
//       className={`fixed top-0 left-0 h-screen bg-white border-r p-4 space-y-4
//       transition-all duration-300 z-30
//       ${isOpen ? "w-60 translate-x-0" : "w-60 -translate-x-full"}`}
//     >
//       {menuItems.map((item) => (
//         <Link
//           key={item.name}
//           to={item.path}
//           onClick={() => setIsOpen(false)} // close on click
//           className={`block px-4 py-2 rounded hover:bg-gray-200 ${
//             location.pathname === item.path
//               ? "bg-gray-200 font-semibold"
//               : ""
//           }`}
//         >
//           {item.name}
//         </Link>
//       ))}
//     </div>
//   );
// }



import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  const menuItems = [
    // { name: "Journeys", path: "/journeys" },
    // { name: "Task Box", path: "/tasks" },
    { name: "Profile", path: "/profile" },
    // { name: "Time", path: "/time" },
    // { name: "Vibe", path: "/vibe" },
    { name: "Recruitment", path: "/recruitment" },
    // { name: "Helpdesk", path: "/helpdesk" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-screen 
      bg-[#0f172a] border-r border-white/10
      p-4 space-y-2 z-30
      transition-all duration-300
      ${isOpen ? "w-60 translate-x-0" : "w-60 -translate-x-full"}`}
    >
      {/* 🔷 Logo / Title */}
      <div className="text-xl font-bold text-white mb-6 px-3">
        <span className="text-indigo-400">D</span>arwinBo<span className="text-indigo-400">X</span>
      </div>

      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={`block px-4 py-2 rounded-lg text-sm transition-all
              ${
                isActive
                  ? "bg-indigo-500/20 text-indigo-300 font-semibold"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }
            `}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
}


// }
import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
 
export default function Topbar({ setSidebarOpen }) {

  const navigate = useNavigate();
  // const [open, setOpen] = useState(false);
 const [open, setOpen] = useState(false);
const [showNotifications, setShowNotifications] = useState(false);
const [notifications, setNotifications] = useState([]);

//   const user = JSON.parse(localStorage.getItem("user"));
 
let user = null;
 
try {
  const storedUser = localStorage.getItem("user");
  if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
    user = JSON.parse(storedUser);
  }
} catch (err) {
  console.error("Invalid user in localStorage", err);
  user = null;
}



useEffect(() => {

  const userId = user?._id || user?.id;
if (!userId) return;

  // if (!user?._id) return;

  const fetchNotifications = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/notifications/user/${userId}`
      );
      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      console.error("Notification fetch error", err);
    }
  };

  fetchNotifications();
}, [user]);

 return (
  <div className="bg-[#0b1020] px-6 py-3 border-b border-white/10
                  flex justify-between items-center sticky top-0 z-20">

    {/* LEFT SECTION */}
    <div className="flex items-center gap-4">
      {/* Sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(prev => !prev)}
        className="text-2xl text-gray-300 hover:text-white transition"
      >
        ☰
      </button>

      {/* Search */}
      <input
        type="text"
        placeholder="Search for people"
        className="bg-[#11162a] text-sm text-gray-200
                   placeholder-gray-500
                   border border-white/10 rounded-lg
                   px-4 py-2 w-80
                   focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
      />
    </div>

    {/* RIGHT SECTION */}
    <div className="flex items-center gap-6 relative">
      {/* Welcome */}
      <span className="text-sm text-gray-300">
        Welcome, <span className="text-white font-medium">
          {user?.name || "Guest"}
        </span> 👋
      </span>



      
{/* Notification Bell */}
<div className="relative">
  <button
    onClick={() => setShowNotifications(prev => !prev)}
    className="text-xl text-gray-300 hover:text-white transition relative"
  >
    🔔
    {notifications.length > 0 && (
      <span
        className="absolute -top-1 -right-1
                   bg-red-500 text-xs text-white
                   rounded-full px-1"
      >
        {notifications.length}
      </span>
    )}
  </button>

  {/* Notification Dropdown */}
  {showNotifications && (
    <div
      className="absolute right-0 mt-3 w-96
                 bg-[#11162a]
                 border border-blue-400/20
                 rounded-xl shadow-xl p-4 z-50"
    >
      <h3 className="text-blue-400 font-semibold mb-3">
        Notifications
      </h3>

      {notifications.length === 0 ? (
        <p className="text-sm text-gray-400">
          No notifications
        </p>
      ) : (
        notifications.map((n) => (
          <div
            key={n._id}
            className="flex justify-between items-center
                       bg-black/40 p-3 rounded mb-2"
          >
            <div>
              <p className="text-sm">{n.message}</p>
              <p className="text-xs text-gray-400">
                Job: {n.vacancyId?.title}
              </p>
            </div>

           <button
  onClick={async () => {
    await fetch(
      `http://localhost:5000/api/notifications/read/${n._id}`,
      { method: "PATCH" }
    );

    // remove from UI immediately
    setNotifications(prev =>
      prev.filter(x => x._id !== n._id)
    );

    navigate(`/recruitment/${n.vacancyId?._id}`);
    setShowNotifications(false);
  }}
  className="text-sm bg-green-600 px-3 py-1 rounded"
>
  Apply
</button>

          </div>
        ))
      )}
    </div>
  )}
</div>

      {/* Notification */}
      {/* <button className="text-xl text-gray-300 hover:text-white transition">
        🔔
      </button> */}

      {/* Profile */}
      <div className="relative">
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-9 h-9 rounded-full cursor-pointer border border-white/20"
          onClick={() => setOpen(!open)}
        />

        {open && (
          <div className="absolute right-0 mt-3 w-48
                          bg-[#11162a] border border-white/10
                          rounded-xl shadow-xl py-2">

            <button
              className="w-full text-left px-4 py-2 text-sm
                         text-gray-300 hover:bg-white/5 hover:text-white"
              onClick={() => {
                setOpen(false);
                navigate("/profile");
              }}
            >
              My Profile
            </button>

            <button
              className="w-full text-left px-4 py-2 text-sm
                         text-red-400 hover:bg-red-500/10"
              onClick={() => {
                localStorage.removeItem("user");
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
);

 
 
//   return (
//     <div className="bg-white px-6 py-2 border-b flex justify-between items-center sticky top-0 z-20">

//     {/* <div className="bg-white px-6 py-1 border-b flex justify-between items-center sticky top-0 z-20 -mt-25"> */}

//     {/* <div className="bg-white px-6 py-2 border-b flex justify-between items-center sticky top-0 z-20"> */}

//      {/* <div className="bg-white px-6 py-4 border-b flex justify-between items-center sticky top-0 z-20"> */}
 
//     {/* <div className="bg-white px-6 py-4 border-b flex justify-between items-center fixed top-0 left-0 right-0 z-20"> */}
      
//       {/* Search */}

//       <button
//   onClick={() => setSidebarOpen(prev => !prev)}
//   className="text-2xl cursor-pointer mr-4"
// >
//   ☰
// </button>

//     <input
//   type="text"
//   placeholder="Search for people"
//   className="border rounded-md px-4 py-1.5 w-96 relative -top-3"
// />

//       {/* Right section */}
//       <div className="flex items-center gap-4 relative">
        
//      <span className="text-gray-700 font-medium relative -top-3">
//   Welcome, {user?.name || "Guest"} 👋
// </span>

 
 
//         {/* Notification */}
//         <span className="text-xl cursor-pointer relative -top-3">🔔</span>

//         {/* <span className="text-xl cursor-pointer">🔔</span> */}
 
//         {/* Profile */}
//         <div className="relative -top-3">

//         {/* <div className="relative"> */}
//           <img
//             // src="https://i.pravatar.cc/40"
//             alt="profile"
//             className="rounded-full cursor-pointer"
//             onClick={() => setOpen(!open)}
//           />
 
//           {open && (
//             <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-2">
//               <button
//                 className="w-full text-left px-4 py-2 hover:bg-gray-100"
//                 onClick={() => navigate("/profile")}
//               >
//                 My Profile
//               </button>
 
//              <button
//   className="w-full text-left px-4 py-2 hover:bg-gray-100"
//   onClick={() => {
//     localStorage.removeItem("user"); // clear user from storage
//     window.location.href = "/login"; // redirect to login
//   }}
// >
//   Logout
// </button>

//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
}
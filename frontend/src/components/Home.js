
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Topbar from "../components/Topbar";
// import TopCards from "../components/TopCards";
// import Sidebarhr from "../components/Sidebarhr";

// const modules = [
//   { name: "Platform", icon: "fa-server" },
//   { name: "Payroll", icon: "fa-money-bill-wave" },
//   { name: "AI", icon: "fa-robot" },
//   { name: "Recruitment", icon: "fa-user-plus" },
//   { name: "Sales", icon: "fa-chart-line" },
//   { name: "Marketing", icon: "fa-bullhorn" },
//   { name: "Performance", icon: "fa-trophy" },
//   { name: "Time Management", icon: "fa-clock" }
// ];

// export default function Home() {
//   const navigate = useNavigate();
//   const [vacancies, setVacancies] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/hr/vacancies")
//       .then((res) => res.json())
//       .then((data) => setVacancies(Array.isArray(data) ? data : []))
//       .catch(() => setVacancies([]));
//   }, []);

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-950 to-blue-950 text-white">

//     <Sidebarhr />

//     <div className="flex-1">
//       <Topbar />

//       <div className="pt-28 px-8 pb-20 space-y-20">
//         <TopCards />

//         {/* ===== HEADER ===== */}
//         <div className="text-center space-y-4">
//           {/* <h1 className="text-4xl md:text-5xl font-bold text-blue-500 tracking-wide">
//             INTERNAL JOB PORTAL
//           </h1> */}
//           <p className="text-gray-400 text-lg italic">
//             Hey HR! Click on a module to post jobs 🚀
//           </p>
//         </div>

//         {/* ===== MODULES GRID ===== */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
//           {modules.map((m) => (
//             <button
//               key={m.name}
//               onClick={() =>
//                 navigate(`/create-job?department=${encodeURIComponent(m.name)}`)
//               }
//               className="bg-gray-900 border border-blue-500/20 
//                          hover:border-blue-500 hover:bg-blue-900/40
//                          rounded-2xl py-12
//                          flex flex-col items-center justify-center
//                          transition-all duration-300 hover:scale-105"
//             >
//               <i className={`fas ${m.icon} text-blue-400 text-3xl mb-4`} />
//               <span className="text-blue-400 font-semibold text-lg tracking-wide text-center">
//                 {m.name}
//               </span>
//             </button>
//           ))}
//         </div>

//         {/* ===== EXISTING VACANCIES ===== */}
//         <div className="space-y-6">
//           <h2 className="text-2xl font-semibold text-blue-400">
//             Existing Vacancies
//           </h2>

//           {vacancies.length > 0 ? (
//             <div className="space-y-4">
//               {vacancies.map((vac) => (
//                 <div
//                   key={vac._id}
//                   className="bg-gray-900 border border-blue-500/20 
//                              rounded-xl p-6 
//                              hover:border-blue-500/50
//                              transition-all"
//                 >
//                   <h3 className="text-lg font-semibold text-blue-400">
//                     {vac.jobTitle}
//                   </h3>
//                   <p className="text-gray-400 text-sm mt-1">
//                     {vac.company} • {vac.location}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500">
//               No vacancies posted yet.
//             </p>
//           )}
//         </div>
// </div>
//       </div>
//     </div>
//   );
// }


// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Topbar from "../components/Topbar";
// import TopCards from "../components/TopCards";
// import Sidebarhr from "../components/Sidebarhr";

// const modules = [
//   { name: "Platform", icon: "fa-server" },
//   { name: "Payroll", icon: "fa-money-bill-wave" },
//   { name: "AI", icon: "fa-robot" },
//   { name: "Recruitment", icon: "fa-user-plus" },
//   { name: "Sales", icon: "fa-chart-line" },
//   { name: "Marketing", icon: "fa-bullhorn" },
//   { name: "Performance", icon: "fa-trophy" },
//   { name: "Time Management", icon: "fa-clock" }
// ];

// export default function Home() {
//   const navigate = useNavigate();
//   const [vacancies, setVacancies] = useState([]);
//     // const { Vacancies } = useVacancies();

//   useEffect(() => {
//     fetch("http://localhost:5000/api/hr/vacancies")
//       .then((res) => res.json())
//       .then((data) => setVacancies(Array.isArray(data) ? data : []))
//       .catch(() => setVacancies([]));
//   }, []);

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-950 to-blue-950 text-white">
//       <Sidebarhr />

//       <div className="flex-1">
//         <Topbar />

//         <div className="pt-28 px-8 pb-20 space-y-20">
//           <TopCards />

//           <p className="text-gray-400 text-lg italic text-center">
//             Hey HR! Click on a module to post jobs 🚀
//           </p>

//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
//             {modules.map((m) => (
//               <button
//                 key={m.name}
//                 onClick={() =>
//                   navigate(`/create-job?department=${encodeURIComponent(m.name)}`)
//                 }
//                 className="bg-gray-900 border border-blue-500/20 rounded-2xl py-12 hover:scale-105"
//               >
//                 <i className={`fas ${m.icon} text-blue-400 text-3xl mb-4`} />
//                 <span className="text-blue-400 font-semibold">
//                   {m.name}
//                 </span>
//               </button>
//             ))}
//           </div>

//           <div>
//       <h2 className="text-2xl text-blue-400 mb-4">
//         Existing Vacancies
//       </h2>

//       {vacancies.length ? (
//         vacancies.map((vac) => (
//           <div key={vac._id} className="bg-gray-900 p-4 rounded mb-2">
//             <h3 className="text-blue-400">{vac.title}</h3>
//             <p className="text-gray-400 text-sm">
//               {vac.company} • {vac.location}
//             </p>
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-500">No vacancies posted yet.</p>
//       )}
//     </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import TopCards from "../components/TopCards";
import Sidebarhr from "../components/Sidebarhr";

const modules = [
  { name: "Platform", icon: "fa-server" },
  { name: "Payroll", icon: "fa-money-bill-wave" },
  { name: "AI", icon: "fa-robot" },
  { name: "Recruitment", icon: "fa-user-plus" },
  { name: "Sales", icon: "fa-chart-line" },
  { name: "Marketing", icon: "fa-bullhorn" },
  { name: "Performance", icon: "fa-trophy" },
  { name: "Time Management", icon: "fa-clock" }
];

export default function Home() {
  const navigate = useNavigate();
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/hr/vacancies")
      .then((res) => res.json())
      .then((data) => setVacancies(Array.isArray(data) ? data : []))
      .catch(() => setVacancies([]));
  }, []);

  // 🔴 DELETE HANDLER
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this vacancy?")) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/hr/vacancies/${id}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setVacancies((prev) => prev.filter((v) => v._id !== id));
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-950 to-blue-950 text-white">
      <Sidebarhr />

      <div className="flex-1">
        <Topbar />

        <div className="pt-28 px-8 pb-20 space-y-20">
          <TopCards />

          <p className="text-gray-400 text-lg italic text-center">
            Hey HR! Click on a module to post jobs 🚀
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {modules.map((m) => (
              <button
                key={m.name}
                onClick={() =>
                  navigate(`/create-job?department=${encodeURIComponent(m.name)}`)
                }
                className="bg-gray-900 border border-blue-500/20 rounded-2xl py-12 hover:scale-105"
              >
                <i className={`fas ${m.icon} text-blue-400 text-3xl mb-4`} />
                <span className="text-blue-400 font-semibold">
                  {m.name}
                </span>
              </button>
            ))}
          </div>

          {/* 🧾 Existing Vacancies */}
          <div>
            <h2 className="text-2xl text-blue-400 mb-4">
              Existing Vacancies
            </h2>

            {vacancies.length ? (
              vacancies.map((vac) => (
                <div
                  key={vac._id}
                  className="bg-gray-900 p-4 rounded mb-2 flex justify-between items-start"
                >
                  <div>
                    <h3 className="text-blue-400">{vac.title}</h3>
                    <p className="text-gray-400 text-sm">
                      {vac.company} • {vac.location}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(vac._id)}
                    className="text-red-400 hover:text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No vacancies posted yet.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

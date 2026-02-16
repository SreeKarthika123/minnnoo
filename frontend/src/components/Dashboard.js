// import Card from "./Card";
// import Sidebar from "./Sidebar";
// import Topbar from "./Topbar";
// console.log("DASHBOARD LOADED");

 
 
// export default function Dashboard() {
//   return (


//      <div className="flex">
//       <Sidebar />
//       {/* <div className="flex-1 p-6 space-y-6 overflow-y-auto pt-24 bg-gray-50 min-h-screen ml-60"> */}
//     <div className="p-6 space-y-6 overflow-y-auto pt-24 bg-gray-50 min-h-screen">
//       { <Topbar /> }
 
//       <div className="bg-white p-6 rounded-lg shadow">
//         <h2 className="text-xl font-semibold">Wrap Up with Excellence! 🌟</h2>
//         <p className="text-gray-500">
//           Give the day your best finish. Your efforts are outstanding!
//         </p>
//       </div>
 
//       <div className="bg-white p-6 rounded-lg shadow">
//         <h3 className="font-semibold mb-4">Recent Apps</h3>
//         <div className="grid grid-cols-7 gap-6 text-center">
//           {["Journeys", "Task Box", "Profile", "Time", "Vibe", "Recruitment", "Helpdesk"].map(
//             (item) => (
//               <div key={item} className="text-sm text-gray-600">
//                 <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-2" />
//                 {item}
//               </div>
//             )
//           )}
//         </div>
//       </div>
 
//       <div className="grid grid-cols-3 gap-6">
//         <Card title="Recommendations for You">
//           Refer your best connections and explore open jobs.
//         </Card>
 
//         <Card title="Requests">
//           Apply Leave • Request Letter • Raise Helpdesk Issue
//         </Card>
 
//         <Card title="Events">
//           Leave • Birthdays • Anniversaries
//         </Card>
//       </div>
//     </div>
//     </div>
//   );
// }
 
 
// import Card from "./Card";
// import Sidebar from "./Sidebar";
// import Topbar from "./Topbar";

// console.log("DASHBOARD LOADED");

// export default function Dashboard() {
//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main content */}
//       <div className="flex-1 ml-60 pt-24 p-6 bg-gray-50 min-h-screen overflow-y-auto">
//         <Topbar />

//         {/* Greeting card */}
//         <div className="bg-white p-6 rounded-lg shadow mb-6">
//           <h2 className="text-xl font-semibold">Wrap Up with Excellence! 🌟</h2>
//           <p className="text-gray-500">
//             Give the day your best finish. Your efforts are outstanding!
//           </p>
//         </div>

//         {/* Recent Apps */}
//         <div className="bg-white p-6 rounded-lg shadow mb-6">
//           <h3 className="font-semibold mb-4">Recent Apps</h3>
//           <div className="grid grid-cols-7 gap-6 text-center">
//             {["Journeys", "Task Box", "Profile", "Time", "Vibe", "Recruitment", "Helpdesk"].map(
//               (item) => (
//                 <div key={item} className="text-sm text-gray-600">
//                   <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-2" />
//                   {item}
//                 </div>
//               )
//             )}
//           </div>
//         </div>

//         {/* Cards */}
//         <div className="grid grid-cols-3 gap-6">
//           <Card title="Recommendations for You">
//             Refer your best connections and explore open jobs.
//           </Card>

//           <Card title="Requests">
//             Apply Leave • Request Letter • Raise Helpdesk Issue
//           </Card>

//           <Card title="Events">
//             Leave • Birthdays • Anniversaries
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import Card from "./Card";
// import Sidebar from "./Sidebar";
// import Topbar from "./Topbar";

// // 🔐 SAFE USER ID FETCH
// const getUserId = () => {
//   try {
//     const user = JSON.parse(localStorage.getItem("user"));
//     return user?._id || user?.id || user?.user?._id || null;
//   } catch {
//     return null;
//   }
// };

// export default function Dashboard() {
//   const [matchCount, setMatchCount] = useState(0);
//   const userId = getUserId();

//   useEffect(() => {
//     if (!userId) return;

//     fetch(`http://localhost:5000/api/ai/dashboard-matches/${userId}`)
//       .then(res => res.json())
//       .then(data => setMatchCount(data.count || 0))
//       .catch(err => console.error("Dashboard match error:", err));
//   }, [userId]);

//   return (
//     <div className="flex">
//       <Sidebar />

//       <div className="flex-1 ml-60 pt-24 p-6 bg-gray-50 min-h-screen">
//         <Topbar />

//         {/* 🎯 AI MATCH NOTIFICATION */}
//         {matchCount > 0 && (
//           <div
//             onClick={() => (window.location.href = "/recruitment")}
//             className="cursor-pointer bg-green-50 border border-green-400 p-5 rounded-lg mb-6 hover:shadow transition"
//           >
//             <h2 className="text-lg font-semibold text-green-700">
//               🎯 Your Resume Matches {matchCount} Job
//               {matchCount > 1 ? "s" : ""}
//             </h2>
//             <p className="text-green-600">
//               Click to view highly matched opportunities
//             </p>
//           </div>
//         )}

//         {/* Greeting */}
//         <div className="bg-white p-6 rounded-lg shadow mb-6">
//           <h2 className="text-xl font-semibold">Wrap Up with Excellence! 🌟</h2>
//           <p className="text-gray-500">
//             Give the day your best finish. Your efforts are outstanding!
//           </p>
//         </div>

//         {/* Cards */}
//         <div className="grid grid-cols-3 gap-6">
//           <Card title="Recommendations for You">
//             Refer your best connections and explore open jobs.
//           </Card>

//           <Card title="Requests">
//             Apply Leave • Request Letter • Raise Helpdesk Issue
//           </Card>

//           <Card title="Events">
//             Leave • Birthdays • Anniversaries
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }


import { apiFetch } from "../utils/api";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import StatCard from "./StatCard";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

// 🔐 SAFE USER ID FETCH
const getUserId = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?._id || user?.id || user?.user?._id || null;
  } catch {
    return null;
  }
};

export default function Dashboard() {
  const [matchCount, setMatchCount] = useState(0);
  const userId = getUserId();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [progress, setProgress] = useState(null);
const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();
const [totalJobs, setTotalJobs] = useState(0);

  // useEffect(() => {
  //   if (!userId) return;

  //   fetch(`http://localhost:5000/api/ai/dashboard-matches/${userId}`)
  //     .then(res => res.json())
  //     .then(data => setMatchCount(data.count || 0))
  //     .catch(err =>
  //       console.error("Dashboard match error:", err)
  //     );
  // }, [userId]);

// useEffect(() => {
//   if (!userId) return;

//   apiFetch(`/api/ai/analyze-initial/${userId}`, {
//     method: "POST"
//   }).catch(() => {});
// }, [userId]);
useEffect(() => {
  const fetchTotalJobs = async () => {
    try {
      const res = await apiFetch("/api/ai/jobs-count");
      const data = await res.json();
      setTotalJobs(data.total || 0);
    } catch (err) {
      console.error("Failed to fetch total jobs", err);
    }
  };

  fetchTotalJobs();
}, []);

  useEffect(() => {
  if (!userId) return;

  const loadMatches = async () => {
    try {
      const res = await apiFetch(`/api/ai/dashboard-matches/${userId}`);
      const data = await res.json();
      setMatchCount(data.count || 0);
    } catch (err) {
      console.error("Dashboard match error:", err);
    }
  };

  loadMatches();
}, [userId]);


//   useEffect(() => {
//   if (!userId) return;

//   const interval = setInterval(async () => {
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/ai/analysis-progress/${userId}`
//       );
//       const data = await res.json();

//       setProgress(data);

//       if (data.status === "analyzing") {
//         setIsAnalyzing(true);
//       }

//       if (data.status === "completed") {
//         setIsAnalyzing(false);

//         // 🔁 Refresh match count once analysis finishes
//         fetch(`http://localhost:5000/api/ai/dashboard-matches/${userId}`)
//           .then(res => res.json())
//           .then(d => setMatchCount(d.count || 0));
//       }
//     } catch (err) {
//       console.error("Progress fetch error:", err);
//     }
//   }, 3000); // poll every 3s

//   return () => clearInterval(interval);
// }, [userId]);


useEffect(() => {
  if (!userId) return;

  const interval = setInterval(async () => {
    try {
      const res = await apiFetch(
        `/api/ai/analysis-progress/${userId}`
      );
      const data = await res.json();

      setProgress(data);

      if (data.status === "analyzing") {
        setIsAnalyzing(true);
      }

      if (data.status === "completed") {
        setIsAnalyzing(false);

        const matchRes = await apiFetch(
          `/api/ai/dashboard-matches/${userId}`
        );
        const matchData = await matchRes.json();
        setMatchCount(matchData.count || 0);
      }
    } catch (err) {
      console.error("Progress fetch error:", err);
    }
  }, 3000);

  return () => clearInterval(interval);
}, [userId]);

//   return (
//     <div className="flex">
//      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

// <div
//   className={`flex-1 pt-12 px-8 pb-10 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen
//   transition-all duration-300 ${sidebarOpen ? "ml-60" : "ml-0"}`}
// >
//   <Topbar setSidebarOpen={setSidebarOpen} />


//         {/* 🎯 AI MATCH NOTIFICATION */}
//       {/* {matchCount > 0 && (
//   <div
//     onClick={() => navigate("/recruitment?matched=true")}
//     className="cursor-pointer bg-green-50 border border-green-400 p-5 rounded-lg mb-6 hover:shadow transition"
//   >
//             <h2 className="text-lg font-semibold text-green-700">
//               🎯 Your Resume Matches {matchCount} Job
//               {matchCount > 1 ? "s" : ""}
//             </h2>
//             <p className="text-green-600">
//               Click to view highly matched opportunities
//             </p>
//           </div>
//         )} */}

//         {/* ⏳ ANALYZING STATE */}
// {isAnalyzing && progress && (
//   <div className="bg-white border-l-4 border-yellow-400 p-6 rounded-xl mb-6 shadow-sm animate-pulse">
//     <h2 className="text-lg font-semibold text-yellow-700 flex items-center gap-2">
//       ⏳ Analyzing jobs for your resume
//     </h2>

//     <p className="text-sm text-gray-600 mt-1">
//       {progress.analyzed} of {progress.total} jobs analyzed
//     </p>

//     <div className="w-full bg-gray-200 rounded-full h-2 mt-4 overflow-hidden">
//       <div
//         className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
//         style={{
//           width: `${Math.round(
//             (progress.analyzed / progress.total) * 100
//           )}%`
//         }}
//       />
//     </div>
//   </div>
// )}


// {/* 🎯 MATCH RESULT (ONLY AFTER COMPLETED) */}
// {!isAnalyzing && matchCount > 0 && (
//   <div
//     onClick={() => navigate("/recruitment?matched=true")}
//     className="cursor-pointer bg-gradient-to-r from-green-50 to-green-100 
//                border border-green-300 p-6 rounded-xl mb-6 
//                hover:shadow-lg hover:scale-[1.01] transition-all"
//   >
//     <h2 className="text-lg font-semibold text-green-700">
//       🎯 {matchCount} Job{matchCount > 1 ? "s" : ""} Matched
//     </h2>
//     <p className="text-sm text-green-600 mt-1">
//       Click to explore highly relevant opportunities
//     </p>
//   </div>
// )}



//         {/* Greeting */}
//    <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
//   <h2 className="text-xl font-semibold text-gray-800">
//     Wrap Up with Excellence 🌟
//   </h2>
//   <p className="text-gray-500 mt-1">
//     Finish strong today — every step counts toward your success.
//   </p>
// </div>


//         {/* Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

//         {/* <div className="grid grid-cols-3 gap-6"> */}
//           {/* <Card title="Recommendations for You">
//             Refer your best connections and explore open jobs.
//           </Card> */}

//           {/* <Card title="Requests">
//             Apply Leave • Request Letter • Raise Helpdesk Issue
//           </Card> */}

//           {/* <Card title="Events">
//             Leave • Birthdays • Anniversaries
//           </Card> */}
//         </div>
//       </div>
//     </div>
//   );

// const percent =
//     progress?.total > 0
//       ? Math.round((progress.analyzed / progress.total) * 100)
//       : 0;
return (
  <div className="flex bg-[#0b1020] min-h-screen text-gray-200">
    <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

    <div
      className={`flex-1 transition-all duration-300 ${
        sidebarOpen ? "ml-60" : "ml-0"
      }`}
    >
      <Topbar setSidebarOpen={setSidebarOpen} />

      <div className="px-8 pt-8 pb-10 space-y-8">

        {/* 🔥 TOP STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <StatCard title="Matched Jobs" value={matchCount} accent="green" />

          <StatCard
  title="Jobs Analyzed"
  value={progress?.analyzed || 0}
  accent="blue"
/>
<StatCard
  title="Total Vacancies"
  value={totalJobs}
  accent="yellow"
/>


          {/* <StatCard title="Jobs Analyzed" value={progress?.total || 0} accent="blue" />
          <StatCard title="In Progress" value={progress?.analyzed || 0} accent="yellow" /> */}
          <StatCard title="Profile Strength" value="" accent="purple" />
        </div>

       

        {/* ⏳ ANALYSIS PROGRESS */}
        {isAnalyzing && progress && (
          <div className="bg-[#11162a] rounded-2xl p-6 border border-white/10 shadow-lg">
            <h2 className="text-lg font-semibold text-yellow-400">
              ⏳ Resume Analysis in Progress
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              {progress.analyzed} / {progress.total} jobs analyzed
            </p>

            <div className="w-full bg-gray-800 rounded-full h-2 mt-4">
              <div
                className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.round(
                    (progress.analyzed / progress.total) * 100
                  )}%`
                }}
              />
            </div>
          </div>
        )}

        {/* 🎯 MATCH RESULT */}
      {!isAnalyzing && matchCount > 0 && (
  <div
    className="bg-gradient-to-r from-green-500/10 to-green-400/10
               border border-green-400/30 p-6 rounded-2xl
               shadow-lg"
  >
    <h2 className="text-xl font-semibold text-green-400">
      🎯 {matchCount} Job Matches Found
    </h2>

    <p className="text-sm text-green-300 mt-1">
      Personalized opportunities picked for you
    </p>

    <div className="flex gap-4 mt-4">
      {/* View Matches */}
      <button
        onClick={() => navigate("/recruitment?matched=true")}
        className="px-4 py-2 rounded-lg bg-green-500/20
                   border border-green-400/40 text-green-300
                   hover:bg-green-500/30 transition"
      >
        View Matches
      </button>

      {/* Apply Button */}
      {/* <button
        onClick={() => navigate("/applications/matched")}
        className="px-4 py-2 rounded-lg bg-green-500
                   text-black font-semibold
                   hover:bg-green-400 transition"
      >
        Apply Now
      </button> */}
    </div>
  </div>
)}

            {/* <p className="text-sm text-green-300 mt-1">
              Click to explore personalized opportunities
            </p>
          </div>
        )} */}

        {/* ✨ WELCOME CARD */}
        <div className="bg-[#11162a] rounded-2xl p-6 border border-white/10 shadow-md">
          <h2 className="text-2xl font-semibold">
            Welcome Back, 🚀
          </h2>
          <p className="text-gray-400 mt-2">
            Track your resume performance and unlock better opportunities.
          </p>
        </div>

      </div>
    </div>
  </div>
);

}

// export default function TopCards() {
//   return (
//     <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      
//       <div className="bg-gray-900 rounded-xl p-6 border border-blue-500/20 shadow-md">
//         <h3 className="text-gray-400 text-sm">Software Engineer</h3>
//         <p className="text-2xl font-bold text-blue-400 mt-2">128</p>
//         <p className="text-green-400 text-sm mt-1">Applications</p>
//       </div>

//       <div className="bg-gray-900 rounded-xl p-6 border border-blue-500/20 shadow-md">
//         <h3 className="text-gray-400 text-sm">Data Scientist</h3>
//         <p className="text-2xl font-bold text-blue-400 mt-2">96</p>
//         <p className="text-green-400 text-sm mt-1">Applications</p>
//       </div>

//       <div className="bg-gray-900 rounded-xl p-6 border border-blue-500/20 shadow-md">
//         <h3 className="text-gray-400 text-sm">UI/UX Designer</h3>
//         <p className="text-2xl font-bold text-blue-400 mt-2">54</p>
//         <p className="text-green-400 text-sm mt-1">Applications</p>
//       </div>

//       <div className="bg-gray-900 rounded-xl p-6 border border-blue-500/20 shadow-md">
//         <h3 className="text-gray-400 text-sm">HR Executive</h3>
//         <p className="text-2xl font-bold text-blue-400 mt-2">41</p>
//         <p className="text-green-400 text-sm mt-1">Applications</p>
//       </div>

//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VacanciesList() {
  const [vacancies, setVacancies] = useState([]);
  const [appliedCounts, setAppliedCounts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch vacancies
    const fetchVacancies = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/hr/vacancies");
        const data = await res.json();
        setVacancies(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch vacancies", err);
      }
    };

    // Fetch applications count per vacancy
    const fetchCounts = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/applications/count-per-vacancy"
        );
        const data = await res.json();

        const countsMap = {};
        data.forEach((item) => {
          countsMap[item._id] = item.appliedCount;
        });

        setAppliedCounts(countsMap);
      } catch (err) {
        console.error("Failed to fetch application counts", err);
      }
    };

    fetchVacancies();
    fetchCounts();
  }, []);

  return (
    <div className="space-y-6">
      {vacancies.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {vacancies.map((vac) => (
            <div
              key={vac._id}
              onClick={() =>
                navigate(`/hr/vacancies/${vac._id}/candidates`)
              }
              className="cursor-pointer bg-gray-800 p-5 rounded-xl shadow-md
                         flex flex-col justify-between
                         hover:shadow-xl hover:ring-2 hover:ring-blue-500
                         transition-all duration-200"
            >
              <div className="mb-4">
                <h3 className="text-lg font-bold text-blue-400">
                  {vac.title}
                </h3>
                <p className="text-gray-300 text-sm mt-1">
                  {vac.company} • {vac.location}
                </p>
              </div>

              <div className="text-right mt-auto">
                <p className="text-green-400 font-semibold text-sm">
                  {appliedCounts[vac._id] || 0} Applied
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Click to view candidates →
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No vacancies posted yet.</p>
      )}
    </div>
  );
}
// import { useEffect, useState } from "react";

// export default function TopCards() {
//   const [appliedCounts, setAppliedCounts] = useState({});
//   const [postedCounts, setPostedCounts] = useState({});
//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user?._id || user?.id || null;

//   const modules = ["Software Engineer", "Data Scientist", "UI/UX Designer", "HR Executive"];

//   // Fetch user's applied jobs
//   useEffect(() => {
//     if (!userId) return;

//     const fetchAppliedJobs = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/applications/user/${userId}`);
//         const data = await res.json();

//         if (!Array.isArray(data)) return;

//         const counts = {};
//         data.forEach((app) => {
//           const title = app.vacancyTitle || app.vacancyId?.title || "Unknown";
//           counts[title] = (counts[title] || 0) + 1;
//         });

//         setAppliedCounts(counts);
//       } catch (err) {
//         console.error("Failed to fetch applied jobs", err);
//       }
//     };

//     fetchAppliedJobs();
//   }, [userId]);

//   // Fetch all vacancies posted by HR
//   useEffect(() => {
//     const fetchVacancies = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/hr/vacancies");
//         const data = await res.json();

//         if (!Array.isArray(data)) return;

//         const counts = {};
//         data.forEach((vac) => {
//           const title = vac.title || "Unknown";
//           counts[title] = (counts[title] || 0) + 1;
//         });

//         setPostedCounts(counts);
//       } catch (err) {
//         console.error("Failed to fetch vacancies", err);
//       }
//     };

//     fetchVacancies();
//   }, []);

//   return (
//     <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//       {modules.map((m) => (
//         <div key={m} className="bg-gray-900 rounded-xl p-6 border border-blue-500/20 shadow-md">
//           <h3 className="text-gray-400 text-sm">{m}</h3>

//           {/* Applied count */}
//           <p className="text-2xl font-bold text-blue-400 mt-2">
//             {appliedCounts[m] || 0}
//           </p>
//           <p className="text-green-400 text-sm mt-1">Applied Jobs</p>

//           {/* Posted count */}
//           <p className="text-2xl font-bold text-blue-400 mt-2">
//             {postedCounts[m] || 0}
//           </p>
//           <p className="text-yellow-400 text-sm mt-1">Jobs Posted</p>
//         </div>
//       ))}
//     </div>
//   );
// }
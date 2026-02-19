// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// export default function ApplyJob() {
//   const { vacancyId } = useParams();
//   const [job, setJob] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/vacancies/${vacancyId}`)
//       .then(res => res.json())
//       .then(setJob);
//   }, [vacancyId]);

//   if (!job) return <p className="text-white p-6">Loading...</p>;

//   return (
//     <div className="bg-[#0b1020] min-h-screen text-gray-200 p-8">
      
//       {/* HEADER */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-white">
//           {job.title}
//         </h1>
//         <p className="text-gray-400 mt-2">
//           📍 {job.location} • 🕒 {job.experience} • 💼 {job.type}
//         </p>

//         <button
//           className="mt-4 bg-blue-600 px-6 py-2 rounded-lg
//                      hover:bg-blue-700 transition"
//         >
//           Apply Now
//         </button>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//         {/* LEFT: JOB DESCRIPTION */}
//         <div className="lg:col-span-2 bg-[#11162a]
//                         border border-white/10
//                         rounded-2xl p-6">
//           <h2 className="text-xl font-semibold mb-4">
//             Job Description
//           </h2>

//           <div className="text-gray-300 whitespace-pre-line leading-7">
//             {job.description}
//           </div>
//         </div>

//         {/* RIGHT: JOB SNAPSHOT */}
//         <div className="bg-[#11162a]
//                         border border-white/10
//                         rounded-2xl p-6 h-fit">
//           <h2 className="text-xl font-semibold mb-4">
//             Job Snapshot
//           </h2>

//           <SnapshotItem label="Updated Date" value={job.updatedAt?.slice(0,10)} />
//           <SnapshotItem label="Job ID" value={job.jobId} />
//           <SnapshotItem label="Department" value={job.department} />
//           <SnapshotItem label="Location" value={job.location} />
//           <SnapshotItem label="Experience" value={job.experience} />
//           <SnapshotItem label="Employee Type" value={job.type} />
//         </div>
//       </div>
//     </div>
//   );
// }

// function SnapshotItem({ label, value }) {
//   return (
//     <div className="mb-4">
//       <p className="text-sm text-gray-400">{label}</p>
//       <p className="text-white font-medium">{value || "-"}</p>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ApplyJob() {
  const { vacancyId } = useParams();
  const [job, setJob] = useState(null);

//  const { vacancyId } = useParams();

useEffect(() => {
  fetch(`http://localhost:5000/api/hr/vacancies/${vacancyId}`)
    .then(res => res.json())
    .then(data => setVacancy(data));
}, [vacancyId]);


  if (!job) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="bg-[#0b1020] min-h-screen text-gray-200 p-8">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          {job.title}
        </h1>
        <p className="text-gray-400 mt-2">
          📍 {job.location} • 🕒 {job.experienceMin}-{job.experienceMax} Years • 💼 {job.employeeTypes?.join(", ")}
        </p>

        <button className="mt-4 bg-blue-600 px-6 py-2 rounded-lg">
          Apply Now
        </button>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="lg:col-span-2 bg-[#11162a] rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Job Description</h2>
          <div className="whitespace-pre-line">
            {job.jobDescription}
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-[#11162a] rounded-2xl p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Job Snapshot</h2>
          <SnapshotItem label="Updated Date" value={job.updatedAt?.slice(0,10)} />
          <SnapshotItem label="Department" value={job.department} />
          <SnapshotItem label="Location" value={job.location} />
          <SnapshotItem label="Experience" value={`${job.experienceMin}-${job.experienceMax} Years`} />
          <SnapshotItem label="Employee Type" value={job.employeeTypes?.join(", ")} />
        </div>
      </div>
    </div>
  );
}

function SnapshotItem({ label, value }) {
  return (
    <div className="mb-4">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-white font-medium">{value || "-"}</p>
    </div>
  );
}

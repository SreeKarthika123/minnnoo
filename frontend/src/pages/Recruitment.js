// import { useEffect, useState } from "react";

// export default function Recruitment() {
//   const [vacancies, setVacancies] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/hr/vacancies")
//       .then((res) => res.json())
//       .then((data) => setVacancies(data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div className="p-6 pt-24 bg-gray-50 min-h-screen ml-64">
//       <h2 className="text-2xl font-bold mb-6">Recruitment</h2>

//       {vacancies.length === 0 ? (
//         <p>No vacancies available currently.</p>
//       ) : (
//         <div className="grid gap-4">
//           {vacancies.map((vacancy) => (
//             <div key={vacancy._id} className="bg-white p-4 rounded shadow">
//               <h4 className="font-semibold">{vacancy.title}</h4>
//               <p>{vacancy.description}</p>
//               <p className="text-sm text-gray-500">
//                 Location: {vacancy.location || "N/A"} | Salary: {vacancy.salary || "N/A"}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }





// import { useEffect, useState } from "react";
 
// export default function Recruitment() {
//   const [vacancies, setVacancies] = useState([]);
//   const [loading, setLoading] = useState(true);
 
//   const user = JSON.parse(localStorage.getItem("user"));
 
//   // Fetch vacancies + AI score
//   useEffect(() => {
//     const fetchVacanciesWithScore = async () => {
//       try {
//         const res = await fetch(
//           "http://localhost:5000/api/hr/vacancies"
//         );
//         const data = await res.json();
 
//         const scoredVacancies = await Promise.all(
//           data.map(async (vac) => {
//             const scoreRes = await fetch(
//               "http://localhost:5000/api/ai/match-score",
//               {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                   userId: user.id,
//                   vacancyId: vac._id,
//                 }),
//               }
//             );
 
//             const scoreData = await scoreRes.json();
 
//             return {
//               ...vac,
//               score: scoreData.score,
//               missingSkills: scoreData.missingSkills || [],
//               summary: scoreData.summary || "",
//             };
//           })
//         );
 
//         setVacancies(scoredVacancies);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
 
//     if (user) fetchVacanciesWithScore();
//   }, [user]);
 
//   if (loading) {
//     return (
//       <div className="pt-24 text-center text-gray-500">
//         Analyzing jobs with your resume...
//       </div>
//     );
//   }
 
//   return (
//     <div className="p-6 pt-24 bg-gray-50 min-h-screen ml-64">
//       <h2 className="text-2xl font-bold mb-6">Recruitment</h2>
 
//       {vacancies.length === 0 ? (
//         <p>No vacancies available currently.</p>
//       ) : (
//         <div className="grid gap-5">
//           {vacancies.map((vac) => (
//             <div
//               key={vac._id}
//               className="bg-white p-5 rounded-lg shadow"
//             >
//               <h3 className="text-lg font-semibold">
//                 {vac.title}
//               </h3>
 
//               <p className="mt-2 text-gray-700">
//                 {vac.description}
//               </p>
 
//               <p className="text-sm text-gray-500 mt-1">
//                 {vac.location || "N/A"} | {vac.salary || "N/A"}
//               </p>
 
//               {/* AI Match Score */}
//               <div className="mt-4">
//                 <p className="font-semibold text-green-600">
//                   Match Score: {vac.score}%
//                 </p>
 
//                 {vac.missingSkills.length > 0 && (
//                   <p className="text-sm text-red-500">
//                     Missing Skills:{" "}
//                     {vac.missingSkills.join(", ")}
//                   </p>
//                 )}
 
//                 {vac.summary && (
//                   <p className="text-sm italic text-gray-600 mt-1">
//                     {vac.summary}
//                   </p>
//                 )}
//               </div>
 
//               {/* Apply Button */}
//               <div className="mt-4">
//                 {vac.score >= 70 ? (
//                   <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//                     Apply Now
//                   </button>
//                 ) : (
//                   <p className="text-sm text-gray-400">
//                     Improve skills to apply
//                   </p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
 


// // import { useEffect, useState } from "react";

// // export default function Recruitment() {
// //   const [vacancies, setVacancies] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     fetch("http://localhost:5000/api/hr/vacancies")
// //       .then(res => res.json())
// //       .then(data => setVacancies(data))
// //       .catch(err => console.error(err));
// //   }, []);

// //   const checkEligibility = async (vacancyId) => {
// //     setLoading(true);
// //     const user = JSON.parse(localStorage.getItem("user"));

// //     try {
// //       const res = await fetch("http://localhost:5000/api/match/evaluate", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ userId: user._id, vacancyId })
// //       });

// //       const data = await res.json();
// //       alert(`Match Score: ${data.matchPercentage}%\nStatus: ${data.status}`);
// //     } catch (err) {
// //       console.error("Eligibility error:", err);
// //       alert("Failed to check eligibility");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="p-6 pt-24 bg-gray-50 min-h-screen ml-64">
// //       <h2 className="text-2xl font-bold mb-6">Recruitment</h2>

// //       {vacancies.length === 0 ? (
// //         <p>No vacancies available currently.</p>
// //       ) : (
// //         <div className="grid gap-4">
// //           {vacancies.map((vacancy) => (
// //             <div key={vacancy._id} className="bg-white p-4 rounded shadow">
// //               <h4 className="font-semibold">{vacancy.title}</h4>
// //               <p>{vacancy.description}</p>
// //               <p className="text-sm text-gray-500">
// //                 Location: {vacancy.location || "N/A"} | Salary: {vacancy.salary || "N/A"}
// //               </p>
// //               <button
// //                 onClick={() => checkEligibility(vacancy._id)}
// //                 className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
// //                 disabled={loading}
// //               >
// //                 {loading ? "Checking..." : "Check Eligibility"}
// //               </button>
// //             </div>
// //           ))

// //         </div>
// //       )}
// //     </div>
// //   );
// // }




// import { useEffect, useState } from "react";

// export default function Recruitment() {
//   const [vacancies, setVacancies] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const user = JSON.parse(localStorage.getItem("user"));
//   console.log("DEBUG - User from localStorage:", user); 
//   useEffect(() => {
//     const fetchVacanciesWithScore = async () => {
//       try {
//         // 1️⃣ Fetch vacancies
//         const res = await fetch("http://localhost:5000/api/hr/vacancies");
//         const data = await res.json();

//         // 2️⃣ Fetch AI match score for each vacancy
//         const scoredVacancies = await Promise.all(
//           data.map(async (vac) => {
//             const scoreRes = await fetch(
//               "http://localhost:5000/api/ai/match-score",
//               {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                   userId: user._id || user.id,       // Must be _id
//                   vacancyId: vac._id,
//                 }),
//               }
//             );

//             const scoreData = await scoreRes.json();
//               //  console.log("DEBUG - AI response:", scoreData);

//             return {
//               ...vac,
//               score: scoreData.score || 0,
//               missingSkills: scoreData.missingSkills || [],
//               summary: scoreData.summary || "",
//             };
//           })
//         );

//         setVacancies(scoredVacancies);
//       } catch (err) {
//         console.error("Error fetching vacancies:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user) fetchVacanciesWithScore();
//   }, [user]);

//   if (loading) {
//     return <div className="pt-24 text-center">Analyzing jobs with your resume...</div>;
//   }

//   return (
//     <div className="p-6 pt-24 bg-gray-50 min-h-screen ml-64">
//       <h2 className="text-2xl font-bold mb-6">Recruitment</h2>

//       {vacancies.length === 0 ? (
//         <p>No vacancies available currently.</p>
//       ) : (
//         <div className="grid gap-5">
//           {vacancies.map((vac) => (
//             <div key={vac._id} className="bg-white p-5 rounded-lg shadow">
//               <h3 className="text-lg font-semibold">{vac.title}</h3>
//               <p className="mt-2 text-gray-700">{vac.description}</p>
//               <p className="text-sm text-gray-500 mt-1">
//                 {vac.location || "N/A"} | {vac.salary || "N/A"}
//               </p>

//               <div className="mt-4">
//                 <p className="font-semibold text-green-600">Match Score: {vac.score}%</p>
//                 {vac.missingSkills.length > 0 && (
//                   <p className="text-sm text-red-500">
//                     Missing Skills: {vac.missingSkills.join(", ")}
//                   </p>
//                 )}
//                 {vac.summary && (
//                   <p className="text-sm italic text-gray-600 mt-1">{vac.summary}</p>
//                 )}
//               </div>

//               <div className="mt-4">
//                 {vac.score >= 70 ? (
//                   <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//                     Apply Now
//                   </button>
//                 ) : (
//                   <p className="text-sm text-gray-400">Improve skills to apply</p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }





// import { useEffect, useState } from "react";

// export default function Recruitment() {
//   const [vacancies, setVacancies] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 1️⃣ Load user from localStorage
//   const user = JSON.parse(localStorage.getItem("user"));
//   // console.log("DEBUG - User from localStorage:", user);

//   useEffect(() => {
//     const fetchVacanciesWithScore = async () => {
//       try {
//         if (!user || (!user._id && !user.id)) {
//           console.error("User not found or missing _id/id in localStorage");
//           setVacancies([]);
//           setLoading(false);
//           return;
//         }

//         // 2️⃣ Fetch vacancies
//         const res = await fetch("http://localhost:5000/api/hr/vacancies");
// if (!res.ok) throw new Error("Failed to fetch vacancies");
// const data = await res.json();

// // ✅ Limit to top 3 vacancies for testing
// const limitedVacancies = data.slice(0, 3);


//         // 3️⃣ Fetch AI match score for each vacancy
//         // const scoredVacancies = await Promise.all(
//         //   data.map(async (vac) => {
//         //     try {
//         //       const scoreRes = await fetch(
//         //         "http://localhost:5000/api/ai/match-score",
//         //         {
//         //           method: "POST",
//         //           headers: { "Content-Type": "application/json" },
//         //           body: JSON.stringify({
//         //             userId: user._id || user.id, // ✅ Correct userId
//         //             vacancyId: vac._id,
//         //           }),
//         //         }
//         //       );


// // Limit vacancies to top 3 for testing / quota control
// // const limitedVacancies = data.slice(0, 3);

// const scoredVacancies = await Promise.all(
//   limitedVacancies.map(async (vac) => {
//     try {
//       const scoreRes = await fetch(
//         "http://localhost:5000/api/ai/match-score",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             userId: user._id || user.id, // ✅ Correct userId
//             vacancyId: vac._id,
//           }),
//         }
//       );

//       if (!scoreRes.ok) {
//         const errMsg = await scoreRes.json();
//         console.error("AI Match Error:", errMsg);
//         return { ...vac, score: 0, missingSkills: [], summary: "Failed to get score" };
//       }

//       const scoreData = await scoreRes.json();

//       return {
//         ...vac,
//         score: Number(scoreData.score) || 0,
//         missingSkills: Array.isArray(scoreData.missingSkills)
//           ? scoreData.missingSkills
//           : [],
//         summary: scoreData.summary || "",
//       };
//     } catch (err) {
//       console.error("Error fetching AI score:", err);
//       return { ...vac, score: 0, missingSkills: [], summary: "AI request failed" };
//     }
//   })
// );

// // If you want, you can append the remaining vacancies with a placeholder score
// const placeholderVacancies = data.slice(3).map((vac) => ({
//   ...vac,
//   score: 0,
//   missingSkills: [],
//   summary: "Score not calculated (quota limited)",
// }));

// setVacancies([...scoredVacancies, ...placeholderVacancies]);

//               // 4️⃣ Handle backend errors
//         //       if (!scoreRes.ok) {
//         //         const errMsg = await scoreRes.json();
//         //         console.error("AI Match Error:", errMsg);
//         //         return { ...vac, score: 0, missingSkills: [], summary: "Failed to get score" };
//         //       }

//         //       const scoreData = await scoreRes.json();

//         //       return {
//         //         ...vac,
//         //         score: Number(scoreData.score) || 0,
//         //         missingSkills: Array.isArray(scoreData.missingSkills)
//         //           ? scoreData.missingSkills
//         //           : [],
//         //         summary: scoreData.summary || "",
//         //       };
//         //     } catch (err) {
//         //       console.error("Error fetching AI score:", err);
//         //       return { ...vac, score: 0, missingSkills: [], summary: "AI request failed" };
//         //     }
//         //   })
//         // );

//         // setVacancies(scoredVacancies);
//       } catch (err) {
//         console.error("Error fetching vacancies:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVacanciesWithScore();
//   }, [user]);

//   if (loading) {
//     return (
//       <div className="pt-24 text-center">
//         Analyzing jobs with your resume...
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 pt-24 bg-gray-50 min-h-screen ml-64">
//       <h2 className="text-2xl font-bold mb-6">Recruitment</h2>

//       {vacancies.length === 0 ? (
//         <p>No vacancies available currently.</p>
//       ) : (
//         <div className="grid gap-5">
//           {vacancies.map((vac) => (
//             <div key={vac._id} className="bg-white p-5 rounded-lg shadow">
//               <h3 className="text-lg font-semibold">{vac.title}</h3>
//               <p className="mt-2 text-gray-700">{vac.description}</p>
//               <p className="text-sm text-gray-500 mt-1">
//                 {vac.location || "N/A"} | {vac.salary || "N/A"}
//               </p>

//               <div className="mt-4">
//                 <p className="font-semibold text-green-600">
//                   Match Score: {vac.score}%
//                 </p>
//                 {vac.missingSkills.length > 0 && (
//                   <p className="text-sm text-red-500">
//                     Missing Skills: {vac.missingSkills.join(", ")}
//                   </p>
//                 )}
//                 {vac.summary && (
//                   <p className="text-sm italic text-gray-600 mt-1">{vac.summary}</p>
//                 )}
//               </div>

//               <div className="mt-4">
//                 {vac.score >= 70 ? (
//                   <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//                     Apply Now
//                   </button>
//                 ) : (
//                   <p className="text-sm text-gray-400">Improve skills to apply</p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



// // import { useEffect, useState } from "react";

// // export default function Recruitment() {
// //   const [vacancies, setVacancies] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   // 1️⃣ Load user from localStorage
// //   const user = JSON.parse(localStorage.getItem("user"));

// //   useEffect(() => {
// //     const fetchVacanciesWithScore = async () => {
// //       try {
// //         if (!user || (!user._id && !user.id)) {
// //           console.error("User not found or missing _id/id in localStorage");
// //           setVacancies([]);
// //           setLoading(false);
// //           return;
// //         }

// //         // 2️⃣ Fetch all vacancies from backend
// //         const res = await fetch("http://localhost:5000/api/hr/vacancies");
// //         if (!res.ok) throw new Error("Failed to fetch vacancies");
// //         const allVacancies = await res.json();

// //         // 3️⃣ Fetch AI-scored vacancies from backend
// //         // Limit AI scoring to top 3 vacancies to save quota
// //         const resAI = await fetch("http://localhost:5000/api/ai/vacancy-scores", {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({ userId: user._id || user.id }),
// //         });

// //         let scoredVacancies = [];
// //         if (resAI.ok) {
// //           scoredVacancies = await resAI.json();
// //         } else {
// //           console.error("Failed to fetch AI scores");
// //           // fallback: mark top 3 as unscored
// //           scoredVacancies = allVacancies.slice(0, 3).map((vac) => ({
// //             ...vac,
// //             score: 0,
// //             missingSkills: [],
// //             summary: "Score not calculated (AI error)",
// //           }));
// //         }

// //         // 4️⃣ Append remaining vacancies as placeholders
// //         const placeholderVacancies = allVacancies.slice(scoredVacancies.length).map((vac) => ({
// //           ...vac,
// //           score: 0,
// //           missingSkills: [],
// //           summary: "Score not calculated (quota limited)",
// //         }));

// //         setVacancies([...scoredVacancies, ...placeholderVacancies]);
// //       } catch (err) {
// //         console.error("Error fetching vacancies:", err);
// //         setVacancies([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchVacanciesWithScore();
// //   }, [user]);

// //   if (loading) {
// //     return (
// //       <div className="pt-24 text-center">
// //         Analyzing jobs with your resume...
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="p-6 pt-24 bg-gray-50 min-h-screen ml-64">
// //       <h2 className="text-2xl font-bold mb-6">Recruitment</h2>

// //       {vacancies.length === 0 ? (
// //         <p>No vacancies available currently.</p>
// //       ) : (
// //         <div className="grid gap-5">
// //           {vacancies.map((vac) => (
// //             <div key={vac._id} className="bg-white p-5 rounded-lg shadow">
// //               <h3 className="text-lg font-semibold">{vac.title}</h3>
// //               <p className="mt-2 text-gray-700">{vac.description}</p>
// //               <p className="text-sm text-gray-500 mt-1">
// //                 {vac.location || "N/A"} | {vac.salary || "N/A"}
// //               </p>

// //               <div className="mt-4">
// //                 <p className="font-semibold text-green-600">
// //                   Match Score: {vac.score}%
// //                 </p>
// //                 {vac.missingSkills.length > 0 && (
// //                   <p className="text-sm text-red-500">
// //                     Missing Skills: {vac.missingSkills.join(", ")}
// //                   </p>
// //                 )}
// //                 {vac.summary && (
// //                   <p className="text-sm italic text-gray-600 mt-1">{vac.summary}</p>
// //                 )}
// //               </div>

// //               <div className="mt-4">
// //                 {vac.score >= 70 ? (
// //                   <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
// //                     Apply Now
// //                   </button>
// //                 ) : (
// //                   <p className="text-sm text-gray-400">Improve skills to apply</p>
// //                 )}
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }



// import { useEffect, useState } from "react";

// export default function Recruitment() {
//   const [vacancies, setVacancies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // 1️⃣ Load user from localStorage
//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     const fetchVacancies = async () => {
//       try {
//         if (!user || (!user._id && !user.id)) {
//           setError("User not found");
//           setVacancies([]);
//           return;
//         }

//         // 2️⃣ Fetch vacancies from backend
//         const res = await fetch("http://localhost:5000/api/hr/vacancies");
//         if (!res.ok) throw new Error("Failed to fetch vacancies");

//         const data = await res.json();

//         const vacanciesArray = Array.isArray(data) ? data : [];

//         // 3️⃣ Optional: fetch AI match score for each vacancy
//         const scoredVacancies = await Promise.all(
//           vacanciesArray.map(async (vac) => {
//             try {
//               const scoreRes = await fetch(
//                 "http://localhost:5000/api/ai/match-score",
//                 {
//                   method: "POST",
//                   headers: { "Content-Type": "application/json" },
//                   body: JSON.stringify({
//                     userId: user._id || user.id,
//                     vacancyId: vac._id,
//                   }),
//                 }
//               );

//               if (!scoreRes.ok) return { ...vac, score: 0, missingSkills: [], summary: "Score unavailable" };

//               const scoreData = await scoreRes.json();

//               return {
//                 ...vac,
//                 score: Number(scoreData.score) || 0,
//                 missingSkills: Array.isArray(scoreData.missingSkills)
//                   ? scoreData.missingSkills
//                   : [],
//                 summary: scoreData.summary || "",
//               };
//             } catch {
//               return { ...vac, score: 0, missingSkills: [], summary: "AI request failed" };
//             }
//           })
//         );

//         setVacancies(scoredVacancies);
//       } catch (err) {
//         console.error("Error fetching vacancies:", err);
//         setError(err.message || "Failed to load vacancies");
//         setVacancies([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVacancies();
//   }, [user]);

//   if (loading) return <div className="pt-24 text-center">Loading vacancies...</div>;
//   if (error) return <div className="pt-24 text-center text-red-500">{error}</div>;

//   return (
//     <div className="p-6 pt-24 bg-gray-50 min-h-screen ml-64">
//       <h2 className="text-2xl font-bold mb-6">Recruitment</h2>

//       {vacancies.length === 0 ? (
//         <p>No vacancies available currently.</p>
//       ) : (
//         <div className="grid gap-5">
//           {vacancies.map((vac) => (
//             <div key={vac._id} className="bg-white p-5 rounded-lg shadow">
//               <h3 className="text-lg font-semibold">{vac.title}</h3>
//               <p className="mt-2 text-gray-700">{vac.description}</p>
//               <p className="text-sm text-gray-500 mt-1">
//                 {vac.location || "N/A"} | {vac.salary || "N/A"}
//               </p>

//               <div className="mt-4">
//                 <p className="font-semibold text-green-600">
//                   Match Score: {vac.score || 0}%
//                 </p>
//                 {vac.missingSkills && vac.missingSkills.length > 0 && (
//                   <p className="text-sm text-red-500">
//                     Missing Skills: {vac.missingSkills.join(", ")}
//                   </p>
//                 )}
//                 {vac.summary && (
//                   <p className="text-sm italic text-gray-600 mt-1">{vac.summary}</p>
//                 )}
//               </div>

//               <div className="mt-4">
//                 {vac.score >= 70 ? (
//                   <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//                     Apply Now
//                   </button>
//                 ) : (
//                   <p className="text-sm text-gray-400">Improve skills to apply</p>
//                 )}
//               </div>

//               <div className="text-sm text-gray-400 mt-2">
//                 Posted by: HR Admin
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }




// import { useEffect, useState } from "react";

// export default function Recruitment() {
//   const [vacancies, setVacancies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Load user from localStorage
//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     const fetchVacancies = async () => {
//       try {
//         if (!user || (!user._id && !user.id)) {
//           setError("User not found");
//           setVacancies([]);
//           setLoading(false);
//           return;
//         }

//         // Fetch vacancies from backend
//         const res = await fetch("http://localhost:5000/api/hr/vacancies");
//         if (!res.ok) throw new Error("Failed to fetch vacancies");

//         const data = await res.json();
//         setVacancies(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error("Error fetching vacancies:", err);
//         setError(err.message || "Failed to load vacancies");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVacancies();
//   }, [user]);

//   // ✅ Handle Check Score
//   const handleCheckScore = async (vacancyId) => {
//     if (!user || (!user._id && !user.id)) return alert("User not logged in");

//     // Set a temporary loading state for this vacancy
//     setVacancies((prev) =>
//       prev.map((vac) =>
//         vac._id === vacancyId ? { ...vac, checking: true } : vac
//       )
//     );

//     try {
//       const res = await fetch("http://localhost:5000/api/ai/match-score", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId: user._id || user.id, vacancyId }),
//       });

//       const data = await res.json();

//       // Update the vacancy with AI score info
//       setVacancies((prev) =>
//         prev.map((vac) =>
//           vac._id === vacancyId
//             ? {
//                 ...vac,
//                 score: data.score || 0,
//                 missingSkills: data.missingSkills || [],
//                 summary: data.summary || "Score unavailable",
//                 checking: false,
//               }
//             : vac
//         )
//       );
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch AI score");
//       setVacancies((prev) =>
//         prev.map((vac) =>
//           vac._id === vacancyId ? { ...vac, checking: false } : vac
//         )
//       );
//     }
//   };

//   if (loading)
//     return <div className="pt-24 text-center">Loading vacancies...</div>;
//   if (error)
//     return <div className="pt-24 text-center text-red-500">{error}</div>;

//   return (
//     <div className="p-6 pt-24 bg-gray-50 min-h-screen ml-64">
//       <h2 className="text-2xl font-bold mb-6">Recruitment</h2>

//       {vacancies.length === 0 ? (
//         <p>No vacancies available currently.</p>
//       ) : (
//         <div className="grid gap-5">
//           {vacancies.map((vac) => (
//             <div key={vac._id} className="bg-white p-5 rounded-lg shadow">
//               <h3 className="text-lg font-semibold">{vac.title}</h3>
//               <p className="mt-2 text-gray-700">{vac.description}</p>
//               <p className="text-sm text-gray-500 mt-1">
//                 {vac.location || "N/A"} | {vac.salary || "N/A"}
//               </p>

//               {/* Check Score Button */}
//               <button
//                 onClick={() => handleCheckScore(vac._id)}
//                 disabled={vac.checking}
//                 className={`mt-3 px-3 py-1 rounded ${
//                   vac.checking
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-blue-600 text-white hover:bg-blue-700"
//                 }`}
//               >
//                 {vac.checking ? "Checking..." : "Check Score"}
//               </button>

//               {/* Display AI Results */}
//               {vac.score !== undefined && (
//                 <div className="mt-3 p-3 bg-gray-100 rounded">
//                   <p>
//                     <strong>Score:</strong> {vac.score}%
//                   </p>
//                   <p>
//                     <strong>Missing Skills:</strong>{" "}
//                     {vac.missingSkills.length > 0
//                       ? vac.missingSkills.join(", ")
//                       : "None"}
//                   </p>
//                   <p>
//                     <strong>Summary:</strong> {vac.summary}
//                   </p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



// import { useEffect, useState } from "react";

// export default function Recruitment() {
//   const [vacancies, setVacancies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Load user from localStorage
//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     const fetchVacancies = async () => {
//       try {
//         if (!user || (!user._id && !user.id)) {
//           setError("User not found");
//           setVacancies([]);
//           return;
//         }

//         const res = await fetch("http://localhost:5000/api/hr/vacancies");
//         if (!res.ok) throw new Error("Failed to fetch vacancies");

//         const data = await res.json();
//         setVacancies(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error(err);
//         setError(err.message || "Failed to load vacancies");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVacancies();
//   }, [user]);

//   // Function to check AI match score for a vacancy
//   const checkScore = async (vacancyId) => {
//     setVacancies((prev) =>
//       prev.map((v) =>
//         v._id === vacancyId ? { ...v, aiLoading: true, aiError: "" } : v
//       )
//     );

//     try {
//       const res = await fetch("http://localhost:5000/api/ai/match-score", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId: user._id || user.id, vacancyId }),
//       });

//       if (!res.ok) throw new Error("Failed to get AI score");

//       const data = await res.json();

//       setVacancies((prev) =>
//         prev.map((v) =>
//           v._id === vacancyId
//             ? { ...v, aiScore: data, aiLoading: false }
//             : v
//         )
//       );
//     } catch (err) {
//       console.error(err);
//       setVacancies((prev) =>
//         prev.map((v) =>
//           v._id === vacancyId
//             ? { ...v, aiError: err.message || "AI analysis failed", aiLoading: false }
//             : v
//         )
//       );
//     }
//   };

//   if (loading) return <div className="pt-24 text-center">Loading vacancies...</div>;
//   if (error) return <div className="pt-24 text-center text-red-500">{error}</div>;

//   return (
//     <div className="p-6 pt-24 bg-gray-50 min-h-screen ml-64">
//       <h2 className="text-2xl font-bold mb-6">Recruitment</h2>

//       {vacancies.length === 0 ? (
//         <p>No vacancies available currently.</p>
//       ) : (
//         <div className="grid gap-5">
//           {vacancies.map((vac) => (
//             <div key={vac._id} className="bg-white p-5 rounded-lg shadow">
//               <h3 className="text-lg font-semibold">{vac.title}</h3>
//               <p className="mt-2 text-gray-700">{vac.description}</p>
//               <p className="text-sm text-gray-500 mt-1">
//                 {vac.location || "N/A"} | {vac.salary || "N/A"}
//               </p>

//               <button
//                 className="mt-3 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                 onClick={() => checkScore(vac._id)}
//                 disabled={vac.aiLoading}
//               >
//                 {vac.aiLoading ? "Analyzing..." : "Check Score"}
//               </button>

//               {vac.aiError && (
//                 <p className="text-red-500 mt-2">{vac.aiError}</p>
//               )}

//             {vac.aiScore?.score !== undefined && !vac.aiLoading && (
  
//                 <div className="mt-3 p-3 border rounded bg-gray-50 space-y-1">
//                   <p><strong>Score:</strong> {vac.aiScore.score}</p>
//                   <p>
//   <strong>Missing Skills:</strong>{" "}
//   {(vac.aiScore?.missingSkills || []).join(", ") || "None"}
// </p>

//                   {/* <p><strong>Missing Skills:</strong> {vac.aiScore.missingSkills.join(", ") || "None"}</p> */}
//                   <p><strong>Summary:</strong> {vac.aiScore.summary}</p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


// import { useEffect, useState } from "react";

// export default function Recruitment() {
//   const [vacancies, setVacancies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Load user safely
//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   // ================= FETCH VACANCIES =================
//   useEffect(() => {
//     const fetchVacancies = async () => {
//       try {
//         if (!user || (!user._id && !user.id)) {
//           setError("User not found. Please login again.");
//           setVacancies([]);
//           return;
//         }

//         const res = await fetch("http://localhost:5000/api/hr/vacancies");
//         if (!res.ok) throw new Error("Failed to fetch vacancies");

//         const data = await res.json();
//         setVacancies(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error(err);
//         setError("Error loading vacancies");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVacancies();
//   }, []);

//   // ================= AI SCORE CHECK =================
//   const checkScore = async (vacancyId) => {
//     console.log("CHECK SCORE CLICKED:", vacancyId);

//     // show loading for clicked vacancy
//     setVacancies(prev =>
//       prev.map(v =>
//         String(v._id) === String(vacancyId)
//           ? { ...v, aiLoading: true, aiError: null }
//           : v
//       )
//     );

//     try {
//       const res = await fetch("http://localhost:5000/api/ai/match-score", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: user._id || user.id,
//           vacancyId,
//         }),
//       });

//       if (!res.ok) throw new Error("AI score fetch failed");

//       const data = await res.json();
//       console.log("AI RESPONSE:", data);

//       // handle both {result:{}} and direct {}
//       const scoreData = data.result || data;

//       setVacancies(prev =>
//         prev.map(v =>
//           String(v._id) === String(vacancyId)
//             ? {
//                 ...v,
//                 aiScore: {
//                   score: scoreData.score ?? 0,
//                   missingSkills: scoreData.missingSkills ?? [],
//                   matchedSkills: scoreData.matchedSkills ?? [],
//                   summary: scoreData.summary ?? "No summary",
//                 },
//                 aiLoading: false,
//               }
//             : v
//         )
//       );
//     } catch (err) {
//       console.error(err);
//       setVacancies(prev =>
//         prev.map(v =>
//           String(v._id) === String(vacancyId)
//             ? {
//                 ...v,
//                 aiError: "AI analysis failed",
//                 aiLoading: false,
//               }
//             : v
//         )
//       );
//     }
//   };

//   // ================= UI STATES =================
//   if (loading)
//     return <div className="pt-24 text-center">Loading vacancies...</div>;

//   if (error)
//     return (
//       <div className="pt-24 text-center text-red-500">{error}</div>
//     );

//   // ================= RENDER =================
//   return (
//     <div className="p-6 pt-24 bg-gray-50 min-h-screen ml-64">
//       <h2 className="text-2xl font-bold mb-6">Recruitment</h2>

//       {vacancies.length === 0 ? (
//         <p>No vacancies available.</p>
//       ) : (
//         <div className="grid gap-5">
//           {vacancies.map((vac) => (
//             <div key={vac._id} className="bg-white p-5 rounded shadow">
//               <h3 className="text-lg font-semibold">{vac.title}</h3>
//               <p className="mt-2 text-gray-700">{vac.description}</p>

//               <p className="text-sm text-gray-500 mt-1">
//                 {vac.location || "N/A"} | {vac.salary || "N/A"}
//               </p>

//               <button
//                 className="mt-3 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                 onClick={() => checkScore(vac._id)}
//                 disabled={vac.aiLoading}
//               >
//                 {vac.aiLoading ? "Analyzing..." : "Check Score"}
//               </button>

//               {vac.aiError && (
//                 <p className="text-red-500 mt-2">{vac.aiError}</p>
//               )}

//               {vac.aiScore && !vac.aiLoading && (
//                 <div className="mt-4 p-3 border rounded bg-gray-50">
//                   <p>
//                     <strong>Score:</strong>{" "}
//                     <span className="text-green-600">
//                       {vac.aiScore.score}%
//                     </span>
//                   </p>

//                   <p>
//                     <strong>Matched Skills:</strong>{" "}
//                     {vac.aiScore.matchedSkills.length
//                       ? vac.aiScore.matchedSkills.join(", ")
//                       : "None"}
//                   </p>

//                   <p>
//                     <strong>Missing Skills:</strong>{" "}
//                     {vac.aiScore.missingSkills.length
//                       ? vac.aiScore.missingSkills.join(", ")
//                       : "None"}
//                   </p>

//                   <p className="mt-2">
//                     <strong>Summary:</strong> {vac.aiScore.summary}
//                   </p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



// import { useEffect, useState } from "react";

// // 🔐 SAFE USER ID FETCH
// const getUserId = () => {
//   try {
//     const user = JSON.parse(localStorage.getItem("user"));
//     return user?._id || user?.id || user?.user?._id || null;
//   } catch {
//     return null;
//   }
// };

// export default function Recruitment() {
//   const [vacancies, setVacancies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const userId = getUserId();

//   // ================= FETCH VACANCIES =================
//   useEffect(() => {
//     const fetchVacancies = async () => {
//       try {
//         if (!userId) {
//           setError("User not found. Please login again.");
//           setLoading(false);
//           return;
//         }

//         const res = await fetch("http://localhost:5000/api/hr/vacancies");
//         if (!res.ok) throw new Error("Failed to fetch vacancies");

//         const data = await res.json();
//         setVacancies(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error(err);
//         setError("Error loading vacancies");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVacancies();
//   }, [userId]);

//   // ================= AI SCORE CHECK =================
//   const checkScore = async (vacancyId) => {
//     setVacancies(prev =>
//       prev.map(v =>
//         String(v._id) === String(vacancyId)
//           ? { ...v, aiLoading: true, aiError: null }
//           : v
//       )
//     );

//     try {
//       const res = await fetch("http://localhost:5000/api/ai/match-score", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId, vacancyId }),
//       });

//       if (!res.ok) throw new Error("AI score fetch failed");

//       const data = await res.json();

//       setVacancies(prev =>
//         prev.map(v =>
//           String(v._id) === String(vacancyId)
//             ? {
//                 ...v,
//                 aiScore: {
//                   score: data.score ?? 0,
//                   matchedSkills: data.matchedSkills ?? [],
//                   missingSkills: data.missingSkills ?? [],
//                   summary: data.summary ?? "No summary",
//                 },
//                 aiLoading: false,
//               }
//             : v
//         )
//       );
//     } catch (err) {
//       console.error(err);
//       setVacancies(prev =>
//         prev.map(v =>
//           String(v._id) === String(vacancyId)
//             ? { ...v, aiError: "AI analysis failed", aiLoading: false }
//             : v
//         )
//       );
//     }
//   };

//   // ================= UI STATES =================
//   if (loading)
//     return <div className="pt-24 text-center">Loading vacancies...</div>;

//   if (error)
//     return <div className="pt-24 text-center text-red-500">{error}</div>;

//   // ================= RENDER =================
//   return (
//     <div className="p-6 pt-24 bg-gray-50 min-h-screen ml-64">
//       <h2 className="text-2xl font-bold mb-6">Recruitment</h2>

//       {vacancies.length === 0 ? (
//         <p>No vacancies available.</p>
//       ) : (
//         <div className="grid gap-5">
//           {vacancies.map(vac => (
//             <div key={vac._id} className="bg-white p-5 rounded shadow">
//               <h3 className="text-lg font-semibold">{vac.title}</h3>
//               <p className="mt-2 text-gray-700">{vac.description}</p>

//               <p className="text-sm text-gray-500 mt-1">
//                 {vac.location || "N/A"} | {vac.salary || "N/A"}
//               </p>

//               <button
//                 className="mt-3 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                 onClick={() => checkScore(vac._id)}
//                 disabled={vac.aiLoading}
//               >
//                 {vac.aiLoading ? "Analyzing..." : "Check AI Match"}
//               </button>

//               {vac.aiError && (
//                 <p className="text-red-500 mt-2">{vac.aiError}</p>
//               )}

//               {vac.aiScore && !vac.aiLoading && (
//                 <div className="mt-4 p-3 border rounded bg-gray-50">
//                   <p>
//                     <strong>Score:</strong>{" "}
//                     <span className="text-green-600">
//                       {vac.aiScore.score}%
//                     </span>
//                   </p>

//                   <p>
//                     <strong>Matched Skills:</strong>{" "}
//                     {vac.aiScore.matchedSkills.length
//                       ? vac.aiScore.matchedSkills.join(", ")
//                       : "None"}
//                   </p>

//                   <p>
//                     <strong>Missing Skills:</strong>{" "}
//                     {vac.aiScore.missingSkills.length
//                       ? vac.aiScore.missingSkills.join(", ")
//                       : "None"}
//                   </p>

//                   <p className="mt-2">
//                     <strong>Summary:</strong> {vac.aiScore.summary}
//                   </p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// const getUserId = () => {
//   try {
//     const user = JSON.parse(localStorage.getItem("user"));
//     return user?._id || user?.id || null;
//   } catch {
//     return null;
//   }
// };

// export default function Recruitment() {
//   const [vacancies, setVacancies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const location = useLocation();
// const params = new URLSearchParams(location.search);
// const matchedOnly = params.get("matched") === "true";

// // const location = useLocation();
// // const matchedOnly = location.state?.matchedOnly || false;
//   const userId = getUserId();

//   // ================= FETCH VACANCIES =================
//   useEffect(() => {
//     const fetchVacancies = async () => {
//       try {
//         if (!userId) {
//           setError("User not found. Please login again.");
//           setLoading(false);
//           return;
//         }

//         const res = await fetch("http://localhost:5000/api/hr/vacancies");
//         const data = await res.json();

//         // 🔥 ATTACH EXISTING AI SCORE FROM DB
//         const enriched = data.map(v => {
//           const existingScore = v.aiScores?.find(
//             s => String(s.userId) === String(userId)
//           );

//           return {
//             ...v,
//             aiScore: existingScore || null,
//             aiLoading: false,
//             aiError: null
//           };
//         });

//         setVacancies(enriched);
//       } catch (err) {
//         console.error(err);
//         setError("Error loading vacancies");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVacancies();
//   }, [userId]);

//   // ================= CHECK / RECHECK SCORE =================
//   const checkScore = async (vacancyId) => {
//     setVacancies(prev =>
//       prev.map(v =>
//         v._id === vacancyId ? { ...v, aiLoading: true } : v
//       )
//     );

//     try {
//       const res = await fetch("http://localhost:5000/api/ai/match-score", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId, vacancyId }),
//       });

//       const data = await res.json();

//       setVacancies(prev =>
//         prev.map(v =>
//           v._id === vacancyId
//             ? { ...v, aiScore: data, aiLoading: false }
//             : v
//         )
//       );
//     } catch (err) {
//       setVacancies(prev =>
//         prev.map(v =>
//           v._id === vacancyId
//             ? { ...v, aiError: "AI failed", aiLoading: false }
//             : v
//         )
//       );
//     }
//   };

//   if (loading) return <div className="pt-24 text-center">Loading...</div>;
//   if (error) return <div className="pt-24 text-center text-red-500">{error}</div>;

//   return (
//     <div className="p-6 pt-24 bg-gray-50 min-h-screen ml-64">
//       <h2 className="text-2xl font-bold mb-6">Recruitment</h2>

//       <div className="grid gap-5">
//         {vacancies
//   .filter(vac => (matchedOnly ? !!vac.aiScore : true))
//   .map(vac => (
//     <div key={vac._id} className="bg-white p-5 rounded shadow">
//       <h3 className="text-lg font-semibold">{vac.title}</h3>
//       <p className="text-gray-700 mt-1">{vac.description}</p>

//       <button
//         onClick={() => checkScore(vac._id)}
//         disabled={vac.aiLoading}
//         className="mt-3 bg-blue-600 text-white px-3 py-1 rounded"
//       >
//         {vac.aiLoading
//           ? "Analyzing..."
//           : vac.aiScore
//           ? "Re-check Score"
//           : "Check Score"}
//       </button>

//       {/* ✅ AI SCORE DISPLAY */}
//       {vac.aiScore && (
//         <div className="mt-4 p-3 border rounded bg-gray-50">
//           <p><strong>Score:</strong> {vac.aiScore.score}%</p>
//           <p>
//             <strong>Matched Skills:</strong>{" "}
//             {vac.aiScore.matchedSkills?.join(", ") || "None"}
//           </p>
//           <p>
//             <strong>Missing Skills:</strong>{" "}
//             {vac.aiScore.missingSkills?.join(", ") || "None"}
//           </p>
//           <p className="mt-2">
//             <strong>Summary:</strong> {vac.aiScore.summary}
//           </p>
//         </div>
//       )}
//     </div>
// ))}

//         {/* {vacancies.map(vac => (
//           <div key={vac._id} className="bg-white p-5 rounded shadow">
//             <h3 className="text-lg font-semibold">{vac.title}</h3>
//             <p className="text-gray-700 mt-1">{vac.description}</p>

//             <button
//               onClick={() => checkScore(vac._id)}
//               disabled={vac.aiLoading}
//               className="mt-3 bg-blue-600 text-white px-3 py-1 rounded"
//             >
//               {vac.aiLoading
//                 ? "Analyzing..."
//                 : vac.aiScore
//                 ? "Re-check Score"
//                 : "Check Score"}
//             </button>

//             {/* ✅ PERSISTENT AI SCORE */}
//             {/* {vac.aiScore && (
//           //     <div className="mt-4 p-3 border rounded bg-gray-50">
//           //       <p><strong>Score:</strong> {vac.aiScore.score}%</p>
//           //       <p>
//           //         <strong>Matched Skills:</strong>{" "}
//           //         {vac.aiScore.matchedSkills?.join(", ") || "None"}
//           //       </p>
//           //       <p>
//           //         <strong>Missing Skills:</strong>{" "}
//           //         {vac.aiScore.missingSkills?.join(", ") || "None"}
//           //       </p>
//           //       <p className="mt-2">
//           //         <strong>Summary:</strong> {vac.aiScore.summary}
//           //       </p>
//           //     </div>
//           //   )}
//           // </div> */}
//         {/* ))} */} 
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// 🔐 SAFE USER ID FETCH
const getUserId = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?._id || user?.id || null;
  } catch {
    return null;
  }
};

export default function Recruitment({ sidebarOpen }) {

  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = getUserId();

  const navigate = useNavigate();


  // 🔎 READ QUERY PARAM (?matched=true)
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const matchedOnly = params.get("matched") === "true";

  // ================= FETCH VACANCIES =================


  useEffect(() => {
  const fetchVacancies = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/hr/vacancies");
      const data = await res.json();

      const enriched = data.map((v, i) => {
        const existingScore = v.aiScores?.find(
          s => String(s.userId) === String(userId)
        );
        return {
          ...v,
          aiScore: existingScore || null,
          aiLoading: false,
          aiError: null,
          autoAnalyze: i < 3 // only first 3 vacancies for auto-analysis
        };
      });

      setVacancies(enriched);
    } catch (err) {
      console.error(err);
      setError("Error loading vacancies");
    } finally {
      setLoading(false);
    }
  };

  fetchVacancies();
}, [userId]);

// ================= AUTO-ANALYZE FIRST N =================
useEffect(() => {
  vacancies.forEach(v => {
    if (v.autoAnalyze && !v.aiScore && !v.aiLoading) {
      checkScore(v._id);
    }
  });
}, [vacancies]);

  // useEffect(() => {
  //   const fetchVacancies = async () => {
  //     try {
  //       if (!userId) {
  //         setError("User not found. Please login again.");
  //         setLoading(false);
  //         return;
  //       }

  //       const res = await fetch("http://localhost:5000/api/hr/vacancies");
  //       const data = await res.json();

  //       // 🔥 ATTACH USER-SPECIFIC AI SCORE (FROM DB)
  //       const enriched = data.map(v => {
  //         const existingScore = v.aiScores?.find(
  //           s => String(s.userId) === String(userId)
  //         );

  //         return {
  //           ...v,
  //           aiScore: existingScore || null, // user-specific
  //           aiLoading: false,
  //           aiError: null
  //         };
  //       });

  //       setVacancies(enriched);
  //     } catch (err) {
  //       console.error(err);
  //       setError("Error loading vacancies");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchVacancies();
  // }, [userId]);

  // ================= CHECK / RECHECK SCORE =================
  // const checkScore = async (vacancyId) => {
  //   setVacancies(prev =>
  //     prev.map(v =>
  //       v._id === vacancyId ? { ...v, aiLoading: true } : v
  //     )
  //   );

  //   try {
  //     const res = await fetch("http://localhost:5000/api/ai/match-score", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ userId, vacancyId })
  //     });

  //     const data = await res.json();

  //     setVacancies(prev =>
  //       prev.map(v =>
  //         v._id === vacancyId
  //           ? { ...v, aiScore: data, aiLoading: false }
  //           : v
  //       )
  //     );
  //   } catch (err) {
  //     setVacancies(prev =>
  //       prev.map(v =>
  //         v._id === vacancyId
  //           ? { ...v, aiError: "AI failed", aiLoading: false }
  //           : v
  //       )
  //     );
  //   }
  // };
const checkScore = async (vacancyId) => {
  console.log("Checking score for:", vacancyId, "user:", userId);

  setVacancies(prev =>
    prev.map(v =>
      v._id === vacancyId ? { ...v, aiLoading: true } : v
    )
  );

  try {
    const res = await fetch("http://localhost:5000/api/ai/match-score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, vacancyId })
    });

    const data = await res.json();
    console.log("AI response:", data);

    setVacancies(prev =>
      prev.map(v =>
        v._id === vacancyId
          ? { ...v, aiScore: data, aiLoading: false }
          : v
      )
    );
  } catch (err) {
    console.error("Check score failed:", err);
    setVacancies(prev =>
      prev.map(v =>
        v._id === vacancyId
          ? { ...v, aiError: "AI failed", aiLoading: false }
          : v
      )
    );
  }
};

  if (loading) return <div className="pt-24 text-center">Loading...</div>;
  if (error)
    return (
      <div className="pt-24 text-center text-red-500">{error}</div>
    );


    return (
      <div
  className={`min-h-screen bg-[#0b1020] px-6 pt-8 text-gray-200
  transition-all duration-300
  ${sidebarOpen ? "ml-60" : "ml-0"}`}
>

  {/* <div className="min-h-screen bg-[#0b1020] px-6 pt-8 ml-64 text-gray-200"> */}

    {/* Page Title */}
    <h2 className="text-2xl font-semibold mb-6">
      {matchedOnly ? "🎯 Matched Jobs for You" : "Recruitment"}
    </h2>

    {/* Jobs Grid */}
    <div className="grid gap-6">
      {vacancies
        .filter(vac =>
          matchedOnly
            ? vac.aiScore && Number(vac.aiScore.score) >= 70
            : true
        )
        .sort((a, b) => {
          const scoreA = a.aiScore?.score ?? -1;
          const scoreB = b.aiScore?.score ?? -1;
          return scoreB - scoreA;
        })
        .map(vac => (
          <div
            key={vac._id}
            className="relative bg-[#11162a] border border-white/10
                       rounded-2xl p-6 shadow-lg hover:shadow-xl
                       transition"
          >

            {/* Match Badge */}
            {vac.aiScore && (
              <span
                className={`absolute top-4 right-4 px-3 py-1 text-sm font-semibold rounded-full
                  ${
                    vac.aiScore.score >= 80
                      ? "bg-green-500/20 text-green-400"
                      : vac.aiScore.score >= 60
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
              >
                {vac.aiScore.score}% Match
              </span>
            )}

            {/* Job Info */}
            <h3 className="text-lg font-semibold text-white">
              {vac.title}
            </h3>

            <p className="text-gray-400 mt-2">
              {vac.jobDescription}
            </p>

            {/* Actions */}
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() => checkScore(vac._id)}
                disabled={vac.aiLoading}
                className="bg-indigo-600 hover:bg-indigo-700
                           disabled:opacity-60
                           text-white px-4 py-2 rounded-lg text-sm transition"
              >
                {vac.aiLoading
                  ? "Analyzing..."
                  : vac.aiScore
                  ? "Re-check Score"
                  : "Check Score"}
              </button>

              {vac.aiScore && vac.aiScore.score >= 70 && (
                <button
                  onClick={() => navigate(`/apply/${vac._id}`)}
                  className="bg-green-600 hover:bg-green-700
                             text-white px-4 py-2 rounded-lg text-sm transition"
                >
                  Apply
                </button>
              )}
            </div>

            {/* AI Result */}
            {vac.aiScore && (
              <div className="mt-5 bg-[#0b1020] border border-white/10
                              rounded-xl p-4 text-sm space-y-2">
                <p>
                  <span className="font-semibold text-gray-300">
                    Score:
                  </span>{" "}
                  {vac.aiScore.score}%
                </p>

                <p>
                  <span className="font-semibold text-gray-300">
                    Matched Skills:
                  </span>{" "}
                  {vac.aiScore.matchedSkills?.join(", ") || "None"}
                </p>

                <p>
                  <span className="font-semibold text-gray-300">
                    Missing Skills:
                  </span>{" "}
                  {vac.aiScore.missingSkills?.join(", ") || "None"}
                </p>

                <p className="pt-2 text-gray-400">
                  <span className="font-semibold text-gray-300">
                    Summary:
                  </span>{" "}
                  {vac.aiScore.summary}
                </p>
              </div>
            )}
          </div>
        ))}
    </div>
  </div>
);


//   return (
//     <div className="p-6 pt-24 bg-gray-50 min-h-screen ml-64">
//       <h2 className="text-2xl font-bold mb-6">
//         {matchedOnly ? "🎯 Matched Jobs for You" : "Recruitment"}
//       </h2>

//       <div className="grid gap-5">
//         {vacancies
//   // ✅ FILTER (matched page or all page)
//   .filter(vac =>
//     matchedOnly
//       ? vac.aiScore && Number(vac.aiScore.score) >= 70
//       : true
//   )

//   // 🔢 SORT BY SCORE (DESC)
//   .sort((a, b) => {
//     const scoreA = a.aiScore?.score ?? -1;
//     const scoreB = b.aiScore?.score ?? -1;
//     return scoreB - scoreA;
//   })

//   .map(vac => (
//  <div
//   key={vac._id}
//   className="bg-white p-5 rounded shadow relative"
// >


// {/* 
// {vacancies
//   .filter(vac =>
//     matchedOnly
//       ? vac.aiScore && Number(vac.aiScore.score) >= 70
//       : true
//   )
//   .map(vac => (
//     <div
//       key={vac._id}
//       className="bg-white p-5 rounded shadow"
//     > */}
//       <h3 className="text-lg font-semibold">{vac.title}</h3>
//       <p className="text-gray-700 mt-1">{vac.description}</p>


// {/* ✅ MATCH BADGE */}
// {vac.aiScore && (
//   <span
//     className={`absolute top-3 right-3 px-3 py-1 text-sm font-semibold rounded-full
//       ${
//         vac.aiScore.score >= 80
//           ? "bg-green-100 text-green-700"
//           : vac.aiScore.score >= 60
//           ? "bg-yellow-100 text-yellow-700"
//           : "bg-red-100 text-red-700"
//       }`}
//   >
//     {vac.aiScore.score}% Match
//   </span>
// )}


// <button
//   onClick={() => checkScore(vac._id)}
//   disabled={vac.aiLoading}
//   className="mt-3 bg-blue-600 text-white px-3 py-1 rounded"
// >
//   {vac.aiLoading
//     ? "Analyzing..."
//     : vac.aiScore
//     ? "Re-check Score"
//     : "Check Score"}
// </button>

// {/* ✅ APPLY BUTTON (only after score exists & matched) */}
// {vac.aiScore && vac.aiScore.score >= 70 && (
//   <button
//     onClick={() => navigate(`/apply/${vac._id}`)}
//     className="mt-3 ml-3 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
//   >
//     Apply
//   </button>
// )}

//       {/* <button
//         onClick={() => checkScore(vac._id)}
//         disabled={vac.aiLoading}
//         className="mt-3 bg-blue-600 text-white px-3 py-1 rounded"
//       >
//         {vac.aiLoading
//           ? "Analyzing..."
//           : vac.aiScore
//           ? "Re-check Score"
//           : "Check Score"}
//       </button> */}

//       {vac.aiScore && (

        
//         <div className="mt-4 p-3 border rounded bg-gray-50">
//           <p><strong>Score:</strong> {vac.aiScore.score}%</p>
//           <p>
//             <strong>Matched Skills:</strong>{" "}
//             {vac.aiScore.matchedSkills?.join(", ") || "None"}
//           </p>
//           <p>
//             <strong>Missing Skills:</strong>{" "}
//             {vac.aiScore.missingSkills?.join(", ") || "None"}
//           </p>
//           <p className="mt-2">
//             <strong>Summary:</strong> {vac.aiScore.summary}
//           </p>
//         </div>
//       )}
//     </div>
//   ))}


        {/* {vacancies
          // ✅ CORE FIX: FILTER BY DB MATCH
          .filter(vac =>
            matchedOnly
              ? vac.aiScores?.some(
                  s => String(s.userId) === String(userId)
                )
              : true
          )
          .map(vac => (
            <div
              key={vac._id}
              className="bg-white p-5 rounded shadow"
            >
              <h3 className="text-lg font-semibold">{vac.title}</h3>
              <p className="text-gray-700 mt-1">
                {vac.description}
              </p>

              <button
                onClick={() => checkScore(vac._id)}
                disabled={vac.aiLoading}
                className="mt-3 bg-blue-600 text-white px-3 py-1 rounded"
              >
                {vac.aiLoading
                  ? "Analyzing..."
                  : vac.aiScore
                  ? "Re-check Score"
                  : "Check Score"}
              </button>

              {/* ✅ AI SCORE DISPLAY */}
              {/* {vac.aiScore && (
                <div className="mt-4 p-3 border rounded bg-gray-50">
                  <p>
                    <strong>Score:</strong>{" "}
                    {vac.aiScore.score}%
                  </p>
                  <p>
                    <strong>Matched Skills:</strong>{" "}
                    {vac.aiScore.matchedSkills?.join(", ") ||
                      "None"}
                  </p>
                  <p>
                    <strong>Missing Skills:</strong>{" "}
                    {vac.aiScore.missingSkills?.join(", ") ||
                      "None"}
                  </p>
                  <p className="mt-2">
                    <strong>Summary:</strong>{" "}
                    {vac.aiScore.summary}
                  </p>
                </div>
              )}
            </divrouter.post("/analyze-initial/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // 🔍 Check if user already has ANY score
    const alreadyAnalyzed = await Vacancy.exists({
      "aiScores.userId": userId
    });

    if (alreadyAnalyzed) {
      return res.json({ message: "Initial analysis already done" });
    }

    // 🎯 Pick only 6 jobs (latest / most relevant)
    const jobs = await Vacancy.find()
      .sort({ createdAt: -1 })
      .limit(6);

    // 🔥 Fire-and-forget (NO await)
    jobs.forEach((job, index) => {
      setTimeout(() => {
        analyzeVacancyForUser(userId, job._id)
          .catch(err =>
            console.error("Initial analysis error:", err.message)
          );
      }, index * 3000); // 3s gap (safe for Gemini)
    });

    res.json({
      message: "Initial resume analysis started",
      jobsQueued: jobs.length
    });
  } catch (err) {
    console.error("Initial analysis failed:", err);
    res.status(500).json({ message: "Initial analysis failed" });
  }
});
>
          ))}  */}
//       </div>
//     </div>
//   );
// }
}

// import { useEffect, useState } from "react";

// export default function HrDashboard() {
//   const [vacancies, setVacancies] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     location: "",
//     salary: "",
//   });

//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = user?.token; // assuming token stored on login

//   useEffect(() => {
//     // Fetch existing vacancies
//     fetch("http://localhost:5000/api/hr/vacancies")
//       .then((res) => res.json())
//       .then((data) => setVacancies(data))
//       .catch((err) => console.error(err));
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:5000/api/hr/vacancies", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert("Vacancy posted successfully!");
//         setVacancies([data.vacancy, ...vacancies]);
//         setForm({ title: "", description: "", location: "", salary: "" });
//       } else {
//         alert(data.message);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to post vacancy");
//     }
//   };

//   return (
//     <div className="p-6 pt-24 bg-gray-50 min-h-screen">
//       <h2 className="text-2xl font-bold mb-6">HR Dashboard</h2>

//       {/* Post Vacancy Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-lg shadow max-w-lg space-y-4 mb-8"
//       >
//         <h3 className="text-lg font-semibold">Post New Vacancy</h3>

//         <input
//           type="text"
//           name="title"
//           value={form.title}
//           onChange={handleChange}
//           placeholder="Job Title"
//           className="w-full border px-3 py-2 rounded"
//           required
//         />

//         <textarea
//           name="description"
//           value={form.description}
//           onChange={handleChange}
//           placeholder="Job Description"
//           className="w-full border px-3 py-2 rounded"
//           required
//         />

//         <input
//           type="text"
//           name="location"
//           value={form.location}
//           onChange={handleChange}
//           placeholder="Location"
//           className="w-full border px-3 py-2 rounded"
//         />

//         <input
//           type="text"
//           name="salary"
//           value={form.salary}
//           onChange={handleChange}
//           placeholder="Salary"
//           className="w-full border px-3 py-2 rounded"
//         />

//         <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
//           Post Vacancy
//         </button>
//       </form>

//       {/* Existing Vacancies */}
//       <div className="grid gap-4">
//         {vacancies.map((vacancy) => (
//           <div key={vacancy._id} className="bg-white p-4 rounded shadow">
//             <h4 className="font-semibold">{vacancy.title}</h4>
//             <p>{vacancy.description}</p>
//             <p className="text-sm text-gray-500">
//               Location: {vacancy.location || "N/A"} | Salary: {vacancy.salary || "N/A"}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




// import { useState, useEffect } from "react";
// import Topbar from "./Topbar";

// export default function HRDashboard() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [location, setLocation] = useState("");
//   const [salary, setSalary] = useState("");
//   const [vacancies, setVacancies] = useState([]);
//   const [message, setMessage] = useState("");

//   // Fetch existing vacancies
//   useEffect(() => {
//     fetch("http://localhost:5000/api/hr/vacancies")
//       .then((res) => res.json())
//       .then((data) => setVacancies(data))
//       .catch((err) => console.error(err));
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     const res = await fetch("http://localhost:5000/api/hr/vacancies", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${user.token}`, // send token
//       },
//       body: JSON.stringify({ title, description, location, salary }),
//     });

//     const data = await res.json();
//     if (res.ok) {
//       setMessage("Vacancy posted successfully!");
//       setVacancies([data.vacancy, ...vacancies]); // update local list
//       setTitle("");
//       setDescription("");
//       setLocation("");
//       setSalary("");
//     } else {
//       setMessage(data.message || "Error posting vacancy");
//     }
//   };

//   return (
//     <div className="p-6 pt-24 bg-gray-50 min-h-screen space-y-6">
//       <Topbar />

//       <div className="bg-white p-6 rounded shadow-md max-w-lg mx-auto">
//         <h2 className="text-2xl font-bold mb-4">Post a New Vacancy</h2>

//         {message && <p className="text-green-600 mb-2">{message}</p>}

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Job Title"
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Job Description"
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             placeholder="Location"
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             value={salary}
//             onChange={(e) => setSalary(e.target.value)}
//             placeholder="Salary"
//             className="w-full border px-3 py-2 rounded"
//             required
//           />

//           <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
//             Post Vacancy
//           </button>
//         </form>
//       </div>

//       <div className="bg-white p-6 rounded shadow-md max-w-3xl mx-auto">
//         <h2 className="text-xl font-semibold mb-4">Existing Vacancies</h2>
//         {vacancies.length === 0 ? (
//           <p className="text-gray-500">No vacancies posted yet.</p>
//         ) : (
//           <ul className="space-y-2">
//             {vacancies.map((vac) => (
//               <li
//                 key={vac._id || vac.title}
//                 className="border p-3 rounded flex justify-between"
//               >
//                 <div>
//                   <h3 className="font-semibold">{vac.title}</h3>
//                   <p>{vac.description}</p>
//                   <p className="text-sm text-gray-500">
//                     {vac.location} • {vac.salary}
//                   </p>
//                 </div>
//                 <div className="text-sm text-gray-400">
//                   Posted by: {vac.createdBy?.name || "HR Admin"}
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }




// import { useState, useEffect } from "react";
// import Topbar from "./Topbar";

// export default function HRDashboard() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [location, setLocation] = useState("");
//   const [salary, setSalary] = useState("");
//   const [vacancies, setVacancies] = useState([]);
//   const [message, setMessage] = useState("");

//   // Fetch existing vacancies
//   useEffect(() => {
//     fetch("http://localhost:5000/api/hr/vacancies")
//       .then((res) => res.json())
//       .then((data) => setVacancies(data))
//       .catch((err) => console.error(err));
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     const res = await fetch("http://localhost:5000/api/hr/vacancies", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         // Removed Authorization since login is static
//       },
//       body: JSON.stringify({ title, description, location, salary }),
//     });

//     const data = await res.json();
//     if (res.ok) {
//       setMessage("Vacancy posted successfully!");
//       setVacancies([data.vacancy, ...vacancies]);
//       setTitle("");
//       setDescription("");
//       setLocation("");
//       setSalary("");
//     } else {
//       setMessage(data.message || "Error posting vacancy");
//     }
//   };

//   return (
//     <div className="p-6 pt-24 bg-gray-50 min-h-screen space-y-6">
//       <Topbar />

//       <div className="bg-white p-6 rounded shadow-md max-w-lg mx-auto">
//         <h2 className="text-2xl font-bold mb-4">Post a New Vacancy</h2>

//         {message && <p className="text-green-600 mb-2">{message}</p>}

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Job Title"
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Job Description"
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             placeholder="Location"
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             value={salary}
//             onChange={(e) => setSalary(e.target.value)}
//             placeholder="Salary"
//             className="w-full border px-3 py-2 rounded"
//             required
//           />

//           <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
//             Post Vacancy
//           </button>
//         </form>
//       </div>

//       <div className="bg-white p-6 rounded shadow-md max-w-3xl mx-auto">
//         <h2 className="text-xl font-semibold mb-4">Existing Vacancies</h2>
//         {vacancies.length === 0 ? (
//           <p className="text-gray-500">No vacancies posted yet.</p>
//         ) : (
//           <ul className="space-y-2">
//             {vacancies.map((vac) => (
//               <li
//                 key={vac._id || vac.title}
//                 className="border p-3 rounded flex justify-between"
//               >
//                 <div>
//                   <h3 className="font-semibold">{vac.title}</h3>
//                   <p>{vac.description}</p>
//                   <p className="text-sm text-gray-500">
//                     {vac.location} • {vac.salary}
//                   </p>
//                 </div>
//                 <div className="text-sm text-gray-400">
//                   Posted by: {vac.createdBy?.name || "HR Admin"}
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }


import HRChatbot from "./HRChatbot";

import { useState, useEffect } from "react";
import Topbar from "./Topbar";

export default function HRDashboard() {
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState("");

  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [vacancies, setVacancies] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch vacancies safely
  const fetchVacancies = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/hr/vacancies");
      const data = await res.json();
      // Ensure data is always an array
      setVacancies(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch vacancies:", err);
      setVacancies([]);
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, []);



  const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");

  const skillsArray = skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  try {
    const res = await fetch("http://localhost:5000/api/hr/vacancies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        location,
        salary,
        skills: skillsArray, // ✅ SEND SKILLS
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Vacancy posted successfully!");
      setVacancies((prev) => [data.vacancy, ...prev]);

      setTitle("");
      setDescription("");
      setLocation("");
      setSalary("");
      setSkills("");
    } else {
      setMessage(data.message || "Error posting vacancy");
    }
  } catch (err) {
    console.error("Error posting vacancy:", err);
    setMessage("Server error while posting vacancy");
  }
};


  // Handle new vacancy submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setMessage("");

  //   try {
  //     const res = await fetch("http://localhost:5000/api/hr/vacancies", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ title, description, location, salary }),
  //     });

  //     const data = await res.json();

  //     if (res.ok) {
  //       setMessage("Vacancy posted successfully!");
  //       // Prepend the new vacancy to the existing list safely
  //       setVacancies((prev) => [data.vacancy, ...prev]);
  //       setTitle("");
  //       setDescription("");
  //       setLocation("");
  //       setSalary("");
  //     } else {
  //       setMessage(data.message || "Error posting vacancy");
  //     }
  //   } catch (err) {
  //     console.error("Error posting vacancy:", err);
  //     setMessage("Server error while posting vacancy");
  //   }
  // };

  return (
    <div className="p-6 pt-24 bg-gray-50 min-h-screen space-y-6">
      <Topbar />

      {/* Post Vacancy Form */}
      <div className="bg-white p-6 rounded shadow-md max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4">Post a New Vacancy</h2>

        {message && <p className="text-green-600 mb-2">{message}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Job Title"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Job Description"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="Salary"
            className="w-full border px-3 py-2 rounded"
            required
          />
<input
  type="text"
  value={skills}
  onChange={(e) => setSkills(e.target.value)}
  placeholder="Skills (comma separated e.g. React, Node, MongoDB)"
  className="w-full border px-3 py-2 rounded"
  required
/>

          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Post Vacancy
          </button>
        </form>
      </div>

      {/* Existing Vacancies */}
      <div className="bg-white p-6 rounded shadow-md max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Existing Vacancies</h2>

        {Array.isArray(vacancies) && vacancies.length > 0 ? (
          <ul className="space-y-2">
            {vacancies.map((vac) => (
              <li
                key={vac._id || vac.title}
                className="border p-3 rounded flex justify-between"
              >
                <div>
                  <h3 className="font-semibold">{vac.title}</h3>
                  <p>{vac.description}</p>
                  <p className="text-sm text-gray-500">
                    {vac.location} • {vac.salary}
                  </p>
                </div>
                <div className="text-sm text-gray-400">
                  Posted by: {vac.createdBy?.name || "HR Admin"}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No vacancies posted yet.</p>
        )}
      </div>
        <HRChatbot />
    </div>
    
  );
}

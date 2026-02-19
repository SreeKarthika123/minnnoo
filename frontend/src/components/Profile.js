// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Profile() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const navigate = useNavigate();

//   const [profile, setProfile] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     designation: "",
//     resume: null,
//   });

//   const [resumeFile, setResumeFile] = useState(null);


//   useEffect(() => {
//   if (!user) return navigate("/login");

//   fetch(`http://localhost:5000/api/auth/profile/${user.id}`)
//     .then((res) => res.json())
//     .then((data) =>
//       setProfile((prev) => ({
//         ...prev,
//         name: data.name || "",
//         email: data.email || "",
//         phone: data.phone || "",
//         designation: data.designation || "",
//         resume: data.resume || null,
//       }))
//     )
//     .catch((err) => console.error(err));
// }, [user, navigate]);

// //   useEffect(() => {
// //     if (!user) return navigate("/login");

// //     fetch(`http://localhost:5000/api/auth/profile/${user.id}`)
// //       .then((res) => res.json())
// //       .then((data) => setProfile(data))
// //       .catch((err) => console.error(err));
// //   }, [user, navigate]);

//   const handleChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setResumeFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("name", profile.name);
//     formData.append("phone", profile.phone || "");
//     formData.append("designation", profile.designation || "");
//     if (resumeFile) formData.append("resume", resumeFile);

//     const res = await fetch(`http://localhost:5000/api/auth/profile/${user.id}`, {
//       method: "PUT",
//       body: formData,
//     });

//     const data = await res.json();
//     if (res.ok) {
//       alert("Profile updated successfully");
//       setProfile(data.user);
//     } else {
//       alert(data.message);
//     }
//   };

//   return (
//     <div className="p-6 pt-24 bg-gray-50 min-h-screen">
//       <h2 className="text-2xl font-bold mb-6">My Profile</h2>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-lg shadow max-w-lg space-y-4"
//       >
//         <div>
//           <label className="block mb-1 font-semibold">Full Name</label>
//           <input
//             type="text"
//             name="name"
//             value={profile.name || ""}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-semibold">Email</label>
//           <input
//             type="email"
//             value={profile.email || ""}
//             disabled
//             className="w-full border px-3 py-2 rounded bg-gray-100"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-semibold">Phone</label>
//           <input
//             type="text"
//             name="phone"
//             value={profile.phone || ""}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-semibold">Designation</label>
//           <input
//             type="text"
//             name="designation"
//             value={profile.designation || ""}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-semibold">Resume</label>
//           <input type="file" onChange={handleFileChange} />
//           {profile.resume && (
//             <p className="text-sm text-gray-500 mt-1">
//               Current:{" "}
//               <a
//                 href={`http://localhost:5000${profile.resume}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 underline"
//               >
//                 View Resume
//               </a>
//             </p>
//           )}
//         </div>

//         <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Profile() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const navigate = useNavigate();

//   const [profile, setProfile] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     designation: "",
//     resume: null,
//   });

//   const [resumeFile, setResumeFile] = useState(null);


//   useEffect(() => {
//   if (!user) return navigate("/login");

//   const fetchProfile = async () => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/auth/profile/${user.id}`);
//       const data = await res.json();
//       setProfile({
//         name: data.name || "",
//         email: data.email || "",
//         phone: data.phone || "",
//         designation: data.designation || "",
//         resume: data.resume || null,
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   fetchProfile();
// }, []); // <-- only run once, NOT on every render

// //   useEffect(() => {
// //     if (!user) return navigate("/login");

// //     fetch(`http://localhost:5000/api/auth/profile/${user.id}`)
// //       .then((res) => res.json())
// //       .then((data) =>
// //         setProfile({
// //           name: data.name || "",
// //           email: data.email || "",
// //           phone: data.phone || "",
// //           designation: data.designation || "",
// //           resume: data.resume || null,
// //         })
// //       )
// //       .catch((err) => console.error(err));
// //   }, [user, navigate]);

//   const handleChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setResumeFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("name", profile.name);
//     formData.append("phone", profile.phone);
//     formData.append("designation", profile.designation);
//     if (resumeFile) formData.append("resume", resumeFile);

//     const res = await fetch(`http://localhost:5000/api/auth/profile/${user.id}`, {
//       method: "PUT",
//       body: formData,
//     });

//     const data = await res.json();
//     if (res.ok) {
//       alert("Profile updated successfully");
//       setProfile({
//         ...profile,
//         resume: data.user.resume || profile.resume,
//       });
//     } else {
//       alert(data.message);
//     }
//   };

//   return (
//     <div className="p-6 pt-24 bg-gray-50 min-h-screen">
//       <h2 className="text-2xl font-bold mb-6">My Profile</h2>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-lg shadow max-w-lg space-y-4"
//       >
//         <input
//           type="text"
//           name="name"
//           value={profile.name}
//           onChange={handleChange}
//           placeholder="Full Name"
//           className="w-full border px-3 py-2 rounded"
//         />

//         <input
//           type="email"
//           value={profile.email}
//           disabled
//           className="w-full border px-3 py-2 rounded bg-gray-100"
//         />

//         <input
//           type="text"
//           name="phone"
//           value={profile.phone}
//           onChange={handleChange}
//           placeholder="Phone"
//           className="w-full border px-3 py-2 rounded"
//         />

//         <input
//           type="text"
//           name="designation"
//           value={profile.designation}
//           onChange={handleChange}
//           placeholder="Designation"
//           className="w-full border px-3 py-2 rounded"
//         />

//         <div>
//           <input type="file" onChange={handleFileChange} />
//           {profile.resume && (
//             <p className="text-sm text-gray-500 mt-1">
//               Current:{" "}
//               <a
//                 href={`http://localhost:5000${profile.resume}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 underline"
//               >
//                 View Resume
//               </a>
//             </p>
//           )}
//         </div>

//         <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Profile() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const navigate = useNavigate();

//   // State for profile fields
//   const [profile, setProfile] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     designation: "",
//     skills: "",
//     resume: null,
//   });

//   const [resumeFile, setResumeFile] = useState(null);

//   // Fetch profile on mount
// //   useEffect(() => {
// //     if (!user) return navigate("/login");

// //     fetch(`http://localhost:5000/api/auth/profile/${user.id}`)
// //       .then((res) => res.json())
// //       .then((data) =>
// //         setProfile({
// //           name: data.name || "",
// //           email: data.email || "",
// //           phone: data.phone || "",
// //           designation: data.designation || "",
// //           skills: data.skills || "",
// //           resume: data.resume || null,
// //         })
// //       )
// //       .catch((err) => console.error(err));
// //   }, [user, navigate]);


// useEffect(() => {
//   if (!user) return navigate("/login");

//   // Fetch profile only once
//   const fetchProfile = async () => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/auth/profile/${user.id}`);
//       const data = await res.json();

//       setProfile({
//         name: data.name || "",
//         email: data.email || "",
//         phone: data.phone || "",
//         designation: data.designation || "",
//         skills: data.skills || "",
//         resume: data.resume || null,
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   fetchProfile();
// }, []); // <-- empty dependency array to run only once


//   // Handle text input changes
//   const handleChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   // Handle file input
//   const handleFileChange = (e) => {
//     setResumeFile(e.target.files[0]);
//   };

//   // Submit updated profile
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("name", profile.name);
//     formData.append("phone", profile.phone);
//     formData.append("designation", profile.designation);
//     formData.append("skills", profile.skills);
//     if (resumeFile) formData.append("resume", resumeFile);

//     try {
//       const res = await fetch(`http://localhost:5000/api/auth/profile/${user.id}`, {
//         method: "PUT",
//         body: formData,
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert("Profile updated successfully");
//         setProfile((prev) => ({
//           ...prev,
//           resume: data.user.resume || prev.resume,
//         }));
//       } else {
//         alert(data.message);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update profile");
//     }
//   };

//   return (
//     <div className="p-6 pt-24 bg-gray-50 min-h-screen">
//       <h2 className="text-2xl font-bold mb-6">My Profile</h2>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-lg shadow max-w-lg space-y-4"
//       >
//         {/* Name */}
//         <div>
//           <label className="block mb-1 font-semibold">Full Name</label>
//           <input
//             type="text"
//             name="name"
//             value={profile.name}
//             onChange={handleChange}
//             placeholder="Full Name"
//             className="w-full border px-3 py-2 rounded"
//           />
//         </div>

//         {/* Email */}
//         <div>
//           <label className="block mb-1 font-semibold">Email</label>
//           <input
//             type="email"
//             value={profile.email}
//             disabled
//             className="w-full border px-3 py-2 rounded bg-gray-100"
//           />
//         </div>

//         {/* Phone */}
//         <div>
//           <label className="block mb-1 font-semibold">Phone</label>
//           <input
//             type="text"
//             name="phone"
//             value={profile.phone}
//             onChange={handleChange}
//             placeholder="Phone"
//             className="w-full border px-3 py-2 rounded"
//           />
//         </div>

//         {/* Designation */}
//         <div>
//           <label className="block mb-1 font-semibold">Designation</label>
//           <input
//             type="text"
//             name="designation"
//             value={profile.designation}
//             onChange={handleChange}
//             placeholder="Designation"
//             className="w-full border px-3 py-2 rounded"
//           />
//         </div>

//         {/* Skills */}
//         <div>
//           <label className="block mb-1 font-semibold">Skills</label>
//           <input
//             type="text"
//             name="skills"
//             value={profile.skills}
//             onChange={handleChange}
//             placeholder="E.g., React, Node.js, MongoDB"
//             className="w-full border px-3 py-2 rounded"
//           />
//           <p className="text-sm text-gray-500 mt-1">
//             Separate skills with commas
//           </p>
//         </div>

//         {/* Resume */}
//         <div>
//           <label className="block mb-1 font-semibold">Resume</label>
//           <input type="file" onChange={handleFileChange} />
//           {profile.resume && (
//             <p className="text-sm text-gray-500 mt-1">
//               Current:{" "}
//               <a
//                 href={`http://localhost:5000${profile.resume}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 underline"
//               >
//                 View Resume
//               </a>
//             </p>
//           )}
//         </div>

//         {/* Submit */}
//         <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
const [isAnalyzing, setIsAnalyzing] = useState(false);
const [atsAnalyzed, setAtsAnalyzed] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    skills: [],
    resume: null,
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [skillInput, setSkillInput] = useState("");

  


// useEffect(() => {
//   if (!user) return navigate("/login");

//   // Fetch profile only once
//   const fetchProfile = async () => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/auth/profile/${user.id}`);
//       const data = await res.json();

//       setProfile({
//         name: data.name || "",
//         email: data.email || "",
//         phone: data.phone || "",
//         designation: data.designation || "",
//         skills: data.skills || "",
//         resume: data.resume || null,
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   fetchProfile();
// }, []); 




useEffect(() => {
  if (!user) return navigate("/login");

  const fetchProfile = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/profile/${user.id}`
      );
      const data = await res.json();

      setProfile(prev => ({
        ...prev,
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        designation: data.designation || "",
        skills: data.skills || [],
        resume: data.resume || null,
      }));

      setAtsAnalyzed(data.atsAnalyzed); // ✅ ADD HERE

    } catch (err) {
      console.error(err);
    }
  };

  fetchProfile();
}, []);

// const handleAnalyze = async () => {
//   try {
//     setIsAnalyzing(true);

//     await fetch(
//       `http://localhost:5000/api/ats/analyze-all/${user.id}`,
//       { method: "POST" }
//     );

//     alert("Resume analysis Completed");
//     navigate("/dashboard");
//   } catch (err) {
//     console.error(err);
//     alert("Failed to start analysis");
//   } finally {
//     setIsAnalyzing(false);
//   }
// };


const handleAnalyze = async () => {
  try {
    setIsAnalyzing(true);

    await fetch(
      `http://localhost:5000/api/ats/analyze-all/${user.id}`,
      { method: "POST" }
    );

    setAtsAnalyzed(true); // ✅ disable button
    alert("Resume analysis completed 🎯");
  } catch (err) {
    console.error(err);
    alert("Failed to analyze resume");
  } finally {
    setIsAnalyzing(false);
  }
};

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // const handleFileChange = (e) => {
  //   setResumeFile(e.target.files[0]);
  // };

  const handleFileChange = (e) => {
  setResumeFile(e.target.files[0]);
  setAtsAnalyzed(false); // 🔥 resume changed → allow analyze again
};


  const handleSkillKey = (e) => {
    if (e.key === "Enter" && skillInput.trim() !== "") {
      e.preventDefault();
      if (!profile.skills.includes(skillInput.trim())) {
        setProfile({ ...profile, skills: [...profile.skills, skillInput.trim()] });
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => {
    setProfile({ ...profile, skills: profile.skills.filter((s) => s !== skill) });
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", profile.name);
  formData.append("phone", profile.phone);
  formData.append("designation", profile.designation);
  formData.append("skills", JSON.stringify(profile.skills));

  const isNewResume = !!resumeFile;
  if (resumeFile) formData.append("resume", resumeFile);

  try {
    const res = await fetch(
      `http://localhost:5000/api/auth/profile/${user.id}`,
      {
        method: "PUT",
        body: formData
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to update profile");
      return;
    }

    // setProfile(prev => ({
    //   ...prev,
    //   resume: data.user.resume || prev.resume
    // }));


    setProfile(prev => ({
  ...prev,
  name: data.user.name || prev.name,
  email: data.user.email || prev.email,
  phone: data.user.phone || prev.phone,
  designation: data.user.designation || prev.designation,
  skills: data.user.skills || prev.skills,
  resume: data.user.resume || prev.resume
}));
setAtsAnalyzed(data.user.atsAnalyzed);

// setAtsAnalyzed(data.user.atsAnalyzed); // ✅ ADD HERE

    // // 🔥 AUTO ANALYZE AFTER RESUME UPLOAD
    // if (isNewResume) {
    //   await fetch(
    //     `http://localhost:5000/api/ai/analyze-all/${user.id}`,
    //     { method: "POST" }
    //   );
    // }
    alert("Profile updated successfully ✅");
// navigate("/dashboard");


    // alert("Profile updated & jobs analyzed 🎯");
  } catch (err) {
    console.error(err);
    alert("Error updating profile");
  }
};



return (
  <div className="min-h-screen bg-[#0b1020] flex justify-center items-center px-4">
    <div className="w-full max-w-xl">

      {/* Title */}
      <h2 className="text-2xl font-semibold text-white mb-6 text-center">
        My Profile
      </h2>

      {/* Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#11162a] border border-white/10
                   rounded-2xl p-6 space-y-5 shadow-xl"
      >
        {/* Name */}
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full bg-[#0b1020] text-gray-200
                     border border-white/10 rounded-lg px-4 py-2
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        />

        {/* Email */}
        <input
          type="email"
          value={profile.email}
          disabled
          className="w-full bg-[#0b1020] text-gray-400
                     border border-white/10 rounded-lg px-4 py-2 cursor-not-allowed"
        />

        {/* Phone */}
        <input
          type="text"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full bg-[#0b1020] text-gray-200
                     border border-white/10 rounded-lg px-4 py-2"
        />

        {/* Designation */}
        <input
          type="text"
          name="designation"
          value={profile.designation}
          onChange={handleChange}
          placeholder="Designation"
          className="w-full bg-[#0b1020] text-gray-200
                     border border-white/10 rounded-lg px-4 py-2"
        />

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Skills
          </label>

          <div className="flex flex-wrap gap-2 mb-3">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="bg-indigo-500/20 text-indigo-300
                           px-3 py-1 rounded-full text-sm
                           flex items-center gap-2"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-red-400 hover:text-red-500 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleSkillKey}
            placeholder="Type a skill and press Enter"
            className="w-full bg-[#0b1020] text-gray-200
                       border border-white/10 rounded-lg px-4 py-2"
          />
        </div>

        {/* Resume */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Resume
          </label>

        

        </div>


  <input
            type="file"
            onChange={handleFileChange}
            className="text-sm text-gray-400"
          />


                <a
        href={`http://localhost:5000${profile.resume}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-indigo-400 hover:text-indigo-300
                   text-sm underline"
      >
        View Resume
      </a>


        {profile.resume && (
  <button
    type="button"
    onClick={handleAnalyze}
    disabled={isAnalyzing || atsAnalyzed}
    className={`w-full font-medium py-2 rounded-lg transition
      ${
        atsAnalyzed
          ? "bg-gray-600 cursor-not-allowed"
          : "bg-green-600 hover:bg-green-700"
      }`}
  >
    {isAnalyzing
      ? "Analyzing Resume..."
      : atsAnalyzed
      ? "Resume Already Analyzed"
      : "Analyze Resume"}
  </button>
)}


        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700
                     text-white font-medium py-2 rounded-lg
                     transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  </div>
);

}

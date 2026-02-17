
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SuccessModal from "../components/SuccessModal";

const LOCATIONS = [
  "Hyderabad, India", "Mumbai, India", "Gurgaon, India",
  "New Delhi, India", "Bengaluru, India", "Singapore",
  "Dubai, UAE", "Kuala Lumpur, Malaysia", "Jakarta, Indonesia",
  "Ho Chi Minh City, Vietnam", "San Mateo, California, USA"
];

const EMP_TYPES = ["Full Time", "Intern", "Contract", "Part Time"];
const COMPANIES = ["	Darwinbox Digital Solutions Pvt Ltd", "PT Darwinbox Digital Solutions"];

export default function CreateJob() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const defaultDept = params.get("department");

  const [title, setJobTitle] = useState("");
  const [company, setCompany] = useState(COMPANIES[0]);
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [jobDescription, setJobDescription] = useState("");
  const [department] = useState(defaultDept || "");
  const [expiresOn, setExpiresOn] = useState("");
  const [experienceMin, setExperienceMin] = useState(0);
  const [experienceMax, setExperienceMax] = useState(5);
  const [l1Department, setL1Department] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  function handleCheckboxChange(type) {
    setEmployeeTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  }

  async function submit(e) {
    e.preventDefault();
    setError("");

    const payload = {
      title,
      company,
      location,
      employeeTypes,
      department,
      l1Department,
      jobDescription,
      // description,
      experienceMin,
      experienceMax,
      expiresOn
    };

    try {
      const res = await fetch("http://localhost:5000/api/hr/vacancies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to save vacancy");
      }

      // ✅ SUCCESS
      setSuccess(true);

    } catch (err) {
      console.error(err);
      setError("Failed to save job. Please try again.");
    }
  }

  return (
  <>
    {/* Header */}
    <header className="flex items-center gap-4 px-8 py-5 
                       bg-gray-900 border-b border-blue-500/20
                       text-white">
      <button
        type="button"
        onClick={() => navigate("/home")}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700
                   rounded-lg transition"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold text-blue-500">
        Create Job Vacancy
      </h1>
    </header>

    {/* Main */}
    <main className="min-h-screen 
                     bg-gradient-to-br from-black via-gray-950 to-blue-950
                     flex justify-center py-12 px-6">

      <form
        onSubmit={submit}
        className="w-full max-w-2xl
                   bg-gray-900/60 backdrop-blur-lg
                   border border-blue-500/20
                   rounded-2xl shadow-2xl
                   p-8 space-y-6 text-white"
      >

        {error && (
          <p className="text-red-400 font-medium">{error}</p>
        )}

        {/* Job Title */}
        <section>
          <h2 className="text-blue-400 font-semibold mb-2">Job Title</h2>
          <input
            value={title}
            onChange={e => setJobTitle(e.target.value)}
            required
            className="w-full bg-gray-800 border border-blue-500/20
                       rounded-lg px-4 py-3 text-white
                       focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </section>

        {/* Company */}
        <section>
          <h2 className="text-blue-400 font-semibold mb-3">Company Name</h2>
          <div className="flex gap-6 flex-wrap">
            {COMPANIES.map(c => (
              <label
                key={c}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  checked={company === c}
                  onChange={() => setCompany(c)}
                  className="accent-blue-600"
                />
                <span className="text-gray-300">{c}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Location */}
        <section>
          <h2 className="text-blue-400 font-semibold mb-2">Location</h2>
          <select
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="w-full bg-gray-800 border border-blue-500/20
                       rounded-lg px-4 py-3 text-white
                       focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {LOCATIONS.map(l => (
              <option key={l} className="bg-gray-900">
                {l}
              </option>
            ))}
          </select>
        </section>

        {/* Employee Type */}
        <section>
          <h2 className="text-blue-400 font-semibold mb-3">Employee Type</h2>
          <div className="flex flex-wrap gap-3">
            {EMP_TYPES.map(t => (
              <button
                type="button"
                key={t}
                onClick={() => handleCheckboxChange(t)}
                className={`px-4 py-2 rounded-full border transition ${
                  employeeTypes.includes(t)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-800 text-gray-400 border-blue-500/20 hover:bg-blue-900/40"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </section>

        {/* Department */}
        <section>
          <h2 className="text-blue-400 font-semibold mb-2">Department</h2>
          <input
            value={department}
            disabled
            className="w-full bg-gray-800 border border-blue-500/20
                       rounded-lg px-4 py-3 text-gray-400 cursor-not-allowed"
          />
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-blue-400 font-semibold mb-3">
            Experience Range (Years)
          </h2>

          <div className="flex gap-6">
            <input
              type="number"
              value={experienceMin}
              onChange={e => setExperienceMin(e.target.value)}
              required
              className="w-1/2 bg-gray-800 border border-blue-500/20
                         rounded-lg px-4 py-3 text-white
                         focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="number"
              value={experienceMax}
              onChange={e => setExperienceMax(e.target.value)}
              required
              className="w-1/2 bg-gray-800 border border-blue-500/20
                         rounded-lg px-4 py-3 text-white
                         focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </section>
{/* Job Description */}
<section>
  <h2 className="text-blue-400 font-semibold mb-2">
    Job Description
  </h2>

  <textarea
    value={jobDescription}
    onChange={e => setJobDescription(e.target.value)}
    rows={6}
    required
    placeholder="Enter detailed job responsibilities, requirements, skills, etc..."
    className="w-full bg-gray-800 border border-blue-500/20
               rounded-lg px-4 py-3 text-white
               focus:ring-2 focus:ring-blue-500 outline-none
               resize-none"
  />
</section>

        {/* L1 Department */}
        <section>
          <h2 className="text-blue-400 font-semibold mb-2">L1 Department</h2>
          <input
            value={l1Department}
            onChange={e => setL1Department(e.target.value)}
            className="w-full bg-gray-800 border border-blue-500/20
                       rounded-lg px-4 py-3 text-white
                       focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </section>

        {/* Expiry */}
        <section>
          <h2 className="text-blue-400 font-semibold mb-2">Expires On</h2>
          <input
            type="date"
            value={expiresOn}
            min={today}
            onChange={e => setExpiresOn(e.target.value)}
            required
            className="w-full bg-gray-800 border border-blue-500/20
                       rounded-lg px-4 py-3 text-white
                       focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </section>

        {/* Submit */}
        <button
          className="w-full bg-blue-600 hover:bg-blue-700
                     py-3 rounded-lg font-semibold
                     transition-all duration-300
                     shadow-lg hover:shadow-blue-500/40"
        >
          Publish Job
        </button>

      </form>
    </main>

    {success && (
      <SuccessModal
        onClose={() => {
          setSuccess(false);
          navigate("/home");
        }}
      />
    )}
  </>
);
}
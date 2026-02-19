import { useEffect, useState } from "react";

export default function TopEmployeesHR() {
  const [vacancies, setVacancies] = useState([]);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/hr/vacancies")
      .then(res => res.json())
      .then(setVacancies);
  }, []);

  const fetchTopEmployees = async (vacancyId) => {
    setLoading(true);
    const res = await fetch(
      `http://localhost:5000/api/vacancies/${vacancyId}/top-employees`
    );
    const data = await res.json();
    setEmployees(data);
    setSelectedVacancy(vacancyId);
    setLoading(false);
  };

  const notifyEmployee = async (userId) => {
    await fetch("http://localhost:5000/api/notifications/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        vacancyId: selectedVacancy
      })
    });

    alert("Notification sent 🚀");
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-xl font-bold mb-4">Top Employees</h2>

      {/* Vacancy selector */}
      <select
        onChange={(e) => fetchTopEmployees(e.target.value)}
        className="bg-black border p-2 mb-6"
      >
        <option>Select Vacancy</option>
        {vacancies.map(v => (
          <option key={v._id} value={v._id}>
            {v.title}
          </option>
        ))}
      </select>

      {loading && <p>Loading...</p>}

      {/* Employees */}
      {employees.map((e, index) => (
        <div
          key={e.user._id}
          className="bg-[#111] border p-4 rounded mb-4"
        >
          <h3 className="font-semibold">
            #{index + 1} {e.user.name}
          </h3>

          <p>ATS: {e.atsScore}</p>
          {e.aiScore && <p>AI: {e.aiScore}</p>}

          <button
            onClick={() => notifyEmployee(e.user._id)}
            className="mt-2 bg-blue-600 px-3 py-1 rounded"
          >
            Notify to Apply
          </button>
        </div>
      ))}
    </div>
  );
}

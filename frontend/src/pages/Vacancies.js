import { useEffect, useState } from "react";

export default function Vacancies() {
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/hr/vacancies")
      .then((res) => res.json())
      .then((data) => setVacancies(Array.isArray(data) ? data : []))
      .catch(() => setVacancies([]));
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-blue-400">
        Available Vacancies
      </h2>

      {vacancies.length > 0 ? (
        <div className="space-y-4">
          {vacancies.map((vac) => (
            <div
              key={vac._id}
              className="bg-gray-900 border border-blue-500/20 
                         rounded-xl p-6 
                         hover:border-blue-500/50
                         transition-all"
            >
              <h3 className="text-lg font-semibold text-blue-400">
                {vac.title}
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                {vac.company} • {vac.location}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-900 border border-blue-500/20 rounded-xl p-10 text-center">
          <p className="text-gray-500 text-lg">
            No vacancies posted yet.
          </p>
        </div>
      )}
    </div>
  );
}

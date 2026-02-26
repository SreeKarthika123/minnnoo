import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebarhr from "../components/Sidebarhr";
import HrTopbar from "../components/HrTopbar";
import { ChevronLeft, CheckCircle2, XCircle, Clock } from "lucide-react";

const HIGH_MATCH = 37;
const MEDIUM_MATCH = 34;

function getMatchLevel(ats, ai) {
  const score = ats ?? ai;
  if (score >= HIGH_MATCH) return { label: "HIGH", bg: "#ecfdf5", text: "#059669", border: "#a7f3d0", dot: "#10b981" };
  if (score >= MEDIUM_MATCH) return { label: "MEDIUM", bg: "#fffbeb", text: "#d97706", border: "#fde68a", dot: "#f59e0b" };
  return { label: "LOW", bg: "#fff1f2", text: "#e11d48", border: "#fecdd3", dot: "#f43f5e" };
}

function getStatusStyle(status) {
  if (status === "APPROVED") return { bg: "#ecfdf5", text: "#059669", border: "#a7f3d0", icon: <CheckCircle2 size={11} /> };
  if (status === "REJECTED") return { bg: "#fff1f2", text: "#e11d48", border: "#fecdd3", icon: <XCircle size={11} /> };
  return { bg: "#f8fafc", text: "#64748b", border: "#e2e8f0", icon: <Clock size={11} /> };
}

/* ── Score ring (adapted for light bg) ── */
function ScoreRing({ value, color, label }) {
  const r = 26;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(Math.max(Number(value) || 0, 0), 100);
  const offset = circ - (pct / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-14 h-14">
        <svg className="w-14 h-14 -rotate-90" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r={r} strokeWidth="5" stroke="#e2e8f0" fill="none" />
          <circle cx="30" cy="30" r={r} strokeWidth="5" fill="none"
            stroke={color} strokeDasharray={circ} strokeDashoffset={offset}
            strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s ease" }} />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold"
          style={{ color }}>
          {value != null ? `${value}%` : "N/A"}
        </span>
      </div>
      <span className="text-[10px] text-gray-400 uppercase tracking-widest">{label}</span>
    </div>
  );
}

const FILTERS = [
  { key: "ALL", label: "All", activeColor: "#2563eb", activeBg: "#eff6ff", activeBorder: "#bfdbfe" },
  { key: "APPROVED", label: "Approved", activeColor: "#059669", activeBg: "#ecfdf5", activeBorder: "#a7f3d0" },
  { key: "PENDING", label: "Pending", activeColor: "#d97706", activeBg: "#fffbeb", activeBorder: "#fde68a" },
  { key: "REJECTED", label: "Rejected", activeColor: "#e11d48", activeBg: "#fff1f2", activeBorder: "#fecdd3" },
];

export default function VacancyCandidates() {
  const { vacancyId } = useParams();
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetch(`http://localhost:5000/api/hr/vacancies/${vacancyId}/candidates`)
      .then((r) => r.json())
      .then((d) => { setCandidates(d || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [vacancyId]);

  const filtered = filter === "ALL"
    ? candidates
    : candidates.filter((c) => (c.status || "PENDING") === filter);

  const counts = {
    ALL: candidates.length,
    APPROVED: candidates.filter((c) => c.status === "APPROVED").length,
    PENDING: candidates.filter((c) => !c.status || c.status === "PENDING").length,
    REJECTED: candidates.filter((c) => c.status === "REJECTED").length,
  };

  return (
    <div className="flex min-h-screen"
      style={{ background: "linear-gradient(135deg,#f8fafc 0%,#f1f5f9 60%,#e0f2fe 100%)" }}>

      {/* Subtle bg shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle,#bfdbfe,transparent)" }} />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle,#ddd6fe,transparent)" }} />
      </div>

      {sidebarOpen && <Sidebarhr />}

      <div className="flex-1 flex flex-col relative z-10">
        <HrTopbar setSidebarOpen={setSidebarOpen} />

        <div className="pt-6 px-6 md:px-10 pb-24 space-y-7">

          {/* ── Header ── */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-20">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/home")}
                className="flex items-center gap-1.5 text-xs font-medium text-gray-500
                           hover:text-gray-800 border border-gray-200 bg-white px-3 py-2
                           rounded-xl hover:border-gray-300 transition-all duration-200 shadow-sm"
              >
                <ChevronLeft size={14} /> Back
              </button>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
                  Vacancy Candidates
                </h2>
                <p className="text-gray-400 text-xs mt-0.5">ID: {vacancyId}</p>
              </div>
            </div>

            {/* Filter pills */}
            <div className="flex gap-2 flex-wrap">
              {FILTERS.map(({ key, label, activeColor, activeBg, activeBorder }) => {
                const active = filter === key;
                return (
                  <button
                    key={key}
                    onClick={() => setFilter(key)}
                    className="px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200"
                    style={active
                      ? { background: activeBg, borderColor: activeBorder, color: activeColor }
                      : { background: "#fff", borderColor: "#e2e8f0", color: "#9ca3af" }}
                  >
                    {label} <span className="ml-1 opacity-70">{counts[key]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="h-px bg-gray-200" />

          {/* ── Content ── */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <div className="w-9 h-9 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
              <p className="text-gray-400 text-sm">Loading candidates…</p>
            </div>
          ) : !filtered.length ? (
            <div className="flex flex-col items-center justify-center py-32 gap-3 opacity-50">
              <span className="text-5xl">👤</span>
              <p className="text-gray-400 text-sm italic">No candidates found for this filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((candidate) => {
                const match = getMatchLevel(candidate.atsScore, candidate.aiScore);
                const status = getStatusStyle(candidate.status);
                const initials = (candidate.name || "?")
                  .split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

                return (
                  <div
                    key={candidate.userId}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm
                               hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 p-5 space-y-4"
                  >
                    {/* ── Name + status ── */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0"
                          style={{ background: "linear-gradient(135deg,#3b82f6,#8b5cf6)" }}
                        >
                          {initials}
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-800 leading-tight">{candidate.name}</h3>
                          <p className="text-[11px] text-gray-400 mt-0.5 truncate max-w-[160px]">{candidate.email}</p>
                        </div>
                      </div>

                      <span
                        className="shrink-0 flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full border"
                        style={{ background: status.bg, color: status.text, borderColor: status.border }}
                      >
                        {status.icon} {candidate.status || "PENDING"}
                      </span>
                    </div>

                    {/* ── Divider ── */}
                    <div className="h-px bg-gray-100" />

                    {/* ── Score rings ── */}
                    <div className="flex items-center justify-around">
                      <ScoreRing value={candidate.atsScore} color="#3b82f6" label="ATS" />
                      <span
                        className="text-[10px] font-bold px-3 py-1 rounded-full border"
                        style={{ background: match.bg, color: match.text, borderColor: match.border }}
                      >
                        <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle"
                          style={{ background: match.dot }} />
                        {match.label} MATCH
                      </span>
                      <ScoreRing value={candidate.aiScore} color="#8b5cf6" label="AI" />
                    </div>

                    {/* ── Skills ── */}
                    {(candidate.matchedSkills?.length > 0 || candidate.missingSkills?.length > 0) && (
                      <div className="space-y-1.5">
                        {candidate.matchedSkills?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {candidate.matchedSkills.map((s) => (
                              <span key={s} className="text-[10px] px-2 py-0.5 rounded-md font-medium
                                                        bg-emerald-50 text-emerald-700 border border-emerald-200">
                                ✓ {s}
                              </span>
                            ))}
                          </div>
                        )}
                        {candidate.missingSkills?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {candidate.missingSkills.map((s) => (
                              <span key={s} className="text-[10px] px-2 py-0.5 rounded-md font-medium
                                                        bg-red-50 text-red-600 border border-red-100">
                                ✕ {s}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* ── Summary ── */}
                    {candidate.summary && (
                      <p className="text-gray-400 text-[11px] italic leading-relaxed line-clamp-3
                                    border-l-2 border-blue-200 pl-3">
                        {candidate.summary}
                      </p>
                    )}

                    {/* ── Actions ── */}
                    <div className="flex gap-2 pt-1">
                      <button
                        disabled={candidate.status === "APPROVED"}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold
                                   bg-emerald-50 border border-emerald-200 text-emerald-700
                                   hover:bg-emerald-100 hover:border-emerald-300
                                   disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        <CheckCircle2 size={12} /> Approve
                      </button>
                      <button
                        disabled={candidate.status === "REJECTED"}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold
                                   bg-red-50 border border-red-100 text-red-600
                                   hover:bg-red-100 hover:border-red-200
                                   disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        <XCircle size={12} /> Reject
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
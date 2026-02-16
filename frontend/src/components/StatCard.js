export default function StatCard({ title, value, accent }) {
  const colors = {
    green: "text-green-400 bg-green-500/10",
    blue: "text-blue-400 bg-blue-500/10",
    yellow: "text-yellow-400 bg-yellow-500/10",
    purple: "text-purple-400 bg-purple-500/10"
  };

  return (
    <div className="bg-[#11162a] rounded-2xl p-5 border border-white/10 shadow-lg">
      <p className="text-sm text-gray-400">{title}</p>
      <h3 className={`text-3xl font-bold mt-2 ${colors[accent]}`}>
        {value}
      </h3>
    </div>
  );
}

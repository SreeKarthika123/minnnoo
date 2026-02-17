export default function TopCards() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      
      <div className="bg-gray-900 rounded-xl p-6 border border-blue-500/20 shadow-md">
        <h3 className="text-gray-400 text-sm">Software Engineer</h3>
        <p className="text-2xl font-bold text-blue-400 mt-2">128</p>
        <p className="text-green-400 text-sm mt-1">Applications</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 border border-blue-500/20 shadow-md">
        <h3 className="text-gray-400 text-sm">Data Scientist</h3>
        <p className="text-2xl font-bold text-blue-400 mt-2">96</p>
        <p className="text-green-400 text-sm mt-1">Applications</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 border border-blue-500/20 shadow-md">
        <h3 className="text-gray-400 text-sm">UI/UX Designer</h3>
        <p className="text-2xl font-bold text-blue-400 mt-2">54</p>
        <p className="text-green-400 text-sm mt-1">Applications</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 border border-blue-500/20 shadow-md">
        <h3 className="text-gray-400 text-sm">HR Executive</h3>
        <p className="text-2xl font-bold text-blue-400 mt-2">41</p>
        <p className="text-green-400 text-sm mt-1">Applications</p>
      </div>

    </div>
  );
}

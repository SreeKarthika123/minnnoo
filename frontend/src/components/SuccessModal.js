
export default function SuccessModal({ onClose }) {
  return (
    <div className="fixed inset-0 
                    bg-black/70 backdrop-blur-sm
                    flex justify-center items-center 
                    z-50 animate-fadeIn">

      <div className="bg-gradient-to-br 
                      from-gray-900 via-black to-blue-950
                      border border-blue-500/30
                      p-8 rounded-2xl text-center 
                      max-w-sm w-11/12 
                      shadow-2xl 
                      transform animate-popUp">

        {/* Checkmark */}
        <div className="text-5xl font-bold 
                        text-blue-500 mb-4">
          ✓
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold 
                       text-white mb-2">
          Job Published Successfully
        </h2>

        {/* Description */}
        <p className="text-gray-400 mb-6 text-sm">
          Your job posting is now live internally.
        </p>

        {/* Done Button */}
        <button
          onClick={onClose}
          className="px-6 py-2 
                     bg-blue-600 hover:bg-blue-700
                     text-white font-semibold 
                     rounded-lg
                     shadow-lg hover:shadow-blue-500/40
                     transition-all duration-300
                     hover:scale-105"
        >
          Done
        </button>

      </div>
    </div>
  );
}

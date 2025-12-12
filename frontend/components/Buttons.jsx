export default function Buttons({ buttoncontent, onClick }) {
  return (
    <div className="">
      <button
        className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
        type="button"
        onClick={onClick}
      >
        {buttoncontent}
      </button>
    </div>
  );
}

export default function CardForLandingPage({ content, logo }) {
  return (
    <div>
      <div className="flex flex-col justify-center items-center p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-black transition-all duration-300 cursor-pointer group h-40 shadow-sm">
        <div className="group-hover:scale-110 transition-transform">{logo}</div>
        <h1 className="text-xl mt-3 font-semibold text-black">{content}</h1>
      </div>
    </div>
  );
}

export default function Card({ title, description, figures }) {
  return (
    <div className="bg-white rounded-2xl w-80 p-6 border-2 border-gray-200 hover:border-black transition-all duration-300 shadow-sm">
      <h1 className="text-3xl font-bold text-black text-center mb-2">
        {figures}
      </h1>
      <h2 className="text-lg font-semibold text-black text-center mb-1">
        {title}
      </h2>
      <p className="text-gray-600 text-center text-sm">{description}</p>
    </div>
  );
}

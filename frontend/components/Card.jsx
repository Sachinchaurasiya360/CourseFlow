export default function Card({ title, description, figures }) {
  return (
    <div className="bg-primary1 rounded-xl w-80 h-40  ">
      <h1 className="text-3xl font-semibold flex justify-center w-full">
        {title}
      </h1>
      <p className="w-full flex justify-center">{description}</p>
      <h2 className="flex justify-center">{figures}</h2>
    </div>
  );
}

export default function CardForLandingPage({ content, logo }) {
  return (
    <div>
      <div className=" flex  flex-col justify-center items-center w-65 h-35  bg-primary rounded-2xl">
        <div className="">{logo}</div>
        <h1 className=" text-2xl  mt-2 font-semibold">{content}</h1>
      </div>
    </div>
  );
}

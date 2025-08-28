export default function Buttons({buttoncontent,onClick}){
    return(
        <div className="">

            <button className="flex bg-secondary  p-2.5 pr-3 pl-3 rounded-xl font-semibold text-gray-50"
            type="button"
            onClick={onClick}
            >{buttoncontent}</button>
        </div>
    )
}
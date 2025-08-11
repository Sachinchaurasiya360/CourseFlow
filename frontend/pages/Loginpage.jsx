export default function login() {
  return (
    <div className="bg-gradient-to-r from-blue-200 to-cyan-200 min-h-screen flex items-center justify-center">
      <form className="bg-cyan-50 rounded-2xl max-w-full min-w-md p-8">
        <h2 className=" flex justify-center text-2xl font-bold pt-2">Login</h2>
        <label className="block text-gray-700 text-l font-semibold pt-2">Email</label>
        <input
          type="email"
          placeholder="johndoe@example.com"
          className=" w-full border rounded-md p-1"
        />
        <label className="block text-l font-semibold pt-2">Password</label>
        <input
          type="password"
          placeholder="********"
          className=" block border rounded-md p-1  w-full"
        />
        <button className="flex justify-center  text-xl w-full mt-3  bg-blue-400 rounded-md p-1">SignIn</button>
          </form>

      </div>
  );
}

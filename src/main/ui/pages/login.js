import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-[4rem] pt-20">
        <span className="text-[#0070f3]"> Login</span>
      </h1>
      <form className="flex flex-col items-center justify-center w-full">
        <input
          type="text"
          placeholder="Username"
          className="w-96 h-12 border-2 border-gray-300 rounded-lg px-4"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-96 h-12 border-2 border-gray-300 rounded-lg px-4"
        />
        <button
          type="submit"
          className="w-96 h-12 bg-[#0070f3] text-white rounded-lg"
        >
          Login
        </button>

        <button
          type="button"
          className="w-96 h-12 bg-[#0070f3] text-white mt-10 rounded-lg"
          onClick={() => router.push('/register')}
        >
          Register
        </button>
      </form>
    </div>
  );
}

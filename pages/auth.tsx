import Input from "@/components/Input"
import Image from "next/image"
import { useCallback, useState } from "react"


const Auth:React.FC = () => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLogin, setIsLogIn] = useState<boolean>(true)

  const toggleLogin = useCallback(() => {
    setIsLogIn(!isLogin)
  },[isLogin])

  return (
    <div className="relative h-full w-full bg-[url('/images/netflixBgr.png')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className=" w-full h-full bg-gradient-to-r from-[#06202A] to-transparent">
        <nav className="flex items-center justify-between px-9 py-5">
          <Image width={200} height={200} src="/images/logo.png" alt="NetfliKS Logo"/>
          {/* <button className="bg-[#E50914] text-white px-5 py-2 rounded-md text-sm font-bold">Sign In</button> */}
        </nav>
         <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-7 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h1 className="text-3xl text-white font-bold">{isLogin ? "Sign In" : "Sign Up"}</h1>
            <form className="mt-5">
              <div className="flex flex-col gap-4">
                <Input type="email" value={email} placeholder="Email" onChange={(e: string) => setEmail(e)}/>
                {!isLogin && <Input type="Text" value={password} placeholder="First Name" onChange={(e: string) => setPassword(e)}/>}
                {!isLogin && <Input type="Text" value={password} placeholder="Last Name" onChange={(e: string) => setPassword(e)}/>}
                <Input type="password" value={password} placeholder="Password" onChange={(e: string) => setPassword(e)}/>
              </div>
            </form>
            <button className="w-full bg-red-700 text-white px-5 py-3 rounded-md text-sm font-bold mt-5 transition hover:bg-red-600">
              {isLogin? "Log In": "Sign Up"}
            </button>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 border rounded-md cursor-pointer" />
                <p className="text-gray-500 text-sm ml-2">Remember me</p>
              </div>
              <a className="text-gray-500 text-sm ml-2 hover:underline cursor-pointer">Need help?</a>
            </div>
            <div className=" flex items-baseline mt-5 text-gray-500 ">
              <p className="text-sm">{isLogin ? "Already have an account?" : "New to Netflix?"}</p>
                <a onClick={toggleLogin} className="text-lg ml-2 text-white hover:underline cursor-pointer whitespace-nowrap">
                  {!isLogin ? "Log in." : "Sign up Now."}
                </a>
            </div> 
            <p className="text-gray-500 text-sm mt-9">
              This page is protected by Google reCAPTCHA to ensure you{"'"}re not a bot.
            </p> 
            
          </div>
         </div>
      </div>

    </div>
  )
}

export default Auth;
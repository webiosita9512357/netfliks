import Input from "@/components/Input"
import Image from "next/image"
import { useState } from "react"


const Auth:React.FC = () => {

  const [email, setEmail] = useState<string>('')

  return (
    <div className="relative h-full w-full bg-[url('/images/netflixBgr.png')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className=" w-full h-full bg-gradient-to-r from-[#06202A] to-transparent">
        <nav className="flex items-center justify-between p-5">
          <Image width={100} height={100} src="/images/logo.png" alt="NetfliKS Logo"/>
          {/* <button className="bg-[#E50914] text-white px-5 py-2 rounded-md text-sm font-bold">Sign In</button> */}
        </nav>
         <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h1 className="text-3xl text-white font-bold">Sign In</h1>
            <form className="mt-5">
              <div className="flex flex-col gap-4">
                <Input type="email" placeholder="Email" onChange={(e: String) => console.log(e)}/>
              </div>
            </form>
          </div>
         </div>
      </div>

    </div>
  )
}

export default Auth;
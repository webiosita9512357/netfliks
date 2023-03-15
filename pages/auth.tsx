import Input from "@/components/Input"
import axios from "axios"
import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { getSession, signIn } from "next-auth/react"
import NavBar from "@/components/navBar"
import { NextPageContext } from "next"

export const  getServerSideProps = async (context: NextPageContext) => {
    const session = await getSession(context);
    if (session) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return {
      props: {}
    };
  }

const Auth:React.FC = () => {

  const [isLogin, setIsLogIn] = useState<boolean>(true)
  
  const schema = z.object(
    {
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: " Password must be 6 or more characters" }),
  });
  const schemaSignup = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: " Password must be 6 or more characters" }),
    firstName: z.string().min(2, { message: "Fist Name must be 2 or more characters" }),
    lastName: z.string().min(2, { message: "Last Name must be 2 or more characters" }),
  })
    const {register, handleSubmit, getValues, formState} = useForm({resolver: zodResolver(isLogin? schema: schemaSignup)});
    const {errors} = formState;


  // toggle between sign in and sign up form
  const toggleLogin = useCallback(() => {
    setIsLogIn(!isLogin)
  },[isLogin])


  
 // APIS call to sign in/sign up
  const onSubmit = useCallback(async (formValues: any) => {
    try {
      !isLogin && await axios.post('/api/signup', formValues).catch(function (error) {
      throw new Error(error);
  });

      await signIn('credentials', {...formValues, callbackUrl: '/profiles'}).then((res) => {
        if (!res || res.error) {
          throw new Error(res && "error" in res? res.error : 'login failed');
        }
      });


     } catch (error: any) {
      console.error('Error in the auth submit function: ' + error);
      // throw new Error(error);
     }

  },[isLogin])

  return (
    <div className="relative h-full w-full bg-[url('/images/netflixBgr.png')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className=" w-full h-full bg-gradient-to-r from-[#06202A] to-transparent">
        <NavBar />
         <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-7 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h1 className="text-3xl text-white font-bold">{isLogin ? "Sign In" : "Sign Up"}</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
              {/* form custom inputs */}
              <div className="flex flex-col gap-4">
                <Input error={errors['email']?.message} register={register} getValues={() => getValues()} placeholder="email"/>
                {!isLogin && <Input error={errors['firstName']?.message} register={register} getValues={() => getValues()} placeholder="firstName" />}
                {!isLogin && <Input error={errors['lastName']?.message} register={register} getValues={() => getValues()} placeholder="lastName" />}
                <Input isPassword error={errors['password']?.message} register={register} getValues={() => getValues()} placeholder="password" />
              </div>
                <div className="flex gap-3">
                  {/* GOOGLE login setup */}
                  {/* {isLogin && <button onClick={() => signIn()} className="bg-[#3B5998] text-white p-1 rounded-full text-sm font-bold mt-5 transition hover:bg-[#2d4373]">
                    <Image width={40} height={40} src="/images/google.png" alt="Google Logo"/>
                  </button>} */}
                  <button type="submit" className="w-full bg-red-700 text-white px-5 py-3 rounded-md text-sm font-bold mt-5 transition hover:bg-red-600">
                    {isLogin? "Log In": "Sign Up"}
                  </button>
              </div>
            </form>
           
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
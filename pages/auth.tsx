import Input from "@/components/Input"
import axios from "axios"
import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { getSession, signIn } from "next-auth/react"
import NavBar from "@/components/navBar"
import { NextPageContext } from "next"
import { useRouter } from "next/router"
import Alert from "@/components/Alert"

export const  getServerSideProps = async (context: NextPageContext) => {
    const session = await getSession(context);
    if (session) {
      return {
        redirect: {
          destination: "/profiles",
          permanent: false,
        },
      };
    }
    return {
      props: {}
    };
  }

const Auth:React.FC = () => {

  const router = useRouter();
  const [isLogin, setIsLogIn] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  const schema = z.object(
    {
    email: z.string().email({ message: "To co za mail?" }),
    password: z.string().min(6, { message: " Aspoň 6 tam ruc" }),
  });
  const schemaSignup = z.object({
    email: z.string().email({ message: "To co za mail?" }),
    password: z.string().min(6, { message: " Aspoň 6 tam ruc" }),
    firstName: z.string().min(2, { message: "Aspoň 2 tam ruc" }),
    lastName: z.string().min(2, { message: "Aspoň 2 tam ruc" }),
  })
    const {register, handleSubmit, getValues, formState} = useForm({resolver: zodResolver(isLogin? schema: schemaSignup)});
    const {errors} = formState;


  // toggle between sign in and sign up form
  const toggleLogin = useCallback(() => {
    setIsLogIn(!isLogin)
  },[isLogin])


  
  // APIS call to sign in/sign up
  const onSubmit = useCallback(async (formValues: any) => {
    setLoading(true);
    const signer = async () => {
      await signIn('credentials', {...formValues, redirect: false, callbackUrl: '/profiles'}).then((res) => {
        if (!res || res.error) {
          console.error(res && res.error && res.error);
          setLoading(false);
          throw new Error(res && "error" in res? res.error : 'coškaj nedobre s prihlašenim');
        } else {
          router.push('/profiles');
        }
      });
    }

    try {
      !isLogin ? await axios.post('/api/signup', formValues).catch(function (error) {
        setLoading(false);
        throw new Error(error.response.data.message);
    }).then(async () => {
      await signer();
    }) : await signer();

     } catch (error: any) {
       setErrorMessage(`Incorrect Credentials_${error.message}`);
       setLoading(false);
      setError(true);
     }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isLogin])

  return (
    <div className="relative h-full w-full bg-[url('/images/netflixBgr.png')] bg-no-repeat bg-center bg-fixed bg-cover">
      <NavBar />
      <div className=" w-full h-full bg-gradient-to-r from-[#06202A] to-transparent">
         <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-7 self-center mt-36 md:w-3/5 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h1 className="text-3xl text-white font-bold">{isLogin ? "Prihlašic" : "Zaregistrovac"}</h1>
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
                    {loading? 
                     <div
                        className="m-0 inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status">
                        <span
                          className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                          >Loading...</span>
                      </div> 
                    : isLogin? "Prihlašic": "Zaregistrovac"}
                  </button>
              </div>
            </form>
           
            <div className="flex items-center justify-between mt-3">
              <a 
                onClick={() => {
                  setErrorMessage(`Yeah?_Well too bad!`);
                  setError(true);
                }}
               className="text-gray-500 text-sm ml-2 hover:underline cursor-pointer">Treba pomosc?</a>
            </div>
            <div className=" flex items-baseline mt-5 text-gray-500 ">
              <p className="text-sm">{isLogin ? "Už štangasta?" : "Nikda tu nebul?"}</p>
                <a onClick={toggleLogin} className="text-lg ml-2 text-white hover:underline cursor-pointer whitespace-nowrap">
                  {!isLogin ? "Prihlašic" : "Zaregistrovac teraz takoj"}
                </a>
            </div> 
            <p className="text-gray-500 text-sm mt-9">
              This page is protected by Google reCAPTCHA to ensure you{"'"}re not a bot.
            </p> 
            
          </div>
         </div>
      </div>
      <Alert title={errorMessage.split("_")[0]} description={errorMessage.split("_")[1]} type="error" show={error} setShow={setError} />
    </div>
  )
}

export default Auth;
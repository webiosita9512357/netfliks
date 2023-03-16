import NavBar from "@/components/navBar";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";


export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {}
  };
}

const Profiles = () => {
  const {data} = useAuthenticatedUser();
  const router = useRouter();
  return (
    <div className="absolute top-0 w-full">
      <NavBar isDashboard data={data} />
      <div className="flex flex-col mt-44 lg:mt-60">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          {"Who's watching?"}
        </h1>
        <div className="flex items-center justify-center gap-11 mt-10 mb-10 flex-wrap">
          <div onClick={() => router.push("/")} className={cardStyle}>
            <div className="w-56 h-56 relative">
              <Image fill className="rounded-md" src="/images/face3.png" alt="profile" />
            </div>
            <p className="text-white">{"User 1"}</p>
          </div>
          <div onClick={() => console.log("clicked")} className={cardStyle}>
            <div className="w-56 h-56 relative">
              <Image fill className="rounded-md" src="/images/face2.png" alt="profile" />
            </div>
            <p className="text-white">{"User 1"}</p>
          </div>
          <div onClick={() => console.log("clicked")} className={cardStyle}>
            <div className="w-56 h-56 relative">
              <Image fill className="rounded-md" src="/images/face1.png" alt="profile" />
            </div>
            <p className="text-white">{"User 1"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

  const cardStyle = `
    flex flex-col items-center px-6 py-4
    justify-center gap-3 cursor-pointer rounded-md
    hover:scale-105 
    transition-all duration-300
    hover:shadow-2xl hover:bg-gray-700
  `

export default Profiles

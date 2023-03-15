import NavBar from "@/components/navBar";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

  export const  getServerSideProps = async (context: NextPageContext) => {
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

export default function Home() {
  const {data} = useAuthenticatedUser();
  return (
    <div className="text-2xl text-green-500 text-center">
     <NavBar isDashboard data={data} />
    </div>
  )
}

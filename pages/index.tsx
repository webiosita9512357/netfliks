import Banner from "@/components/Banner";
import InfiModal from "@/components/InfiModal";
import MovieList from "@/components/MovieList";
import NavBar from "@/components/navBar";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import useBanner from "@/hooks/useBanner";
import useFavorites from "@/hooks/useFavorites";
import useMovies from "@/hooks/useMovies";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useMemo, useState } from "react";

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
  const [modalData, setModalData] = useState<any | null>(null);

  const {isLoading: load1} = useAuthenticatedUser();
  const {data: movies, isLoading:load2} = useMovies();
  const {data: favorites, isLoading: load3} = useFavorites();
  const {isLoading: load4} = useBanner();

  const isLoading = useMemo(() => load1 || load2 || load3 || load4, [load1, load2, load3, load4]);

  return (
    <div> 
       <div className={`bg-gray-800 bg-opacity-85 fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center ${isLoading? "visible": "hidden"}`}>
          <div className="animate-spin rounded-full h-48 w-48 border-t-2 border-b-2 border-red-600"/>
        </div>
        <NavBar isDashboard />
        <Banner setModalData={setModalData} />
        <div className="flex flex-wrap gap-10 pb-52">
          <MovieList setModalData={setModalData} data={movies} label="Trending" />
          <MovieList setModalData={setModalData} data={favorites} label="Favorites" />
        </div>
        {modalData && <InfiModal setIsOpen={setModalData} data={modalData} />}
    </div>
  )
}

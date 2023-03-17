import useBanner from "@/hooks/useBanner";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

interface BannerProps {
  setModalData: (data: Object) => void;
}

const Banner: React.FC<BannerProps> = ({setModalData}) => {
  const {data, isLoading} = useBanner();
  const router = useRouter();

  const redirectToWatch = useCallback(() => router.push(`/watch/${data?.id}`), [router, data?.id]);

  return (
    <div className="relative h-[56.25vw]">
      <div className={`bg-gray-700 bg-opacity-70 fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center ${isLoading? "visible": "hidden"}`}>
          <div className="animate-spin rounded-full h-48 w-48 border-t-2 border-b-2 border-red-600"/>
      </div>
      <video className="w-full h-[56.25vw] object-cover brightness-[70%] absolute" poster={data?.thumbnailUrl} src={data?.videoUrl} autoPlay muted />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#06202ab9] to-transparent" >
        <div className="absolute flex flex-col justify-center w-full md:w-[55%] top-[65%] md:top-[40%] px-2 md:px-10">
          <h1 className="text-lg md:text-4xl text-white font-bold">{data?.title}</h1>
          <p className="text-white text-sm md:text-lg mt-4 hidden md:block">{data?.description}</p>
          <div className="flex flex-row gap-2 mt-2 md:mt-5">
            <button onClick={redirectToWatch} className="bg-red-600 md:w-fit bg-opacity-90 text-white px-10 py-3 rounded-md text-sm font-bold transition hover:bg-red-700 hidden md:block">
              Watch
            </button>
            <button onClick={() => setModalData(data)} className="bg-gray-200 text- md:w-fit bg-opacity-70 text-white px-10 py-1 md:py-3 rounded-md text-sm font-bold transition hover:bg-gray-400">
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
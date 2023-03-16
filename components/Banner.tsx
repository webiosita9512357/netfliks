import useBanner from "@/hooks/useBanner";


const Banner = () => {
  const {data, isLoading} = useBanner();
  return (
    <div className="relative h-[56.25vw]">
      <div className={`bg-gray-700 bg-opacity-70 fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center ${isLoading? "visible": "hidden"}`}>
          <div className="animate-spin rounded-full h-48 w-48 border-t-2 border-b-2 border-red-600"/>
      </div>
      <video className="w-full h-[56.25vw] object-cover brightness-[70%] absolute" poster={data?.thumbnailUrl} src={data?.videoUrl} autoPlay muted />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#06202ab9] to-transparent" >
        <div className="absolute flex flex-col justify-center w-full md:w-[55%] top-[80%] md:top-[40%] px-2 md:px-10">
          <h1 className="text-2xl md:text-4xl text-white font-bold">{data?.title}</h1>
          <p className="text-white text-sm md:text-lg mt-5">{data?.description}</p>
          <button className="bg-red-600 md:w-fit bg-opacity-80 text-white px-20 py-3 rounded-md text-sm font-bold mt-5 transition hover:bg-red-700">
            More Info
          </button>
        </div>
      </div>
    </div>
  )
}

export default Banner
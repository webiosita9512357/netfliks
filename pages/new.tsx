import FullSiteLoader from '@/components/FullSiteLoader';
import InfiModal from '@/components/InfiModal';
import MovieList from '@/components/MovieList'
import NavBar from '@/components/navBar'
import useMovies from '@/hooks/useMovies';
import React, { useState } from 'react'

const New = () => {
    const [modalData, setModalData] = useState<any | null>(null);
      const {data, isLoading} = useMovies("trending");

  return (
     <div> 
        <FullSiteLoader isLoading={isLoading}/>
        <NavBar isDashboard notFixed/>
        <div className="flex flex-wrap gap-10 pb-52">
          <MovieList setModalData={setModalData} data={data} label="New" />
        </div>
        {modalData && <InfiModal setIsOpen={setModalData} data={modalData} />}
    </div>
  )
}

export default New
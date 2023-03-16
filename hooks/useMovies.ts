import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useMovies = () => {
  const { data, error, isLoading } = useSWR('/api/movies', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    isLoading,
    error
  }
};

export default useMovies;


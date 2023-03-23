import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { VisibleProps } from "@/interfaces/interfaces";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

interface Props {
  visible: boolean;
}


const AccountMenu: React.FC<Props> = ({visible}) => {
  const {data} = useAuthenticatedUser();
  const router = useRouter();
  
  return (
    visible
    ?
    <div className="bg-gray-700 w-56 absolute top-24 right-5 py-5 flex-col flex rounded-md">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <div className="relative overflow-hidden rounded-md w-8 h-8 lg:h-10 lg:w-10 ">
            <Image fill src="/images/face3.png" alt="User Logo" className="rounded-md" />
          </div>
          <p className="text-gray-300 text-sm">
            {data?.email}
          </p>
        </div>
          <button onClick={() => router.push("/account")} className="px-3 text-sm bg-gray-500 text-gray-300 py-2 mx-3 rounded-md hover:bg-gray-600 transition duration-300">
            Opatric profiľ
          </button>
          <button onClick={() => signOut()} className="px-3 text-sm bg-red-800 text-gray-300 py-2 mx-3 rounded-md hover:bg-red-900 transition duration-300">
            Isc z tadzi
          </button>
      </div>
    </div>
    :
    null
  )
}

export default AccountMenu
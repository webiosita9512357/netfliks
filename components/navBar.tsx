import { signOut } from "next-auth/react";
import Image from "next/image"
import NavItem from "./NavItem";
import { FaChevronDown } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import MobileMenu from "./MobileMenu";
import { useState } from "react";


interface navBarProps {
  isDashboard?: boolean;
  data?: {
    name: string;
    email: string;
  };
}

const NavBar: React.FC<navBarProps> = ({isDashboard, data}) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  console.log(data)

  return (
     <nav className="flex items-center justify-between px-5 md:px-14 py-5 flex-row bg-gray-900 bg-opacity-50 transition duration-500">
      <div className="block lg:flex flex-row lg:gap-10">
        <div className="relative w-32 h-24 md:w-40">
          <Image fill src="/images/logo.png" alt="NetfliKS Logo"/>
        </div>
          {isDashboard && 
            <div className="items-center gap-4 hidden lg:flex">
              <NavItem label="Home"/>
              <NavItem label="Series"/>
              <NavItem label="Films"/>
              <NavItem label="New & Popular"/>
              <NavItem label="My List"/>
              <NavItem label="Browse by Language"/>
            </div>
          }
          
        </div>
        {isDashboard &&

          <div onClick={() => setShowMenu(!showMenu)} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
            <p className="text-sm text-white">
              browse
            </p>
            <FaChevronDown className="text-white transition" />
            <MobileMenu visible={showMenu}/>
          </div>
        }
        {/* {isDashboard &&
        <div onClick={() => setShowMenu(!showMenu)} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
            <div className="relative w-12 h-12">
              <Image fill src="/images/face3.png" alt="User Logo" className="rounded-md" />
            </div>
            <FaChevronDown className="text-white transition" />
            <MobileMenu visible={showMenu}/>
          </div>}
     */}
        <div className="flex flex-row items-center gap-4 ml-auto">
          <div className="text-gray-200 hover:text-gray-400 cursor-pointer">
            <AiOutlineSearch />
          </div>
        </div>
      </nav>
  )
}

export default NavBar
import { signOut } from "next-auth/react";
import Image from "next/image"
import NavItem from "./NavItem";
import { FaChevronDown } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import MobileMenu from "./MobileMenu";
import { useEffect, useState } from "react";
import AccountMenu from "./AccountMenu";


interface navBarProps {
  isDashboard?: boolean;
  data?: {
    name: string;
    email: string;
  };
}

const Offset = 66;

const NavBar: React.FC<navBarProps> = ({isDashboard, data}) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showAccMenu, setShowAccMenu] = useState<boolean>(false);
  const [navBgr, setNavBgr] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > Offset) {
        setNavBgr(true);
      } else {
        setNavBgr(false);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  return (
     <nav className={`flex items-center justify-between px-5 md:px-14 py-5 flex-row bg-gradient-to-b from-[#06202A] ${navBgr? "to-transparent":"bg-opacity-30"} transition duration-500 fixed z-10 w-full`}>
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
            <p className="text-sm text-gray-300">
              browse
            </p>
            <FaChevronDown className={`text-gray-300 transition text-sm ${showMenu? 'rotate-180': 'rotate-0'}`} />
            <MobileMenu visible={showMenu}/>
          </div>
        
        }
        {isDashboard &&
          <div className="flex flex-row items-center gap-2 ml-auto lg:gap-10">
            <div className="text-gray-200 hover:text-gray-400 cursor-pointer">
              <AiOutlineSearch />
            </div>
            <div className=" flex flex-row items-center gap-2 cursor-pointer" onClick={() => setShowAccMenu(!showAccMenu)}>
              <div className="relative overflow-hidden rounded-md w-8 h-8 lg:h-10 lg:w-10 ">
                <Image fill src="/images/face3.png" alt="User Logo" className="rounded-md" />
              </div>
              <FaChevronDown className={`text-white transition text-sm ${showAccMenu? 'rotate-180': 'rotate-0'}`} />
              <AccountMenu visible={showAccMenu} data={data}/>
            </div>
          </div>
          }
      </nav>
  )
}

export default NavBar
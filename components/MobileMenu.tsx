
interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({visible}) => {
  return (
    visible ? 
      <div className="bg-gray-700 w-56 absolute top-8 right-0 py-5 border-2 border-gray-800">
        <div className="flex flex-col items-center gap-4">
          <p className="text-white text-sm text-center px-3">{"Home"}</p>
          <p className="text-white text-sm text-center px-3">{"Series"}</p>
          <p className="text-white text-sm text-center px-3">{"Films"}</p>
          <p className="text-white text-sm text-center px-3">{"New & Popular"}</p>
          <p className="text-white text-sm text-center px-3">{"My List"}</p>
          <p className="text-white text-sm text-center px-3">{"Browse by Language"}</p>
        </div>
      </div> 
    : 
    null
  )
}

export default MobileMenu
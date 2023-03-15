
interface NavItemProps {
  label: string;
}


const NavItem: React.FC<NavItemProps> = ({label}) => {
  return (
    <p className="cursor-pointer text-white hover:underline text-sm">
      {label}
    </p>
  )
}

export default NavItem
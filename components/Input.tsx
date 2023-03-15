
interface InputItemProps {
  type?: string;
  placeholder?: string;
  sx?:string;
  onChange: Function;
  value?: string;
}
 
const Input: React.FC<InputItemProps> = ({type, placeholder, sx, onChange, value}) => {

  return (
    <div className="relative">
      <input
        onChange={(e) => onChange(e.target.value)}
        id={placeholder}
        value={value}
        type={type}
        placeholder=" "
        className={`
          block
          cursor-text
          bg-gray-800
          text-white 
          px-6 pt-6 pb-1
          w-full
          text-md
          rounded-md 
          focus:outline-none 
          focus:ring-2
          peer
          focus:bg-gray-700
          ${sx}`}
        />
        <label 
        htmlFor={placeholder}
        className="absolute
          top-0
          left-0
          px-6
          py-3.5
         text-gray-400
         text-md
         transition-all
         duration-200
         peer-focus:top-0
         peer-focus:text-sm peer-focus:px-2
         peer-focus:py-1
         peer-focus:text-gray-500
         peer-placeholder-shown:scale-100"
        >
          {placeholder}
        </label>
      </div>
  )
}

export default Input
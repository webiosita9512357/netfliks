
export interface navBarProps {
  isDashboard?: boolean;
  notFixed?: boolean;
}

export interface MovieListProps {
  data?: MovieProps[];
  label?: string;
  setModalData: Function;
}

export interface MovieProps {
  data: {
    title: string;
    description: string;
    thumbnailUrl: string;
    videoUrl: string;
    id: string;
    genre: string;
    duration: string;
    year?: number;
  }
}

export interface VisibleProps {
  visible?: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface InputProps {
  placeholder: string;
  sx?:string;
  register: Function; 
  getValues: Function;
  error?: any;
  isPassword?: boolean;
  disabled?: boolean;
}

export interface AlertProps {
  title: string;
  description: string;
  type: string;
  show: boolean;
  setShow: (show: boolean) => void;
}
import { useNavigate } from "react-router-dom";
export const GoogleSignUpButton = ({ text }) => {
  const navigate=useNavigate()
  return (
    <div className="flex justify-center items-center ">
      <button className="flex items-center justify-center gap-2 px-2 py-1 text-secondary bg-danger border  border-blue-400 rounded-full hover:bg-fifth transition ">
        <svg
          className="w-5 h-4"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#4285F4"
            d="M24 9.5c3.21 0 6.08 1.15 8.37 3.02l6.25-6.25C34.47 2.43 29.52 0 24 0 14.82 0 6.82 5.64 3 13.87l7.45 5.83C12.23 13.02 17.64 9.5 24 9.5z"
          />
          <path
            fill="#34A853"
            d="M46.07 24.44c0-1.38-.12-2.72-.34-4H24v8.12h12.6c-.88 4.32-3.3 7.98-6.6 10.44l7.45 5.82c4.37-4.02 7.62-10.04 7.62-18.38z"
          />
          <path
            fill="#FBBC05"
            d="M3 34.13c3.82 8.23 11.82 13.87 21 13.87 5.52 0 10.47-1.93 14.33-5.14l-7.45-5.82c-2.07 1.39-4.64 2.21-7.88 2.21-6.36 0-11.77-3.52-14.55-8.67L3 34.13z"
          />
          <path
            fill="#EA4335"
            d="M24 47.99c6.5 0 11.89-2.14 15.83-5.79l-7.45-5.82c-2.6 1.93-5.93 3.12-9.62 3.12-7.15 0-13.24-4.8-15.32-11.29H3v7.12C6.82 42.36 14.82 47.99 24 47.99z"
          />
        </svg>
        <span className="text-[11px] font-md ">{text}</span>
      </button>
    </div>
  );
};

export const Button = ({ text, size ,navigateTo,className}) => {
  const navigate=useNavigate()
  const buttonSizes = {
    small: "w-32 p-1 text-sm",
    medium: "w-48 p-2 text-base",
    large:"w-96 p-2 pl-1 rounded-lg bg-secondary text-white block mx-auto  mt-8",
    xl: "p-2 text-sm w-[300px]",

      
  };
  return (
    <button
      type="submit"
      className={`rounded-lg bg-secondary text-white block mx-auto  mt-8 ${buttonSizes[size]},${className}`}
      onClick={() => navigate(navigateTo)}
    >
      {text}
    </button>
  );
};

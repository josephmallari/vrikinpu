interface ButtonProps {
  onClick: () => void;
  variant?: "purpleBlue" | "purpleRed";
  children: React.ReactNode;
}

export default function Button({ onClick, variant = "purpleBlue", children }: ButtonProps) {
  const gradientColors = {
    purpleBlue: "from-purple-600 to-blue-500",
    purpleRed: "from-purple-600 to-red-500",
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={`cursor-pointer inline-block text-white bg-gradient-to-br 
                ${gradientColors[variant]} hover:bg-gradient-to-bl focus:ring-4 
                focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 
                font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2
                transition-all duration-300 ease-in-out hover:scale-105 
                hover:shadow-lg active:scale-95`}
    >
      {children}
    </button>
  );
}

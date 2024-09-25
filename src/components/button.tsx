import { ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonProps = { link: string; children: ReactNode };

const Button = ({ link, children }: ButtonProps) => {
  return (
    <Link
      className="tracking-wider rounded border-2 py-3 px-4 border-solid border-white opacity-80 hover:bg-white transition hover:text-neutral-900"
      to={link}
    >
      {children}
    </Link>
  );
};

export default Button;

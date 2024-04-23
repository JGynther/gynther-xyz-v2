import { ReactNode } from "react";

type ButtonProps = { link: string; children: ReactNode };

const Button = ({ link, children }: ButtonProps) => {
  return (
    <a
      className="tracking-wider rounded border-2 py-3 px-4 border-solid border-white opacity-80 hover:bg-white transition hover:text-neutral-900"
      href={link}
    >
      {children}
    </a>
  );
};

export default Button;

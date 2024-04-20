import { type PropsWithChildren } from "react";

const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full bg-neutral-900 text-white min-h-screen">
      {children}
    </div>
  );
};

export default Wrapper;

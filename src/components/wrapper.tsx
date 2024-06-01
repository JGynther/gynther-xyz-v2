import { type PropsWithChildren } from "react";

const StyleWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-screen bg-neutral-900 text-white overflow-auto p-5 md:p-10">
      {children}
    </div>
  );
};

export default StyleWrapper;

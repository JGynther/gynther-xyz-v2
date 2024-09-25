import { type PropsWithChildren } from "react";

const StyleWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-screen bg-neutral-900 text-white overflow-auto p-5 md:p-10">
      {children}
    </div>
  );
};

const Center = ({ children }: PropsWithChildren) => (
  <div className="mx-auto max-w-screen-md">{children}</div>
);

export default StyleWrapper;
export { Center };

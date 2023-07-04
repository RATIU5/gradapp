import { cn } from "@/lib/utils";

type PageWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

const PageWrapper = (props: PageWrapperProps) => {
  return (
    <div className={cn("w-full pt-24", props.className)}>{props.children}</div>
  );
};

export default PageWrapper;

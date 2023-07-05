import PageWrapper from "@/components/page-wrapper";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  return (
    <PageWrapper>
      <div className="mt-8 max-w-xl mx-auto p-8 rounded-lg bg-neutral-100">
        {props.children}
      </div>
    </PageWrapper>
  );
};

export default Layout;

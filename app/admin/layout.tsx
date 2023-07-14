import PageWrapper from "@/components/page-wrapper";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  return (
    <PageWrapper>
      <h2 className="mt-12 text-4xl font-bold text-center">Admin Panel</h2>
      <div className="my-8 max-w-xl mx-auto p-8 rounded-lg bg-neutral-100 dark:bg-neutral-900">
        {props.children}
      </div>
    </PageWrapper>
  );
};

export default Layout;

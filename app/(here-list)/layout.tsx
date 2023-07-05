import PageWrapper from "@/components/page-wrapper";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  return <PageWrapper>{props.children}</PageWrapper>;
};

export default Layout;

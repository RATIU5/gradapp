import PageWrapper from "@/components/page-wrapper";

type PageProps = {
  children: React.ReactNode;
};

const Page = (props: PageProps) => {
  return <PageWrapper>{props.children}</PageWrapper>;
};

export default Page;

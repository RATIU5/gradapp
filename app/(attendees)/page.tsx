import MainNav from "@/components/main-nav";

type PageProps = {
  children: React.ReactNode;
};

const Page = (props: PageProps) => {
  return (
    <div>
      <MainNav />
    </div>
  );
};

export default Page;

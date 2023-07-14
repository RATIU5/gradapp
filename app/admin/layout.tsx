import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import PageWrapper from "@/components/page-wrapper";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  return (
    <PageWrapper className="flex justify-center">
      <Tabs defaultValue="students" className="mt-10">
        <TabsList className="mb-4">
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="faculty">Faculty</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
        </TabsList>

        {props.children}
      </Tabs>
    </PageWrapper>
  );
};

export default Layout;

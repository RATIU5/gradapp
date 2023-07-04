import PageWrapper from "@/components/page-wrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PageProps = {
  children: React.ReactNode;
};

const Page = (props: PageProps) => {
  return (
    <PageWrapper>
      <Label
        htmlFor="filter-input"
        className="max-w-4xl block mx-auto mt-24 mb-2"
      >
        Search
      </Label>
      <Input
        id="filter-input"
        placeholder="Homer Simpson; Interior Design"
        className="max-w-4xl mx-auto mb-12"
      />
      {props.children}
    </PageWrapper>
  );
};

export default Page;

import PageWrapper from "@/components/page-wrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      <Table className="max-w-4xl mx-auto mt-5">
        <TableCaption>A list of all faculty and graduates.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Plat.</TableHead>
            <TableHead>HS</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Program</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">1</TableCell>
            <TableCell>0</TableCell>
            <TableCell>Jeff Markus</TableCell>
            <TableCell>Programming</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </PageWrapper>
  );
};

export default Page;

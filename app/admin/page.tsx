import AddPersonForm from "@/components/add-student-form";
import { TabsContent } from "@/components/ui/tabs";

type AdminProps = {
  children: React.ReactNode;
};

const Admin = (props: AdminProps) => {
  return (
    <>
      <TabsContent value="students">
        <div className="flex justify-center flex-wrap">
          <div>
            <AddPersonForm />
          </div>
          <div>THere</div>
        </div>
      </TabsContent>
      <TabsContent value="faculty">
        <h1>Faculty</h1>
      </TabsContent>
      <TabsContent value="programs">
        <h1>Programs</h1>
      </TabsContent>
    </>
  );
};

export default Admin;

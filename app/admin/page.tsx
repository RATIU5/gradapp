import AddPersonForm from "@/components/add-student-form";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";

const Admin = () => {
  return (
    <>
      <TabsContent value="students">
        <div className="flex justify-center flex-wrap items-stretch">
          <div className="w-[20rem]">
            <h2>Add Student</h2>
            <AddPersonForm />
          </div>
          <div className="flex justify-center flex-col items-center w-[20rem]">
            <h2>Import Students</h2>
            <Button>Import Students</Button>
          </div>
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

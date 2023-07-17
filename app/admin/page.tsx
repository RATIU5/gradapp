import AddPersonForm from "@/components/add-student-form";
import { TabsContent } from "@/components/ui/tabs";
import UploadStudents from "@/components/upload-students";

const Admin = () => {
  return (
    <>
      <TabsContent
        value="students"
        className="flex justify-around flex-wrap items-center w-full max-w-5xl flex-col md:flex-row"
      >
        <div className="w-[20rem]">
          <AddPersonForm />
        </div>
        <div>
          <p>or</p>
        </div>
        <div className="w-[20rem]">
          <UploadStudents />
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

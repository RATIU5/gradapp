import AddPersonForm from "@/components/add-student-form";
import { TabsContent } from "@/components/ui/tabs";
import UploadStudents from "@/components/upload-students";

const Admin = () => {
  return (
    <>
      <TabsContent value="students" className="w-full">
        <div className="flex mx-auto justify-around flex-wrap items-center w-full max-w-5xl flex-col md:flex-row mt-0">
          <div className="w-[20rem]">
            <AddPersonForm />
          </div>
          <div>
            <p>or</p>
          </div>
          <div className="w-[20rem]">
            <UploadStudents />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="faculty" className="w-full">
        <div className="flex mx-auto justify-around flex-wrap items-center w-full max-w-5xl flex-col md:flex-row mt-0">
          <div className="w-[20rem]">
            <AddFacultyForm />
          </div>
          <div>
            <p>or</p>
          </div>
          <div className="w-[20rem]">
            <UploadFaculty />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="programs" className="w-full">
        <div className="flex mx-auto justify-around flex-wrap items-center w-full max-w-5xl flex-col md:flex-row mt-0">
          <div className="w-[20rem]">
            <AddProgramForm />
          </div>
          <div>
            <p>or</p>
          </div>
          <div className="w-[20rem]">
            <UploadPrograms />
          </div>
        </div>
      </TabsContent>
    </>
  );
};

export default Admin;

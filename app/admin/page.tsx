import AddFacultyForm from "@/components/add-faculty-form";
import AddStudentForm from "@/components/add-student-form";
import { TabsContent } from "@/components/ui/tabs";
import UploadFaculty from "@/components/upload-faculty";
import UploadStudents from "@/components/upload-students";
import { getServerAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const Admin = async () => {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/");
  }
  return (
    <>
      <TabsContent value="students" className="w-full">
        <div className="flex mx-auto justify-around flex-wrap items-center w-full max-w-5xl flex-col md:flex-row mt-0">
          <div className="w-[20rem]">
            <AddStudentForm />
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
          <div className="w-[20rem]">{/* <AddProgramForm /> */}</div>
          <div>
            <p>or</p>
          </div>
          <div className="w-[20rem]">{/* <UploadPrograms /> */}</div>
        </div>
      </TabsContent>
    </>
  );
};

export default Admin;

import { redirect } from "next/navigation";
import LoginForm from "@/components/login-form";
import PageWrapper from "@/components/page-wrapper";
import { getServerAuthSession } from "@/lib/auth";

const Page = async () => {
  const session = await getServerAuthSession();
  if (session) {
    redirect("/");
  }

  return (
    <PageWrapper className="flex justify-center items-center h-screen">
      <LoginForm />
    </PageWrapper>
  );
};

export default Page;

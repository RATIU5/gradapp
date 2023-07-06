"use client";

import PageWrapper from "@/components/page-wrapper";
import { LogoutSkeleton } from "@/components/skeletons";
import { signOut } from "next-auth/react";

const Page = () => {
  signOut({
    callbackUrl: `${window.location.origin}/login`,
  });
  return (
    <PageWrapper className="flex justify-center items-center h-screen">
      <LogoutSkeleton />
    </PageWrapper>
  );
};

export default Page;

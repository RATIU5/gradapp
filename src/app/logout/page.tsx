"use client";

import { signIn } from "next-auth/react";

type PageProps = {
  providers: Record<string, string>[];
};

const Page = (props: PageProps) => {
  return (
    <div className="flex  min-h-screen w-full items-center justify-center">
      <div className="flex flex-col rounded-3xl">
        <h3>Are you sure you want to logout?</h3>
        <button
          onClick={() => signIn("google")}
          className="flex items-center justify-between rounded-full border border-solid border-gray-300 bg-gray-100 px-8 py-4 text-lg hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600 dark:hover:bg-gray-700"
        >
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Page;

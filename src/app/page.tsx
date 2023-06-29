type PageProps = {
  children: React.ReactNode;
};

const Page = (props: PageProps) => {
  return (
    <div>
      <h1 className="text-green-200 dark:text-red-200">Page</h1>
    </div>
  );
};

export default Page;

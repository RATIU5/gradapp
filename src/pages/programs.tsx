import { type NextPage } from "next";
import Layout from "~/components/layout";
import useFetch from "~/utils/hooks/use-fetch";

type Programs = {
  name: string;
  description: string;
};

const Programs: NextPage<Programs> = (props) => {
  const { data, error } = useFetch<Programs[]>(
    `${process.env.NEXT_PUBLIC_API_URL as string}/programs/get-all`
  );

  console.log(data);

  if (error) {
    return <Layout>There was an error loading the programs</Layout>;
  }
  if (!data) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Programs</h1>
        <div className="flex flex-col items-center justify-center">
          {data.map((program, i) => (
            <div
              key={`${i}s`}
              className="flex flex-col items-center justify-center"
            >
              <h2 className="text-2xl font-bold">{program.name}</h2>
              <p className="text-xl">{program.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Programs;

import { type NextPage } from "next";
import { useState } from "react";
import Layout from "~/components/layout";

type Validate = object;

const Validate: NextPage<Validate> = (props) => {
  const [nameValue, setNameValue] = useState("");

  const onChange = (value: string) => {
    setNameValue(value);
    // searchGuests(query);
  };

  return (
    <Layout>
      <div>
        <form>
          <input
            type="text"
            name="attendee_name"
            id="attendee_name"
            value={nameValue}
            onChange={(e) => onChange(e.target.value as string)}
          />
        </form>
      </div>
    </Layout>
  );
};

export default Validate;

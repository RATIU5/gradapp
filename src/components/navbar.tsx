import { Icons } from "./icons";
import { ModeToggle } from "./mode-toggle";

type NavbarProps = {};

const Navbar = (props: NavbarProps) => {
  return (
    <div className="fixed -mt-20 w-full px-4">
      <div className="mx-auto flex min-w-min max-w-4xl items-center justify-between rounded-full border border-solid border-gray-200 bg-gray-100/25 px-4 py-2 backdrop-blur-md first-letter:w-full dark:border-gray-900 dark:bg-gray-900/25">
        <div>
          <Icons.logo size={48} />
        </div>
        <div className="flex items-center">
          <ul className="mr-8 flex">
            <li className="mx-2">Attendees</li>
            <li className="mx-2">Login</li>
          </ul>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

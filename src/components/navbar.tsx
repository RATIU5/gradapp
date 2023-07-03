import { getCurrentUser } from "~/lib/session";
import { Icons } from "./icons";
import { ModeToggle } from "./mode-toggle";

type NavbarProps = {};

const Navbar = async (props: NavbarProps) => {
  const user = await getCurrentUser();

  return (
    <div className="fixed top-4 w-full px-4">
      <div className="dark:bg-gray-800/25 mx-auto flex min-w-min max-w-4xl items-center justify-between rounded-full border border-solid border-gray-200 bg-gray-100/25 px-4 py-2 backdrop-blur-md first-letter:w-full dark:border-gray-800">
        <div>
          <Icons.logo size={48} className="text-gray-700 dark:text-gray-300" />
        </div>
        <div className="flex items-center">
          <ul className="mr-3 flex">
            <li className="mx-3">
              <a
                href="/attendees"
                className="font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Attendees
              </a>
            </li>
            <li className="mx-3">
              <a
                href={!user ? "/api/auth/signin/google" : "/api/auth/signout"}
                className="font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {!user ? "Login" : "Logout"}
              </a>
            </li>
          </ul>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

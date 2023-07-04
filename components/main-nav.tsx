import { ThemeToggle } from "./theme-toggle";

type MainNavProps = {};

const MainNav = (props: MainNavProps) => {
  return (
    <div className="w-full flex justify-center">
      <div className="flex fixed w-full justify-between items-center max-w-3xl rounded-full bg-neutral-50 px-4 py-1 text-neutral-700 translate-y-4 dark:bg-neutral-800 dark:text-neutral-400 border-solid border border-neutral-200 dark:border-neutral-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12"
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
        <ul className="flex justify-between items-center">
          <li className="mx-2 dark:hover:text-neutral-50 text-neutral-500 hover:text-neutral-950">
            <a href="/">Attendees</a>
          </li>
          <li className="mx-2 dark:hover:text-neutral-50 text-neutral-500 hover:text-neutral-950">
            <a href="/login">Login</a>
          </li>
          <li className="mx-2 dark:hover:text-neutral-50 text-neutral-500 hover:text-neutral-950">
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MainNav;

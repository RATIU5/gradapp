import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  type FunctionComponent,
  type PropsWithChildren,
  useState,
} from "react";

type Layout = {
  title?: string;
  description?: string;
  keywords?: string;
};

const Layout: FunctionComponent<PropsWithChildren<Layout>> = (props) => {
  const { data: session } = useSession();
  const [navbarOpen, setNavbarOpen] = useState(false);

  const links = [
    { href: "/validate", label: "Validate", auth: false },
    { href: "/arrivals", label: "Arrivals", auth: false },
    { href: "/invities", label: "Invities", auth: true },
    { href: "/programs", label: "Programs", auth: true },
    { href: "/accounts", label: "Accounts", auth: true },
  ];

  return (
    <>
      <Head>
        <title>
          {props.title || "Bridgerland Graduation Management Application"}
        </title>
        <meta
          name="description"
          content={
            props.description ||
            "Graduation management system for Bridgerland Technical College"
          }
        />
        <meta
          name="keywords"
          content={
            props.keywords ||
            "Bridgerland, Btech, Graduation, Management, Application"
          }
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="m-0 flex h-full w-full flex-col justify-between bg-orange-50">
        <header className="flex-shrink overflow-hidden shadow-lg shadow-orange-950/10">
          <nav className="t-0 sticky flex w-full flex-wrap items-center justify-between bg-white px-2 py-3 shadow-md lg:relative">
            <Link href="/">
              <Image
                width={60}
                height={60}
                src="/btechlogo.png"
                alt="Btech logo"
              />
            </Link>

            <ul
              className={`fixed left-0 top-0 mt-20 h-full w-full flex-grow flex-col items-start justify-start bg-white lg:relative lg:mt-0 lg:flex lg:max-h-fit lg:w-fit lg:flex-row lg:items-center lg:justify-center ${
                navbarOpen ? "flex" : "hidden"
              }`}
            >
              {links.map((link, i) => {
                if (link.auth) {
                  if (session) {
                    return (
                      <li
                        key={`link-${i}`}
                        className="m-4 flex items-center justify-center lg:m-0 lg:mx-2"
                      >
                        <Link
                          className="rounded-md border border-solid border-red-800 bg-red-700 px-4 py-2 text-lg font-bold text-white"
                          href={link.href}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  } else {
                    return null;
                  }
                } else {
                  return (
                    <li
                      key={`link-${i}`}
                      className="m-4 flex items-center justify-center lg:m-0 lg:mx-2"
                    >
                      <Link
                        className="rounded-md border border-solid border-red-800 bg-red-700 px-4 py-2 text-lg font-bold text-white"
                        href={link.href}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                }
              })}

              <li className="m-4 flex items-center justify-center lg:m-0 lg:mx-2">
                <button
                  type="button"
                  className="rounded-md border border-solid border-red-800 bg-red-700 px-4 py-2 text-lg font-bold text-white"
                  onClick={() => void (session ? signOut() : signIn())}
                >
                  {session ? "Logout" : "Login"}
                </button>
              </li>
            </ul>

            <button
              className="block cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none outline-none focus:outline-none lg:hidden"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-menu-2"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 6l16 0" />
                <path d="M4 12l16 0" />
                <path d="M4 18l16 0" />
              </svg>
            </button>
          </nav>
        </header>
        <main className="flex-1 flex-grow overflow-auto">{props.children}</main>
      </div>
    </>
  );
};

export default Layout;

"use client";

import { signIn } from "next-auth/react";

const LoginForm = () => {
  function handleSubmit(event: any) {
    event.preventDefault();
    signIn("google");
  }

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        className="flex items-center justify-between rounded-full border border-solid border-neutral-300 bg-neutral-100 px-8 py-4 text-lg hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600 dark:hover:bg-neutral-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 32 32"
          className="mr-4 h-5 w-5"
        >
          <defs>
            <path
              id="A"
              d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
            />
          </defs>
          <clipPath id="B">
            <use xlinkHref="#A" />
          </clipPath>
          <g transform="matrix(.727273 0 0 .727273 -.954545 -1.45455)">
            <path d="M0 37V11l17 13z" clipPath="url(#B)" fill="#fbbc05" />
            <path
              d="M0 11l17 13 7-6.1L48 14V0H0z"
              clipPath="url(#B)"
              fill="#ea4335"
            />
            <path
              d="M0 37l30-23 7.9 1L48 0v48H0z"
              clipPath="url(#B)"
              fill="#34a853"
            />
            <path
              d="M48 48L17 24l-4-3 35-10z"
              clipPath="url(#B)"
              fill="#4285f4"
            />
          </g>
        </svg>
        <span>Sign In with Google</span>
      </button>
    </form>
  );
};

export default LoginForm;

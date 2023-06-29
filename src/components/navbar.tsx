type NavbarProps = {};

const Navbar = (props: NavbarProps) => {
  return (
    <div className="flex w-full max-w-4xl border border-solid border-gray-400 bg-white/25 backdrop-blur-md dark:border-gray-900 dark:bg-gray-900/25">
      <div>Logo</div>
      <div>
        <ul>
          <li>Attendees</li>
          <li>Login</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

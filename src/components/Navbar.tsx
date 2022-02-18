import { Link, NavLink } from 'react-router-dom';

const Navbar = (): JSX.Element => {
  return (
    <nav className="flex items-center justify-between px-5 py-2 bg-white shadow-md">
      <div>
        <Link className="text-indigo-600 no-underline inline-block font-semibold text-3xl tracking-tighter" to="/">
          GitLab Reviewer
        </Link>
      </div>
      <div>
        <NavLink className="text-indigo-600 hover:underline ml-6" to="/filters">
          Filters
        </NavLink>
        <NavLink className="text-indigo-600 hover:underline ml-6" to="/settings">
          Settings
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;

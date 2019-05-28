import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class Navbar extends Component {
  public render() {
    return (
      <nav className="flex items-center justify-between flex-wrap bg-blue-darkest px-6 py-4">
        <div>
          <Link className="text-white no-underline inline-block font-semibold text-3xl tracking-tight" to="/">
            GitLab Reviewer
          </Link>

        </div>
        <div>
        <NavLink className="text-blue-light hover:text-white no-underline ml-6" to="/settings">
            Settings
          </NavLink>
        </div>
      </nav>
    );
  }
}

export default Navbar;

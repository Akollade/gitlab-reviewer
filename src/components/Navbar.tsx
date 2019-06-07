import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class Navbar extends Component {
  public render() {
    return (
      <nav className="flex items-center justify-between flex-wrap bg-blue-900 px-6 py-2">
        <div>
          <Link className="text-white no-underline inline-block font-semibold text-3xl tracking-tighter" to="/">
            GitLab Reviewer
          </Link>
        </div>
        <div>
          <NavLink className="text-blue-400 hover:text-white no-underline ml-6" to="/settings">
            Settings
          </NavLink>
        </div>
      </nav>
    );
  }
}

export default Navbar;

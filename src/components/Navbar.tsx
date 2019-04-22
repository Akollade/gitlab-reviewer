import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class Navbar extends Component {
  public render() {
    return (
      <nav className="flex items-center justify-between flex-wrap bg-blue-darkest p-6">
        <div>
          <Link className="text-white no-underline inline-block font-semibold text-3xl tracking-tight" to="/">
            GitLab Reviewer
          </Link>
          <NavLink className="text-blue-light hover:text-white no-underline ml-6" to="/settings">
            Settings
          </NavLink>
        </div>
        <div>
          <a
            className="text-white hover:text-grey no-underline flex "
            href="https://github.com/TheGrowingPlant/gitlab-reviewer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="pr-2 pt-1">Fork me on</p>
            <FontAwesomeIcon icon={faGithub} size="2x" className="text-white hover:text-grey" />
          </a>
        </div>
      </nav>
    );
  }
}

export default Navbar;

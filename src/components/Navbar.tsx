import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

class Navbar extends Component{
  public render() {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-blue-darkest p-6">
            <div className="text-white mr-6">
                <h1 className="font-semibold text-3xl tracking-tight">Gitlab Reviewer</h1>
            </div>
            <div>
                <a href="https://github.com/TheGrowingPlant/gitlab-reviewer" target="_blank">
                    <FontAwesomeIcon icon={faGithub} size="2x" color="white"/>
                </a>
            </div>
        </nav>
    );
  }
}

export default Navbar;

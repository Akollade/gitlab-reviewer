import React, { Component } from 'react';

interface Props {
}

interface State {
}

class Navbar extends Component<Props, State> {

  public render() {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-blue-darkest p-6">
            <div className="text-white mr-6">
                <h1 className="font-semibold text-2xl tracking-tight">Gitlab Reviewer</h1>
            </div>
            <div>
                <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-white mt-4 lg:mt-0">Download</a>
            </div>
        </nav>
    );
  }
}

export default Navbar;

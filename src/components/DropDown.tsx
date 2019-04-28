import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';

interface Props {
  content: React.ReactElement;
  title: string;
}

interface State {
  dropDownOpened: boolean;
}

class DropDown extends Component<Props, State> {
  public state: State = {
    dropDownOpened: true
  };

  public render() {
    const { title, content } = this.props;
    const { dropDownOpened } = this.state;

    return (
      <div className="mx-4 mt-5">
        <div
          className="flex items-center px-4 py-1 text-white bg-blue-darker rounded shadow border-solid border-white border-1 cursor-pointer"
          onClick={() => this.setState({ dropDownOpened: !dropDownOpened })}
        >
          <FontAwesomeIcon icon={dropDownOpened ? faChevronUp : faChevronDown} size="1x" className="mr-3" />
          <p className="font-semibold text-2xl">{title}</p>
        </div>
        {dropDownOpened && content}
      </div>
    );
  }
}

export default DropDown;

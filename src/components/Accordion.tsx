import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';

interface Props {
  content: React.ReactElement;
  title: string;
}

interface State {
  accordionOpened: boolean;
}

class Accordion extends Component<Props, State> {
  public state: State = {
    accordionOpened: true
  };

  constructor(props: Props) {
    super(props);

    this.toggleAccordion = this.toggleAccordion.bind(this);
  }

  public toggleAccordion() {
    this.setState({ accordionOpened: !this.state.accordionOpened });
  }

  public render() {
    const { title, content } = this.props;
    const { accordionOpened } = this.state;

    return (
      <div className="mx-4 mt-5">
        <div
          className="flex items-center px-4 py-1 text-white bg-blue-darker rounded shadow-md cursor-pointer select-none"
          onClick={this.toggleAccordion}
        >
          <FontAwesomeIcon icon={accordionOpened ? faChevronUp : faChevronDown} size="1x" className="mr-3" />
          <p className="font-semibold text-2xl">{title}</p>
        </div>
        {accordionOpened && content}
      </div>
    );
  }
}

export default Accordion;

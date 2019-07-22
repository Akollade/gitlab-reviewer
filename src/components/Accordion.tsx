import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import LocalStorage from 'services/LocalStorage';

interface Props {
  id: number;
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

  public componentDidMount() {
    this.setState({ accordionOpened: LocalStorage.isAccordionOpened(this.props.id) });
  }

  public toggleAccordion() {
    const newState = !this.state.accordionOpened;
    this.setState({ accordionOpened: newState });
    LocalStorage.setAccordionOpened(this.props.id, newState);
  }

  public render() {
    const { title, content } = this.props;
    const { accordionOpened } = this.state;

    return (
      <div className="mx-4 mt-5">
        <div
          className="flex items-center px-4 py-1 text-white bg-blue-900 rounded shadow-md cursor-pointer select-none"
          onClick={this.toggleAccordion}
        >
          <FontAwesomeIcon icon={accordionOpened ? faChevronUp : faChevronDown} size="1x" className="mr-3" />
          <p className="font-semibold text-xl">{title}</p>
        </div>
        {accordionOpened && content}
      </div>
    );
  }
}

export default Accordion;

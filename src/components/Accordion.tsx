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
      <div className="mt-5 bg-white shadow-md rounded">
        <div
          className="flex justify-between items-center px-4 py-2 cursor-pointer select-none text-indigo-600"
          onClick={this.toggleAccordion}
        >
          <p className="font-semibold text-lg">{title}</p>
          <FontAwesomeIcon icon={accordionOpened ? faChevronUp : faChevronDown} size="1x"/>
        </div>
        {accordionOpened && content}
      </div>
    );
  }
}

export default Accordion;

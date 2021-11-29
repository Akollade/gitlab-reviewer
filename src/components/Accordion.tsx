import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import LocalStorage from 'services/LocalStorage';

interface Props {
  id: number;
  content: React.ReactElement;
  title: string;
}

const Accordion = ({ id, content, title }: Props): JSX.Element => {
  const [accordionOpened, setAccordionOpened] = useState(true);

  useEffect(() => {
    setAccordionOpened(LocalStorage.isAccordionOpened(id));
  }, [id]);

  const toggleAccordion = (): void => {
    const newState = !accordionOpened;
    setAccordionOpened(newState);
    LocalStorage.setAccordionOpened(id, newState);
  };

  return (
    <div className="mt-5 bg-white shadow-md rounded">
      <div
        className="flex justify-between items-center px-4 py-2 cursor-pointer select-none text-indigo-600"
        onClick={toggleAccordion}
      >
        <p className="font-semibold text-lg">{title}</p>
        <FontAwesomeIcon icon={accordionOpened ? faChevronUp : faChevronDown} size="1x" />
      </div>
      {accordionOpened && content}
    </div>
  );
};

export default Accordion;

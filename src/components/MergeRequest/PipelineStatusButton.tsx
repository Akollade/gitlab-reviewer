import { Pipeline } from 'types/GitLabTypes';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import LocalStorage from 'services/LocalStorage';

interface Props {
  pipeline: Pipeline | null;
}

const PipelineStatusButton = ({ pipeline }: Props): JSX.Element | null => {
  const getStyleFromStatus = () => {
    if (pipeline === null || pipeline === undefined) {
      return '';
    }

    switch (pipeline.status) {
      case 'SUCCESS': {
        return 'bg-green-500 hover:bg-green-600';
      }
      case 'FAILED': {
        return 'bg-red-500 hover:bg-red-600';
      }
      default: {
        return 'bg-gray-500 hover:bg-grey-600';
      }
    }
  };

  const getTextFromStatus = () => {
    if (pipeline === null || pipeline === undefined) {
      return '';
    }

    switch (pipeline.status) {
      case 'SUCCESS': {
        return <FontAwesomeIcon icon={faCheck} size="1x" />;
      }
      case 'FAILED': {
        return <FontAwesomeIcon icon={faXmark} size="1x" />;
      }
      default: {
        return pipeline.status;
      }
    }
  };

  if (pipeline === null || pipeline === undefined) {
    return null;
  }

  return (
    <a
      className={'inline-block text-white px-2 py-2 rounded shadow font-bold w-10 leading-none ' + getStyleFromStatus()}
      target="_blank"
      rel="noopener noreferrer"
      href={LocalStorage.getUrl() + pipeline.path}
    >
      {getTextFromStatus()}
    </a>
  );
};

export default PipelineStatusButton;

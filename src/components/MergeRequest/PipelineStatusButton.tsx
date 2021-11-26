import { Pipeline } from 'types/GitLabTypes';

interface Props {
  pipeline: Pipeline | null;
}

const PipelineStatusButton = ({ pipeline }: Props): JSX.Element | null => {
  const getStyleFromStatus = () => {
    if (pipeline === null || pipeline === undefined) {
      return '';
    }

    switch (pipeline.status) {
      case 'success': {
        return 'bg-green-500 hover:bg-green-600';
      }
      case 'failed': {
        return 'bg-red-500 hover:bg-red-600';
      }
      default: {
        return 'bg-gray-500 hover:bg-grey-600';
      }
    }
  };

  if (pipeline === null || pipeline === undefined) {
    return null;
  }

  return (
    <a
      className={'inline-block text-white px-2 py-3 rounded shadow font-bold w-20 leading-none ' + getStyleFromStatus()}
      target="_blank"
      rel="noopener noreferrer"
      href={pipeline.web_url}
    >
      {pipeline.status}
    </a>
  );
};

export default PipelineStatusButton;

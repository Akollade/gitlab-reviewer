import React, { Component } from 'react';
import { Pipeline } from 'types/GitLabTypes';

interface Props {
  pipeline: Pipeline;
}

class PipelineStatusButton extends Component<Props> {
  private getStyleFromStatus() {
    const { pipeline } = this.props;

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
  }

  public render() {
    const { pipeline } = this.props;

    return (
      <a
        className={'text-white p-2 rounded shadow font-bold ' + this.getStyleFromStatus()}
        target="_blank"
        rel="noopener noreferrer"
        href={pipeline.web_url}
      >
        { pipeline.status }
      </a>
    );
  }
}

export default PipelineStatusButton;

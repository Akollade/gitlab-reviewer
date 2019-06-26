import Pill from 'components/Pill';
import React, { Component } from 'react';
import { MergeRequest } from 'types/FormattedTypes';
import { PipelineStatus } from 'types/GitLabTypes';

interface Props {
  mergeRequest: MergeRequest;
}

class MergeRequestItem extends Component<Props> {
  public static defaultProps = {
    mergeRequests: []
  };

  private getPipelineClass(pipelineStatus: PipelineStatus) {
    if (pipelineStatus === 'success') {
      return 'text-green-600';
    }

    if (pipelineStatus === 'failed') {
      return 'text-red-600';
    }

    return 'text-gray-600';
  }

  public render() {
    const { mergeRequest } = this.props;

    return (
      <tr>
        <td>
          <a
            className="text-xl no-underline text-black"
            href={mergeRequest.web_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {mergeRequest.title}
          </a>
        </td>
        <td className="w-32 flex justify-center">
          <img
            src={mergeRequest.author.avatar_url}
            alt={mergeRequest.author.name}
            className="border-2 border-gray-500 h-10 w-10"
          />
        </td>
        <td className="w-32 text-center">
          <Pill text={mergeRequest.upvotes} type={mergeRequest.upvotes > 0 ? 'success' : 'disable'} />
        </td>
        <td className="w-32 text-center">
          <Pill text={mergeRequest.downvotes} type={mergeRequest.downvotes > 0 ? 'danger' : 'disable'} />
        </td>
        <td className={'w-32 text-center ' + this.getPipelineClass(mergeRequest.pipeline.status)}>
          <a target="_blank" rel="noopener noreferrer" href={mergeRequest.pipeline.web_url}>
            {mergeRequest.pipeline.status}
          </a>
        </td>
      </tr>
    );
  }
}

export default MergeRequestItem;

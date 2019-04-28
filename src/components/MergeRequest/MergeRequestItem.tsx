import Pill from 'components/Pill';
import React, { Component } from 'react';
import { MergeRequest } from 'types/FormattedTypes';

interface Props {
  mergeRequest: MergeRequest;
}

class MergeRequestItem extends Component<Props> {
  public static defaultProps = {
    mergeRequests: []
  };

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
        <td>
          <img
            src={mergeRequest.author.avatar_url}
            alt={mergeRequest.author.name}
            className="border-2 border-grey h-10 w-10"
          />
        </td>
        <td>
          <Pill text={mergeRequest.upvotes} type={mergeRequest.upvotes > 0 ? 'success' : 'disable'} />
        </td>
        <td>
          <Pill text={mergeRequest.downvotes} type={mergeRequest.downvotes > 0 ? 'danger' : 'disable'} />
        </td>
      </tr>
    );
  }
}

export default MergeRequestItem;

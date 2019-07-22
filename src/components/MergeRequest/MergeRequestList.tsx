import { DownvoteIcon, UpvoteIcon } from 'components/Icons';
import MergeRequestItem from 'components/MergeRequest/MergeRequestItem';
import React, { Component } from 'react';
import { MergeRequest } from 'types/FormattedTypes';

interface Props {
  mergeRequests: MergeRequest[];
}

class MergeRequestList extends Component<Props> {
  public static defaultProps: Props = {
    mergeRequests: []
  };

  public render() {
    const { mergeRequests } = this.props;

    const listItems = mergeRequests.map((mergeRequest: MergeRequest) => (
      <MergeRequestItem key={mergeRequest.id} mergeRequest={mergeRequest} />
    ));

    return (
      <div className="pl-3">
        <table className="w-full">
          <thead className="text-2xl">
            <tr>
              <th>Title</th>
              <th className="w-32 text-center">Author</th>
              <th className="w-32 text-center">My vote</th>
              <th className="w-32 text-center">
                <UpvoteIcon />
              </th>
              <th className="text-center">
                <DownvoteIcon />
              </th>
              <th className="text-center">CI</th>
            </tr>
          </thead>
          <tbody>{listItems}</tbody>
        </table>
      </div>
    );
  }
}

export default MergeRequestList;

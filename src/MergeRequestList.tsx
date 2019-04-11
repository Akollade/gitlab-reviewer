import React, { Component } from 'react';
import './App.css';
import MergeRequestItem from './MergeRequestItem';
import { MergeRequestType } from './types';

interface Props {
    mergeRequests: [MergeRequestType];
}

interface State {
}

class MergeRequestList extends Component<Props, State> {
  public static defaultProps = {
    mergeRequests: []
  };

  public render() {
    let { mergeRequests } = this.props ;

    const listItems = mergeRequests.map((mergeRequest: any) =>
      <MergeRequestItem key={mergeRequest.id} mergeRequest={mergeRequest} />
    );

    return (
        <table>
          <thead>
            <th>Title</th>
            <th>Author</th>
            <th>+1</th>
            <th>-1</th>
          </thead>
          <tbody>{listItems}</tbody>
        </table>
    );
  }
}

export default MergeRequestList;

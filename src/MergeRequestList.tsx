import React, { Component } from 'react';
import './App.css';
import MergeRequestItem from './MergeRequestItem';

interface Props {
    mergeRequests: [any];
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
        <ul>{listItems}</ul>
    );
  }
}

export default MergeRequestList;

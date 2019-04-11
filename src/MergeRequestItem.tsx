import React, { Component } from 'react';
import './App.css';

interface Props {
    mergeRequest: any;
}

interface State {
}

class MergeRequestItem extends Component<Props, State> {
  public static defaultProps = {
    mergeRequests: []
  };

  public render() {
    let { mergeRequest } = this.props ;

    return (
        <tr>
          <td>{mergeRequest.title}</td>
          <td>{mergeRequest.author.name}</td>
        </tr>
    );
  }
}

export default MergeRequestItem;

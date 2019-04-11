import React, { Component } from 'react';
import './App.css';
import { MergeRequestType } from './types';

interface Props {
    mergeRequest: MergeRequestType;
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
          <td><a href={mergeRequest.web_url} target="blank">{mergeRequest.title}</a></td>
          <td>{mergeRequest.author.name}</td>
          <td>{mergeRequest.upvotes}</td>
          <td>{mergeRequest.downvotes}</td>
        </tr>
    );
  }
}

export default MergeRequestItem;

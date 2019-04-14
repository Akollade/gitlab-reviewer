import React, { Component } from 'react';
import './App.css';
import { MergeRequestType } from './types/MergeRequest';

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
          <td><img src={mergeRequest.author.avatar_url} alt={mergeRequest.author.name} width="35px" /></td>
          <td>{mergeRequest.upvotes}</td>
          <td>{mergeRequest.downvotes}</td>
        </tr>
    );
  }
}

export default MergeRequestItem;

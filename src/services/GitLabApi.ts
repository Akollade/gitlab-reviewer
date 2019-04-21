import axios, { AxiosInstance } from 'axios';

import { MergeRequestType } from '../types/MergeRequest';

import LocalStorage from './LocalStorage';

export class GitLabApi {
  private axios: AxiosInstance;

  constructor(url: string, privateToken: string) {
    this.axios = axios.create({
      baseURL: url + '/api/v4',
      timeout: 5000,
      headers: { 'PRIVATE-TOKEN': privateToken }
    });
  }

  public async getMergeRequests(): Promise<MergeRequestType[]> {
    const mergeRequestsResponse = await this.axios.get('/merge_requests?state=opened&scope=all&order_by=updated_at');
    return mergeRequestsResponse.data;
  }

  public async isAuthenticated(): Promise<boolean> {
    try {
      await this.axios.get('/user');
      return true;
    } catch (error) {
      return false;
    }
  }
}

export function createGitLabApi(): GitLabApi {
  const url = LocalStorage.getUrl();
  const privateToken = LocalStorage.getPrivateToken();

  if (!url || !privateToken) {
    throw new Error('Url or Private Token not stored');
  }

  return new GitLabApi(url, privateToken);
}

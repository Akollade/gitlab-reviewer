import axios, { AxiosInstance } from 'axios';
import LocalStorage from 'services/LocalStorage';
import { MergeRequest, Project } from 'types/FormattedTypes';
import { EmojiType, MergeRequestSimpleType, MergeRequestType, ProjectType, User } from 'types/GitLabTypes';

export class GitLabApi {
  private axios: AxiosInstance;

  constructor(url: string, privateToken: string) {
    this.axios = axios.create({
      baseURL: url + '/api/v4',
      timeout: 5000,
      headers: { 'PRIVATE-TOKEN': privateToken },
    });
  }

  public async getMergeRequests(): Promise<MergeRequest[]> {
    const mergeRequestsResponse = await this.axios.get(
      '/merge_requests?state=opened&scope=all&order_by=updated_at&view=simple&per_page=100'
    );
    return await this.getDetailedMergeRequests(mergeRequestsResponse.data);
  }

  private async getMergeRequest(projectId: number, mergeRequestIid: number): Promise<MergeRequest> {
    const { data: mergeRequest } = await this.axios.get(
      '/projects/' + projectId + '/merge_requests/' + mergeRequestIid
    );

    const emojis = await this.getEmojisForMergeRequest(projectId, mergeRequestIid);

    const upvoters = emojis
      .filter((emoji: EmojiType) => emoji.name === 'thumbsup')
      .map((emoji: EmojiType) => emoji.user);
    const downvoters = emojis
      .filter((emoji: EmojiType) => emoji.name === 'thumbsdown')
      .map((emoji: EmojiType) => emoji.user);

    return { ...(mergeRequest as MergeRequestType), emojis, upvoters, downvoters };
  }

  private async getEmojisForMergeRequest(projectId: number, mergeRequestIid: number): Promise<EmojiType[]> {
    const { data: emojis } = await this.axios.get(
      '/projects/' + projectId + '/merge_requests/' + mergeRequestIid + '/award_emoji'
    );

    return emojis;
  }

  private async getDetailedMergeRequests(mergeRequests: MergeRequestSimpleType[]): Promise<MergeRequest[]> {
    const mergeRequestsFetchPromises: Promise<MergeRequest>[] = [];

    mergeRequests.forEach((mergeRequest: MergeRequestSimpleType) => {
      mergeRequestsFetchPromises.push(this.getMergeRequest(mergeRequest.project_id, mergeRequest.iid));
    });

    return await Promise.all(mergeRequestsFetchPromises);
  }

  private async getProject(projectId: number): Promise<ProjectType> {
    const projectResponse = await this.axios.get('/projects/' + projectId + '?simple=true');
    return projectResponse.data;
  }

  public async getProjectsWithMergeRequests(): Promise<Project[]> {
    const mergeRequests = await this.getMergeRequests();
    const projects = await this.getProjectsForMergeRequests(mergeRequests);

    const bundledProjects: Project[] = projects.map((project: ProjectType): Project => {
      const mergeRequestsForProject = mergeRequests.filter(
        (mergeRequest: MergeRequest) => mergeRequest.project_id === project.id
      );

      return { ...project, mergeRequests: mergeRequestsForProject };
    });

    return bundledProjects;
  }

  private async getProjectsForMergeRequests(mergeRequests: MergeRequestType[]): Promise<ProjectType[]> {
    const projectsIds: number[] = [];

    mergeRequests.forEach((mergeRequest: MergeRequestType) => {
      if (projectsIds.indexOf(mergeRequest.project_id) === -1) {
        projectsIds.push(mergeRequest.project_id);
      }
    });

    const projectsFetchPromises = projectsIds.map((projectId: number) => this.getProject(projectId));

    return await Promise.all(projectsFetchPromises);
  }

  public async getUser(): Promise<User> {
    const { data: user } = await this.axios.get('/user');

    return user;
  }

  public async isAuthenticated(): Promise<boolean> {
    try {
      await this.getUser();
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

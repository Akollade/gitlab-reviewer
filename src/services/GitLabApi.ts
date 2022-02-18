import axios, { AxiosInstance } from 'axios';
import LocalStorage from 'services/LocalStorage';
import { MergeRequest, Project } from 'types/FormattedTypes';
import { EmojiType, MergeRequestSimpleType, MergeRequestType, ProjectType, User } from 'types/GitLabTypes';

interface ProjectTypeResponse {
  data: ProjectType[];
}

export class GitLabApi {
  private axios: AxiosInstance;

  constructor(url: string, privateToken: string) {
    this.axios = axios.create({
      baseURL: url + '/api/v4',
      timeout: 20000,
      headers: { 'PRIVATE-TOKEN': privateToken },
    });
  }

  public async getMergeRequests(): Promise<MergeRequest[]> {
    const mergeRequestsResponse = await this.axios.get(
      '/merge_requests?state=opened&scope=all&order_by=updated_at&view=simple&per_page=10'
    );
    return await this.getDetailedMergeRequests(mergeRequestsResponse.data);
  }

  public async getProjectByPage(page: string | number): Promise<ProjectTypeResponse> {
    return await this.axios.get(`/projects?per_page=100&page=${page}&simple=true`);
  }
  public async getAllProjectsFromPage(page: number): Promise<ProjectType[]> {
    const { data, headers } = await this.axios.get(`/projects?per_page=100&page=${page}&simple=true`);
    const totalPages = headers['x-total-pages'];
    if (totalPages) {
      const totalPagesInt = parseInt(totalPages, 10);
      if (!isNaN(totalPagesInt)) {
        if (totalPagesInt !== page && totalPagesInt > page) {
          const totalPagesArr = Array.from({ length: totalPagesInt - page + 1 }, (v, k) => k + page + 1);
          const promises = totalPagesArr.map((page) => this.getProjectByPage(page));
          const allPagesData = await Promise.all(promises);
          return allPagesData
            .flat(1)
            .map((project) => project.data)
            .flat(1);
        }
      }
    }
    return data;
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

  private async getMergeRequestByProject(projectId: number): Promise<MergeRequest[]> {
    const { data } = await this.axios.get('/projects/' + projectId + '/merge_requests?state=opened');
    const mergeRequestsFetchPromises: Promise<MergeRequest>[] = [];

    data.forEach((request: any) => {
      mergeRequestsFetchPromises.push(this.getMergeRequest(projectId, request.iid));
    });
    return Promise.all(mergeRequestsFetchPromises);
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
  private async getProjects(): Promise<ProjectType[]> {
    const selectedProjects = LocalStorage.getSelectedProjects();
    const mergeRequestsFetchPromises: Promise<ProjectType>[] = [];
    selectedProjects.forEach((id) => {
      mergeRequestsFetchPromises.push(this.getProject(id));
    });

    return await Promise.all(mergeRequestsFetchPromises);
  }

  private async getProjectsMergeRequests(): Promise<MergeRequest[]> {
    const selectedProjects = LocalStorage.getSelectedProjects();
    const mergeRequestsFetchPromises: Promise<MergeRequest[]>[] = [];
    selectedProjects.forEach((id) => {
      mergeRequestsFetchPromises.push(this.getMergeRequestByProject(id));
    });

    const results = await Promise.all(mergeRequestsFetchPromises);
    return results.flat(1);
  }

  public async getProjectsWithMergeRequests(): Promise<Project[]> {
    const projects = await this.getProjects();
    const data = await this.getProjectsMergeRequests();
    const mergeRequests: Array<MergeRequest> = data;
    const bundledProjects: Project[] = projects.map((project: ProjectType): Project => {
      const mergeRequestsForProject = mergeRequests.filter(
        (mergeRequest: MergeRequest) => mergeRequest.project_id === project.id
      );
      return { ...project, mergeRequests: mergeRequestsForProject };
    });

    return bundledProjects;
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

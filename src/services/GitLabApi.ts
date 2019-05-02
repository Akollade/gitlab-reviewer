import axios, { AxiosInstance } from 'axios';
import LocalStorage from 'services/LocalStorage';
import { Project } from 'types/FormattedTypes';
import { MergeRequestType, ProjectType } from 'types/GitLabTypes';

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

  public async getProject(projectId: number): Promise<ProjectType> {
    const mergeRequestsResponse = await this.axios.get('/projects/' + projectId + '?simple=true');
    return mergeRequestsResponse.data;
  }

  public async getBundledProjects(): Promise<Project[]> {
    const mergeRequests = await this.getMergeRequests();
    const projects = await this.getProjectsForMergeRequests(mergeRequests);

    const bundledProjects: Project[] = projects.map(
      (project: ProjectType): Project => {
        const mergeRequestsForProject = mergeRequests.filter(
          (mergeRequest: MergeRequestType) => mergeRequest.project_id === project.id
        );

        return { ...project, mergeRequests: mergeRequestsForProject };
      }
    );

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

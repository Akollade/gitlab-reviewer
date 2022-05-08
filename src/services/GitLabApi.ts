import { Project } from 'types/FormattedTypes';
import { User } from 'types/GitLabTypes';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import LocalStorage from './LocalStorage';

export class GitLabApi {
  private client: ApolloClient<any>;

  constructor(url: string, privateToken: string) {
    this.client = new ApolloClient<any>({
      uri: url + '/api/graphql',
      headers: { 'PRIVATE-TOKEN': privateToken },
      cache: new InMemoryCache(),
    });
  }

  static createGitLabApi(): GitLabApi {
    const url = LocalStorage.getUrl();
    const privateToken = LocalStorage.getPrivateToken();

    if (!url || !privateToken) {
      throw new Error('Url or Private Token not stored');
    }

    return new GitLabApi(url, privateToken);
  }

  public getClient(): ApolloClient<any> {
    return this.client;
  }

  public async getProjectsWithMergeRequests(): Promise<Project[]> {
    const GET_PROJECTS_WITH_MERGE_REQUESTS = gql`
      query {
        projects {
          nodes {
            id
            name
            nameWithNamespace
            lastActivityAt
            avatarUrl
            mergeRequests(sort: UPDATED_DESC, state: opened) {
              nodes {
                id
                author {
                  id
                  name
                  username
                  avatarUrl
                  webUrl
                }
                title
                webUrl
                upvotes
                downvotes
                headPipeline {
                  active
                  complete
                  status
                  path
                }
                approvalsLeft
                approvalsRequired
                approvalState {
                  rules {
                    approved
                  }
                }
                approvedBy {
                  nodes {
                    id
                    name
                    username
                    avatarUrl
                    webUrl
                  }
                }
              }
            }
          }
        }
      }
    `;
    const response = await this.client.query<{ projects: { nodes: Project[] } }>({
      query: GET_PROJECTS_WITH_MERGE_REQUESTS,
    });

    return response.data.projects.nodes;
  }

  public async getUser(): Promise<User> {
    const GET_USER = gql`
      query {
        currentUser {
          id
          name
          avatarUrl
          webUrl
        }
      }
    `;
    const response = await this.client.query<{ currentUser: User }>({ query: GET_USER });

    return response.data.currentUser;
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

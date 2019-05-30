import { MergeRequestType, ProjectType } from 'types/GitLabTypes';

export type MergeRequest = MergeRequestType;

export interface Project extends ProjectType {
  mergeRequests: MergeRequest[];
}

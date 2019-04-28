import { MergeRequestType, ProjectType } from 'types/GitLabTypes';

export interface MergeRequest extends MergeRequestType { }

export interface Project extends ProjectType {
  mergeRequests: MergeRequest[];
}


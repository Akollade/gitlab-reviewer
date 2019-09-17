import { MergeRequestType, ProjectType, EmojiType, User } from 'types/GitLabTypes';

export interface MergeRequest extends MergeRequestType {
  emojis: EmojiType[];
  upvoters: User[];
  downvoters: User[];
};

export interface Project extends ProjectType {
  mergeRequests: MergeRequest[];
}

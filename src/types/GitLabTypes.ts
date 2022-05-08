export interface User {
  id: number;
  name: string;
  username: string;
  avatarUrl: string | undefined;
  webUrl: string;
}

type PipelineStatus = 'RUNNING' | 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELED' | 'SKIPPED';
export interface Pipeline {
  path: string;
  status: PipelineStatus;
}

export interface MergeRequestType {
  id: number;
  title: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  author: User;
  approvalsLeft: number;
  approvalsRequired: number;
  approvalState: {
    rules: {
      approved: boolean;
    };
  };
  approvedBy: {
    nodes: User[];
  };
  assignees: User[];
  assignee: User;
  reviewers: User[];
  labels: string[];
  draft: boolean;
  userNotesCount: number;
  webUrl: string;
  taskCompletionStatus: {
    count: number;
    completedCount: number;
  };
  shouldBeRebased: boolean;
  headPipeline: Pipeline;
}

export interface ProjectType {
  id: number;
  webUrl: string;
  name: string;
  nameWithNamespace: string;
  lastActivityAt: string;
  avatarUrl: string;
}

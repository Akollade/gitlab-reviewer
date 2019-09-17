type UserState = 'active' | 'blocked';

export interface User {
  id: number;
  name: string;
  username: string;
  state: UserState;
  avatar_url: string | undefined;
  web_url: string;
}

interface Milestone {
  id: number;
  iid: number;
  project_id: number;
  title: string;
  description: string;
  state: 'active' | 'closed';
  created_at: string;
  updated_at: string;
  due_date: string;
  start_date: boolean;
  web_url: string;
}

type PipelineStatus = 'running' | 'pending' | 'success' | 'failed' | 'canceled' | 'skipped';
export interface Pipeline {
  web_url: string;
  status: PipelineStatus;
}

type MergeRequesState = 'opened' | 'closed' | 'locked' | 'merged';
type MergeRequestStatus = 'can_be_merged' | 'unchecked';

export interface MergeRequestSimpleType {
  id: number;
  iid: number;
  project_id: number;
  title: string;
  description: string;
  state: MergeRequestStatus;
  created_at: string;
  updated_at: string;
  web_url: string;
}

export interface MergeRequestType {
  id: number;
  iid: number;
  project_id: number;
  title: string;
  description: string;
  state: MergeRequestStatus;
  merged_by: User;
  merged_at: string | null;
  closed_by: User | null;
  closed_at: string | null;
  created_at: string;
  updated_at: string;
  target_branch: string;
  source_branch: string;
  upvotes: number;
  downvotes: number;
  author: User;
  assignee: User;
  source_project_id: number;
  target_project_id: number;
  labels: string[];
  work_in_progress: boolean;
  milestone: Milestone;
  merge_when_pipeline_succeeds: boolean;
  merge_status: MergeRequestStatus;
  sha: string;
  merge_commit_sha: string | null;
  user_notes_count: number;
  discussion_locked: boolean | null;
  should_remove_source_branch: boolean | null;
  force_remove_source_branch: boolean;
  allow_collaboration: boolean;
  allow_maintainer_to_push: boolean;
  web_url: string;
  time_stats: {
    time_estimate: number;
    total_time_spent: number;
    human_time_estimate: number;
    human_total_time_spent: number;
  };
  squash: boolean;
  approvals_before_merge: number | null;
  pipeline: Pipeline;
}

export interface ProjectType {
  id: number;
  description: string | null;
  default_branch: string;
  ssh_url_to_repo: string;
  http_url_to_repo: string;
  web_url: string;
  readme_url: string;
  tag_list: string[];
  name: string;
  name_with_namespace: string;
  path: string;
  path_with_namespace: string;
  created_at: string;
  last_activity_at: string;
  forks_count: number;
  avatar_url: string;
  star_count: number;
}

export interface EmojiType {
  id: number;
  name: string;
  user: User;
}

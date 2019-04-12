export interface MergeRequestType {
    id: number;
    title: string;
    upvotes: number;
    downvotes: number;
    web_url: string;
    author: {
        name: string;
        avatar_url: string;
    }
}
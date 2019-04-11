export interface MergeRequestType {
    title: string;
    upvotes: number;
    downvotes: number;
    web_url: string;
    author: {
        name: string;
    }
}
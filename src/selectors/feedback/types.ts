export interface FeedbackPostDataContent {
    readonly bc211Id: string;
    readonly name?: string;
    readonly organization?: string;
    readonly description?: string;
    readonly address?: string;
    readonly phone?: string;
    readonly website?: string;
    readonly email?: string;
    readonly removalReason?: string;
    readonly other?: string;
}

export interface FeedbackPostDataAuthor {
    readonly authorIsEmployee?: string;
    readonly authorEmail?: string;
    readonly authorName?: string;
    readonly authorOrganization?: string;
    readonly authorJobTitle?: string;
}

export type FeedbackPostData = FeedbackPostDataContent & FeedbackPostDataAuthor;
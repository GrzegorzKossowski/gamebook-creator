export interface Status {
    dead?: boolean;
    end?: boolean;
    fixed?: boolean;
    ready?: boolean;
    start?: boolean;
    win?: boolean;
}

export interface Chapter {
    id: string;
    chapterNumber: number;
    title: string;
    content?: string;
    status?: Status;
}

export interface GameBookState {
    authorName: string;
    gamebookTitle: string;
    selectedId: string | undefined;
    chapters: Chapter[];
}

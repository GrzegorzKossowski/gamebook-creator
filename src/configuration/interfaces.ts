export interface IStatus {
    dead?: boolean | undefined;
    end?: boolean | undefined;
    fixed?: boolean | undefined;
    ready?: boolean | undefined;
    start?: boolean | undefined;
    win?: boolean | undefined;
}

export interface IChapter {
    id: string;
    chapterNumber: number;
    title: string;
    content?: string;
    status?: IStatus;
}

export interface IGameBookState {
    authorName: string;
    gamebookTitle: string;
    selectedId: string | undefined;
    chapters: IChapter[];
}

export interface IGraphNode {
    id: string | number;
    label: string;
    title?: string;
    color?: string;
    opacity?: number;
}
export interface IGraphEdge {
    from: string | number;
    to: string | number;
    id?: string | number;
    label?: string;
    title?: string;
}
export interface IGraph {
    nodes: IGraphNode[];
    edges: IGraphEdge[];
}

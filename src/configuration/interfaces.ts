export interface ModalProps {
    isVisible: boolean;
    setIsVisible: Function;
}

export interface IStatus {
    dead?: boolean | undefined;
    fixed?: boolean | undefined;
    ready?: boolean | undefined;
    start?: boolean | undefined;
    win?: boolean | undefined;
}

export interface IChapter {
    id: string;
    chapterNumber: number;
    title: string;
    oldNumber?: number;
    content?: string;
    status?: IStatus;
}

export interface IGameBookMetadata {
    authorName: string;
    gamebookTitle: string;
    introduction: string;
    selectedId: string | undefined;
}
export interface IGameBookState {
    authorName: string;
    gamebookTitle: string;
    introduction: string;
    selectedId: string | undefined;
    chapters: IChapter[];
    isDbMetadata?: boolean;
}

export interface IGraphNode {
    id: string | number;
    label: string;
    title?: string;
    color?: string;
    opacity?: number;
    font?: {
        color?: string;
    };
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

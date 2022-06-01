import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { IGameBookState, IChapter } from 'configuration/interfaces';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { CONFIG } from 'configuration';

const initialState: IGameBookState = {
    authorName: 'John Doe',
    gamebookTitle: 'Very new title',
    selectedId: undefined,
    chapters: [
        {
            id: CONFIG.FIRST_CHAPTER_ID,
            chapterNumber: 1,
            title: 'First chapter - the journey begins.',
            content: 'Link to chapter {2}, {4}, empty {}',
            status: {
                start: true,
                fixed: true,
                ready: true,
            },
        },
        ...Array.from({ length: 5 }, (_, i) => {
            return {
                id: uuidv4(),
                chapterNumber: i + 2,
                title: faker.lorem.lines(1),
                content:
                    faker.lorem.paragraphs(1) +
                    ` link to {${
                        Math.floor(Math.random() * (i - 2)) + 6
                    }}, link to {${
                        Math.floor(Math.random() * (i - 2)) + 10
                    }}, link to {}`,
                status: {
                    fixed: Math.random() < 0.5,
                    // end: Math.random() < 0.9 && Math.random() > 0.85,
                    dead: Math.random() < 0.92 && Math.random() > 0.9,
                    win: Math.random() > 0.92,
                    ready: faker.datatype.boolean(),
                },
            };
        }),
    ],
};

export const gameBookStateSlice = createSlice({
    name: 'gamebook',
    initialState,
    reducers: {
        setGamebookAuthor: (state, { payload }: PayloadAction<string>) => {
            state.authorName = payload;
        },
        setGamebookTitle: (state, { payload }: PayloadAction<string>) => {
            state.gamebookTitle = payload;
        },
        setGamebookInitialData: (
            state,
            {
                payload,
            }: PayloadAction<{ authorName: string; gamebookTitle: string }>
        ) => {
            state.gamebookTitle = payload.gamebookTitle;
            state.authorName = payload.authorName;
        },
        setSelectedChapterId: (state, { payload }: PayloadAction<string>) => {
            state.selectedId = payload;
        },
        createNewChapter: (state, { payload }: PayloadAction<string>) => {
            const newId = uuidv4();
            state.chapters = [
                ...state.chapters,
                {
                    id: newId,
                    chapterNumber: state.chapters.length + 1,
                    title: payload,
                    content: '',
                    status: {},
                },
            ];
            state.selectedId = newId;
        },
        addNewChapter: (state, { payload }: PayloadAction<IChapter>) => {
            const newId = uuidv4();
            state.chapters = [
                ...state.chapters,
                {
                    id: newId,
                    chapterNumber: state.chapters.length + 1,
                    title: payload.title,
                    content: payload.content || '',
                    status: {
                        ...payload.status,
                    },
                },
            ];
            state.selectedId = newId;
        },
        updateChapter: (state, { payload }: PayloadAction<IChapter>) => {
            state.chapters = state.chapters.map(chapter => {
                if (chapter.id === payload.id) {
                    payload = {
                        ...payload,
                        status: {
                            ...payload.status,
                            fixed:
                                chapter.id === CONFIG.FIRST_CHAPTER_ID
                                    ? true
                                    : payload.status?.fixed,
                        },
                    };
                    return payload;
                }
                return chapter;
            });
        },
    },
});

export const {
    setGamebookAuthor,
    setGamebookTitle,
    setGamebookInitialData,
    setSelectedChapterId,
    createNewChapter,
    updateChapter,
    addNewChapter,
} = gameBookStateSlice.actions;

export const otherReducer = (state: RootState) => {
    // console.log(state.gamebook.chapters);
};
export default gameBookStateSlice.reducer;

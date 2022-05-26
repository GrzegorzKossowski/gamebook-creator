import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { GameBookState, Chapter } from 'configuration/interfaces';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

const initialState: GameBookState = {
    authorName: 'John Doe',
    gamebookTitle: 'Very new title',
    selectedId: undefined,
    chapters: [
        {
            id: uuidv4(),
            chapterNumber: 1,
            title: 'First chapter whit very long title it is.',
            content: '',
            status: {
                start: true,
                fixed: true,
                ready: true,
            },
        },
        ...Array.from({ length: 10 }, (_, i) => {
            return {
                id: uuidv4(),
                chapterNumber: i + 2,
                title: faker.company.catchPhrase(),
                content: faker.lorem.paragraphs(5),
                status: {
                    fixed: Math.random() < 0.5,
                    end: Math.random() < 0.9 && Math.random() > 0.85,
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
            state.chapters = [
                ...state.chapters,
                {
                    id: uuidv4(),
                    chapterNumber: state.chapters.length + 1,
                    title: payload,
                    content: '',
                    status: {},
                },
            ];
        },
    },
});

export const {
    setGamebookAuthor,
    setGamebookTitle,
    setGamebookInitialData,
    setSelectedChapterId,
    createNewChapter,
} = gameBookStateSlice.actions;
export const otherReducer = (state: RootState) => {
    // console.log(state.gamebook.chapters);
};
export default gameBookStateSlice.reducer;

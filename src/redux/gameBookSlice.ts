import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { GameBookState } from 'configuration/interfaces';
import { faker } from '@faker-js/faker';

const initialState: GameBookState = {
    authorName: 'John Doe',
    gamebookTitle: 'Very new title',
    selectedId: undefined,
    chapters: [
        {
            id: Math.random().toString(16).slice(2, 12),
            chapterNumber: 1,
            title: 'First chapter whit very long title it is.',
            content: '',
            status: {
                start: true,
                fixed: true,
                ready: true,
            },
        },
        ...Array.from({ length: 20 }, (_, i) => {
            return {
                id: Math.random().toString(16).slice(2, 12),
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
    },
});

export const {
    setGamebookAuthor,
    setGamebookTitle,
    setGamebookInitialData,
    setSelectedChapterId,
} = gameBookStateSlice.actions;
export const otherReducer = (state: RootState) => {
    // console.log(state.gamebook.chapters);
};
export default gameBookStateSlice.reducer;

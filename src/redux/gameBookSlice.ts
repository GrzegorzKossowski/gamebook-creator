import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from './store';
import { IGameBookState, IChapter } from 'configuration/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { CONFIG } from 'configuration';
import { chapters } from './dummyData';

const initialState: IGameBookState = {
    authorName: 'John Doe',
    gamebookTitle: 'Very new title',
    selectedId: undefined,
    chapters: chapters,
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
        resetSelectedChapter: state => {
            state.selectedId = undefined;
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
        deleteChapterById: (state, { payload }: PayloadAction<IChapter>) => {
            if (payload.id !== CONFIG.FIRST_CHAPTER_ID) {
                state.chapters = state.chapters
                    .filter(chapter => chapter.id !== payload.id)
                    .map((chapter, index) => {
                        return {
                            ...chapter,
                            chapterNumber: index + 1,
                            content: chapter.content
                                ?.replaceAll(`{${payload.chapterNumber}}`, `{}`)
                                .replace(/(\d+)/g, function (match) {
                                    if (
                                        parseInt(match) >
                                            payload.chapterNumber &&
                                        parseInt(match) <= state.chapters.length
                                    )
                                        return `${parseInt(match) - 1}`;
                                    return match;
                                }),
                            status: {
                                ...chapter.status,
                                ready: chapter.content?.includes(
                                    `{${payload.chapterNumber}}`
                                )
                                    ? undefined
                                    : chapter?.status?.ready,
                            },
                        };
                    });

                state.selectedId = undefined;
            }
        },
        setShuffledChapters: (
            state,
            { payload }: PayloadAction<IChapter[]>
        ) => {
            state.chapters = payload;
        },
    },
});

export const {
    setGamebookAuthor,
    setGamebookTitle,
    setGamebookInitialData,
    setSelectedChapterId,
    resetSelectedChapter,
    createNewChapter,
    updateChapter,
    addNewChapter,
    deleteChapterById,
    setShuffledChapters,
} = gameBookStateSlice.actions;

export const otherReducer = (state: RootState) => {};
export const shuffleChapters =
    () => (dispatch: AppDispatch, getState: Function) => {
        dispatch(resetSelectedChapter());
        const chapters = [...getState().gamebook.chapters];
        // divide in two
        let toShuffle = chapters
            .map(ch => {
                return {
                    ...ch,
                    oldNumber: ch.chapterNumber,
                };
            })
            .filter(ch => !ch.status.fixed)
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
        let fxChapters = chapters.map(ch => (ch.status.fixed ? ch : null));
        // rejoin arrays
        for (let i = 0; i < chapters.length; i++) {
            if (fxChapters[i] === null) {
                let newCh = toShuffle.shift();
                fxChapters[i] = { ...newCh, chapterNumber: i + 1 };
            }
        }
        const oldNumbers = fxChapters.map(chapter => chapter.oldNumber);
        fxChapters = fxChapters.map(chapter => {
            return {
                ...chapter,
                content: chapter.content.replace(
                    /\{(\d+)\}/g,
                    function (match: string) {
                        const number = parseInt(match.slice(1, -1));
                        if (number > fxChapters.length) return `{${number}}`;
                        return `{${oldNumbers.indexOf(number) + 1}}`;
                    }
                ),
            };
        });
        dispatch(setShuffledChapters(fxChapters));
    };
export default gameBookStateSlice.reducer;

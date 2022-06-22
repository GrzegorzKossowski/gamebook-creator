import { IGameBookMetadata } from 'configuration/interfaces';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from './store';
import { IGameBookState, IChapter, IStatus } from 'configuration/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { CONFIG } from 'configuration';
import { chapters, introduction } from './dummyData';
import { DBManager } from 'IndexedDB/DBManager';

// create local database with tables/collections
const db = new DBManager('gamebook_db', ['metadata', 'chapters']);

// https://redux-toolkit.js.org/api/createAsyncThunk
/**
 * Fetches all data from DB and returns it to extraReducer
 */
export const fetchDbData = createAsyncThunk('data/fetchData', async () => {
    const mtd = await new Promise((resolve, reject) => {
        db.getObject('metadata', 'details', (metadata: any) => {
            resolve(metadata);
            reject('reject');
        });
    })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.log(error);
        });
    const chpt = await new Promise((resolve, reject) => {
        db.getAllObjects('chapters', (chapters: IChapter[]) => {
            resolve(chapters.sort((a, b) => a.chapterNumber - b.chapterNumber));
            reject(undefined);
        });
    })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.log(error);
        });
    return await Promise.all([mtd, chpt]).then(values => {
        return {
            ...(values[0] as IGameBookMetadata),
            chapters: values[1] as IChapter[],
        };
    });
});

const initialState: IGameBookState = {
    authorName: '',
    gamebookTitle: '',
    introduction: introduction,
    selectedId: undefined,
    chapters: chapters,
    isDbMetadata: false,
};

export const gameBookStateSlice = createSlice({
    name: 'gamebook',
    initialState,
    reducers: {
        setGamebookMetadata: (
            state,
            { payload }: PayloadAction<IGameBookMetadata>
        ) => {
            state.gamebookTitle = payload.gamebookTitle;
            state.authorName = payload.authorName;
            state.introduction = payload.introduction;
            state.selectedId = payload.selectedId;
        },
        setChapters: (state, { payload }: PayloadAction<IChapter[]>) => {
            state.chapters = payload;
        },
        addNewChapter: (state, { payload }: PayloadAction<IChapter>) => {
            state.chapters = [...state.chapters, { ...payload }];
            state.selectedId = payload.id;
        },
        setSelectedChapterId: (
            state,
            { payload }: PayloadAction<string | undefined>
        ) => {
            state.selectedId = payload;
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
        resetSelectedChapter: state => {
            state.selectedId = undefined;
        },
        setIsDbMetadata: (state, { payload }: PayloadAction<boolean>) => {
            state.isDbMetadata = payload;
        },
    },
    extraReducers: builder => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(
                fetchDbData.fulfilled,
                (state, { payload }: PayloadAction<IGameBookState>) => {
                    return {
                        ...initialState,
                        authorName: payload.authorName,
                        gamebookTitle: payload.gamebookTitle,
                        introduction: payload.introduction,
                        selectedId: payload.selectedId,
                        chapters: payload.chapters,
                    };
                }
            )
            .addDefaultCase(state => {});
    },
});

export const {
    setChapters,
    setGamebookMetadata,
    addNewChapter,
    setSelectedChapterId,
    updateChapter,
    resetSelectedChapter,
    setIsDbMetadata,
} = gameBookStateSlice.actions;

/**
 * Creates new gamebook data
 * @param props authorName, gamebookTitle
 * @returns void
 */
export const createNewGamebookDB =
    (props: {
        authorName: string;
        gamebookTitle: string;
        introduction: string;
    }) =>
    (dispatch: AppDispatch, getState: Function) => {
        try {
            // clear if objects
            db.clearStore('metadata');
            // create metadata in DB
            db.createObject('metadata', {
                id: 'details',
                ...props,
                selectedId: undefined,
            });
            // create metadata in redux
            dispatch(setGamebookMetadata({ ...props, selectedId: undefined }));
            // clear store
            db.clearStore('chapters');
            // create chapters in DB
            chapters.forEach(chapter => {
                db.createObject('chapters', chapter);
            });
            // create chapters in redux
            dispatch(setChapters(chapters));
        } catch (error) {
            console.error(error);
        }
    };

export const updateMetadataDB =
    (props: {
        authorName?: string;
        gamebookTitle?: string;
        introduction?: string;
    }) =>
    (dispatch: AppDispatch, getState: Function) => {
        db.getObject('metadata', 'details', (e: any) => {
            const metadata = {
                ...e,
                authorName: props.authorName || e.authorName,
                gamebookTitle: props.gamebookTitle || e.gamebookTitle,
                introduction: props.introduction || e.introduction,
            };
            db.editObject('metadata', metadata);
            dispatch(setGamebookMetadata(metadata));
        });
    };
/**
 * Drops database
 * @returns void
 */
export const dropDB = () => (dispatch: AppDispatch, getState: Function) => {
    db.dangerousDropDatabase();
};
/**
 * Adds new chapter by title.
 * @param title title
 * @returns void
 */
export const addNewChapterDB =
    (title: string) => (dispatch: AppDispatch, getState: Function) => {
        try {
            const newChapter = {
                id: uuidv4(),
                chapterNumber: getState().gamebook.chapters.length + 1,
                oldNumber: getState().gamebook.chapters.length + 1,
                title,
                content: '',
                status: {},
            };
            db.createObject('chapters', newChapter);
            dispatch(addNewChapter(newChapter));
        } catch (error) {
            console.error(error);
        }
    };

export const createNewChapterDB =
    (chapter: IChapter) => (dispatch: AppDispatch, getState: Function) => {
        try {
            const newChapter = {
                id: uuidv4(),
                chapterNumber: getState().gamebook.chapters.length + 1,
                oldNumber: getState().gamebook.chapters.length + 1,
                title: chapter.title,
                content: chapter.content,
                status: {
                    ...chapter.status,
                },
            };
            db.createObject('chapters', newChapter);
            dispatch(addNewChapter(newChapter));
        } catch (error) {
            console.error(error);
        }
    };

export const updateChapterDB =
    (chapter: IChapter) => (dispatch: AppDispatch, getState: Function) => {
        try {
            db.editObject('chapters', chapter);
            dispatch(updateChapter(chapter));
        } catch (error) {
            console.error(error);
        }
    };

export const shuffleChapters =
    () => (dispatch: AppDispatch, getState: Function) => {
        // reset selected in DB
        db.getAllObjects('chapters', async (e: IChapter[]) => {
            let chapters = e as IChapter[];
            chapters = chapters.map(sh => {
                return {
                    ...sh,
                    oldNumber: sh.chapterNumber,
                };
            });
            // divide in two tables
            let toShuffle = chapters
                // get only not fixed
                .filter(ch => !ch.status?.fixed)
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value);
            // fixed chapters
            let fxChapters: any = chapters.map(ch => {
                return ch.status?.fixed ? ch : undefined;
            });

            // rejoin arrays
            for (let i = 0; i < chapters.length; i++) {
                if (fxChapters[i] === undefined) {
                    let newCh = toShuffle.shift();
                    fxChapters[i] = {
                        ...newCh,
                        id: newCh?.id,
                        chapterNumber: i + 1,
                    };
                }
            }

            const oldNumbers = await fxChapters.map(
                (chapter: IChapter) => chapter.oldNumber
            );

            fxChapters = fxChapters.map((chapter: IChapter) => {
                return {
                    ...chapter,
                    content: chapter.content?.replace(
                        /\{(\d+)\}/g,
                        function (match: string) {
                            const number = parseInt(match.slice(1, -1));
                            if (number > fxChapters.length) {
                                return `{${number}}`;
                            }
                            return `{${oldNumbers.indexOf(number) + 1}}`;
                        }
                    ),
                };
            });
            await fxChapters.forEach((chapter: IChapter) => {
                db.editObject('chapters', chapter);
            });
            dispatch(resetSelectedChapter());
            dispatch(setChapters(fxChapters));
        });
    };

export const deleteChapterByIdDB =
    (chapterToDelete: IChapter) =>
    (dispatch: AppDispatch, getState: Function) => {
        db.getAllObjects('chapters', (chapters: IChapter[]) => {
            if (chapterToDelete.id !== CONFIG.FIRST_CHAPTER_ID) {
                // filtruj chaptery (content)
                chapters = chapters
                    .filter(chapter => chapter.id !== chapterToDelete.id)
                    .map((chapter, index) => {
                        return {
                            ...chapter,
                            chapterNumber: index + 1,
                            content: chapter.content
                                ?.replaceAll(
                                    `{${chapterToDelete.chapterNumber}}`,
                                    `{}`
                                )
                                .replace(/(\d+)/g, function (match) {
                                    if (
                                        parseInt(match) >
                                            chapterToDelete.chapterNumber &&
                                        parseInt(match) <= chapters.length
                                    )
                                        return `${parseInt(match) - 1}`;
                                    return match;
                                }),
                            status: {
                                ...chapter.status,
                                ready: chapter.content?.includes(
                                    `{${chapterToDelete.chapterNumber}}`
                                )
                                    ? undefined
                                    : chapter?.status?.ready,
                            },
                        };
                    });
                // usuń z DB by ID
                db.deleteObject('chapters', chapterToDelete.id);
                // Update chapters content
                chapters.forEach(ch => {
                    db.editObject('chapters', ch);
                });
                dispatch(setChapters(chapters));
                dispatch(setSelectedChapterId(undefined));
            }
        });
    };

export const checkDB = () => (dispatch: AppDispatch, getState: Function) => {
    // as far as I know, there is no direct possibility to check if DB exist without creating it.
    // so, if there's no DB, we need to wait until it is created in case it doesn't exist yet
    setTimeout(() => {
        db.getObject('metadata', 'details', (e: any) => {
            if (e) {
                dispatch(setIsDbMetadata(true));
            } else {
                dispatch(setIsDbMetadata(false));
            }
        });
    }, 500);
};

export default gameBookStateSlice.reducer;

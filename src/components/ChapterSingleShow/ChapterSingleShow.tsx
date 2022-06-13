import React from 'react';
import styled from 'styled-components';
import { Typography, Button } from 'antd';
import { useAppDispatch, useAppSelector } from 'redux/reduxHooks';
import reactStringReplace from 'react-string-replace';
import { v4 as uuidv4 } from 'uuid';
import { setSelectedChapterId } from 'redux/gameBookSlice';
import { CONFIG } from 'configuration';
import ChapterStatus from 'components/ChapterStatus';

interface ChapterSingleShowProps {}

const ChapterSingleShowStyled = styled.div`
    // put some styles here
    .single {
        &__paragraph {
            padding-bottom: 2rem;
        }
        &__title {
            text-align: center;
        }
        &__content {
            font-size: 1.2rem;
            line-height: 2rem;
        }
    }
`;
const { Title, Text, Paragraph } = Typography;

export const ChapterSingleShow: React.FC<ChapterSingleShowProps> = () => {
    const dispatch = useAppDispatch();
    const { authorName, gamebookTitle, chapters, selectedId } = useAppSelector(
        state => state.gamebook
    );
    const [links, setLinks] = React.useState<string[]>([]);
    const [stringToDisplay, setStringToDisplay] = React.useState('');

    React.useEffect(() => {
        setLinks(() => chapters.map(chapter => chapter.id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if (!selectedId) {
            dispatch(setSelectedChapterId(CONFIG.FIRST_CHAPTER_ID));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnClick = React.useCallback((e: string) => {
        console.log(e);
        dispatch(setSelectedChapterId(e));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getTextToDisplay = (text?: string) => {
        if (!text) return <Text>No chapter's content</Text>;
        let textToDisplay = reactStringReplace(text, /(\n)+/g, (match, i) => {
            return <br />;
        });
        textToDisplay = reactStringReplace(
            textToDisplay,
            /\{(\d+)\}/g,
            (match, i) => {
                const link = links[parseInt(match) - 1];
                return link ? (
                    <span key={uuidv4()}>
                        <Button onClick={() => handleOnClick(link)}>
                            {match}
                        </Button>
                    </span>
                ) : (
                    <span key={uuidv4()} style={{ color: '#ffd000' }}>
                        [{match}]
                    </span>
                );
            }
        );
        return reactStringReplace(textToDisplay, /\{\}/g, (match, i) => {
            return (
                <span key={uuidv4()} style={{ color: '#ff2f00' }}>
                    {`{EMPTY}`}
                </span>
            );
        });
    };
    return (
        <ChapterSingleShowStyled>
            {chapters &&
                selectedId &&
                chapters
                    .filter(ch => ch.id === selectedId)
                    .map(chapter => {
                        return (
                            <Paragraph
                                key={chapter.id}
                                className='single__paragraph'
                                id={chapter.id}
                            >
                                {chapter.chapterNumber && (
                                    <Title level={4} className='single__title'>
                                        {chapter.chapterNumber}
                                    </Title>
                                )}
                                {chapter.title && (
                                    <Title level={4} className='single__title'>
                                        {chapter.status && (
                                            <ChapterStatus
                                                {...chapter.status}
                                            />
                                        )}
                                        {chapter.title}
                                    </Title>
                                )}
                                <Text className='single__content'>
                                    {getTextToDisplay(chapter?.content)}
                                </Text>
                            </Paragraph>
                        );
                    })}
        </ChapterSingleShowStyled>
    );
};

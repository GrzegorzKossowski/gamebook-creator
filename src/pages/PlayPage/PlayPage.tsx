import React from 'react';
import styled from 'styled-components';
import { Col, Row, Typography, Affix, Button } from 'antd';
import MenuGoBack from 'components/MenuGoBack';
import { useAppDispatch, useAppSelector } from 'redux/reduxHooks';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesUp } from '@fortawesome/free-solid-svg-icons';
import ChapterSingleShow from 'components/ChapterSingleShow';
import { setSelectedChapterId } from 'redux/gameBookSlice';
import { CONFIG } from 'configuration';

interface PlayPageProps {}

const PlayPageStyled = styled.div`
    // put some styles here
    .play {
        &__container {
            padding: 2rem 0;
            text-align: justify;
        }
        &__title {
            text-align: center;
        }
        &__author {
            text-align: center;
            margin-bottom: 4rem;
        }
    }
`;

const { Title, Text, Paragraph } = Typography;

export const PlayPage: React.FC<PlayPageProps> = () => {
    const dispatch = useAppDispatch();
    const { authorName, gamebookTitle, chapters, selectedId } = useAppSelector(
        state => state.gamebook
    );
    const [links, setLinks] = React.useState<string[]>([]);

    React.useEffect(() => {
        setLinks(() => chapters.map(chapter => chapter.id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSetFirstChapter = () => {
        dispatch(setSelectedChapterId(CONFIG.FIRST_CHAPTER_ID));
    };

    return (
        <PlayPageStyled>
            <MenuGoBack />
            <Row justify='center' className='play__container' id='mainRow'>
                <Col xs={22} sm={22} md={22} lg={16} xl={12} xxl={10}>
                    <Title level={2} className='play__title'>
                        {gamebookTitle}
                    </Title>
                    <Title level={4} className='play__author'>
                        by {authorName}
                    </Title>
                    <ChapterSingleShow />
                </Col>
            </Row>
            <Affix style={{ position: 'fixed', bottom: 50, right: 50 }}>
                <Button
                    size='large'
                    type='primary'
                    onClick={handleSetFirstChapter}
                >
                    <FontAwesomeIcon icon={faAnglesUp} className='faIcon' />{' '}
                    Start from first chapter
                </Button>
            </Affix>
        </PlayPageStyled>
    );
};

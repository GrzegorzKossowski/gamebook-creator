import React from 'react';
import styled from 'styled-components';
import { Col, Row, Typography, Affix, Button } from 'antd';
import MenuGoBack from 'components/MenuGoBack';
import { useAppSelector } from 'redux/reduxHooks';
import reactStringReplace from 'react-string-replace';
import { HashLink } from 'react-router-hash-link';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesUp } from '@fortawesome/free-solid-svg-icons';

interface PreviewPageProps {}

const PreviewPageStyled = styled.div`
    // put some styles here
    .preview {
        &__container {
            padding: 2rem 0;
            text-align: justify;
        }
        &__title {
            text-align: center;
        }
        &__subtitle {
            text-align: center;
            margin-bottom: 4rem;
        }
        &__paragraph {
            font-size: 1.2rem;
            padding-bottom: 2rem;
        }
    }
`;

const { Title, Text, Paragraph } = Typography;

export const PreviewPage: React.FC<PreviewPageProps> = () => {
    const { authorName, gamebookTitle, chapters, introduction } =
        useAppSelector(state => state.gamebook);
    const [links, setLinks] = React.useState<string[]>([]);

    React.useEffect(() => {
        setLinks(() => chapters.map(chapter => chapter.id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <PreviewPageStyled>
            <MenuGoBack />
            <Row justify='center' className='preview__container' id='mainRow'>
                <Col xs={22} sm={22} md={22} lg={16} xl={12} xxl={10}>
                    <Title level={2} className='preview__title'>
                        {gamebookTitle}
                    </Title>
                    <Title level={4} className='preview__subtitle'>
                        by {authorName}
                    </Title>
                    {introduction && (
                        <>
                            <Title level={4} className='preview__subtitle'>
                                Introduction
                            </Title>
                            <Paragraph className='preview__paragraph'>
                                {introduction}
                            </Paragraph>
                        </>
                    )}
                    {chapters &&
                        chapters.map(chapter => {
                            return (
                                <Paragraph
                                    key={chapter.id}
                                    className='preview__paragraph'
                                    id={chapter.id}
                                >
                                    {chapter.chapterNumber && (
                                        <Title
                                            level={4}
                                            className='preview__title'
                                        >
                                            {chapter.chapterNumber}
                                        </Title>
                                    )}
                                    {chapter.title && (
                                        <Title
                                            level={4}
                                            className='preview__title'
                                        >
                                            {chapter.title}
                                        </Title>
                                    )}
                                    <Text>
                                        {reactStringReplace(
                                            chapter?.content,
                                            /\{(\d+)\}/g,
                                            (match, i) => {
                                                const link =
                                                    links[parseInt(match) - 1];
                                                return link ? (
                                                    <span key={uuidv4()}>
                                                        [
                                                        <HashLink
                                                            to={`#${link}`}
                                                        >
                                                            {match}
                                                        </HashLink>
                                                        ]
                                                    </span>
                                                ) : (
                                                    <span key={uuidv4()}>
                                                        [{match}]
                                                    </span>
                                                );
                                            }
                                        )}
                                    </Text>
                                </Paragraph>
                            );
                        })}
                </Col>
            </Row>
            <Affix style={{ position: 'fixed', bottom: 50, right: 50 }}>
                <HashLink to={`#mainRow`}>
                    <Button size='large' type='primary' shape='circle'>
                        <FontAwesomeIcon icon={faAnglesUp} />
                    </Button>
                </HashLink>
            </Affix>
        </PreviewPageStyled>
    );
};

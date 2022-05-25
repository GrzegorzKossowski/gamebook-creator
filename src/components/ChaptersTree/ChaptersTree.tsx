import React from 'react';
import styled from 'styled-components';
import { Input, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'redux/reduxHooks';
import { setSelectedChapterId } from 'redux/gameBookSlice';
import ChapterStatus from './ChapterStatus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSkullCrossbones,
    faTrophy,
    faPlay,
    faCircleCheck,
    faCircleXmark,
    faCircleStop,
    faThumbTack,
} from '@fortawesome/free-solid-svg-icons';

interface IChaptersTreeProps {}
const { Text } = Typography;

const ChaptersTreeStyled = styled.div`
    // put some styles here
    height: 100%;
    /* border: 1px solid #444; */
    padding: 10px;

    .tree-list {
        overflow-y: auto;
        height: calc(100% - 50px);
        border: 1px solid #444;
        margin: 10px 0;
        list-style-type: none;
        padding-left: 15px;
        li {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 1.2rem;
            color: #bbb;
            margin: 10px 0px;
            padding: 5px 0;
            &:hover {
                background-color: #222;
                cursor: pointer;
            }
        }
        &_selected {
            background-color: #333;
        }
    }
`;

export const ChaptersTree: React.FC<IChaptersTreeProps> = () => {
    const { chapters, selectedId } = useAppSelector(state => state.gamebook);
    const dispach = useAppDispatch();
    const [selectedIdState, setSelectedIdState] = React.useState(selectedId);
    const [searched, setSearched] = React.useState('');

    const handleClick = (id: string) => {
        setSelectedIdState(id);
        dispach(setSelectedChapterId(id));
    };

    const handleInputChange = (e: React.ChangeEvent<{ value: string }>) => {
        setSearched(e.target.value);
    };

    // redraw list if selected
    React.useEffect(() => {
        console.log(selectedIdState);
        return () => {};
    }, [selectedIdState]);

    return (
        <ChaptersTreeStyled>
            <Input
                placeholder='Filter paragraphs by title or number'
                size='large'
                allowClear
                value={searched}
                onChange={handleInputChange}
            />
            <ul className='tree-list'>
                {chapters
                    .filter(chapter => {
                        return searched
                            .split(' ')
                            .some(
                                a =>
                                    chapter.title
                                        .toLowerCase()
                                        .trim()
                                        .includes(a.toLowerCase().trim()) ||
                                    parseInt(a.trim()) === chapter.chapterNumber
                            );
                    })
                    .map(chapter => {
                        return (
                            <li
                                key={chapter.id}
                                className={`tree-list_chapter ${
                                    chapter.id === selectedId
                                        ? 'tree-list_selected'
                                        : ''
                                }`}
                                onClick={() => handleClick(chapter.id)}
                            >
                                <Text>
                                    {`${chapter.chapterNumber}) ${
                                        chapter.title.length > 25
                                            ? chapter.title.slice(0, 25) + '...'
                                            : chapter.title
                                    }`}
                                </Text>
                                <div>
                                    {chapter?.status && (
                                        <ChapterStatus {...chapter.status} />
                                    )}
                                </div>
                            </li>
                        );
                    })}
            </ul>
        </ChaptersTreeStyled>
    );
};

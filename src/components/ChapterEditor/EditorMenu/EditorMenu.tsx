import { Button, Space, Tooltip } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileCirclePlus,
    faDice,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import ModalNewChapter from 'components/ModalNewChapter';
import ModalDeleteChapter from 'components/ModalDeleteChapter';
import ModalShuffleChapter from 'components/ModalShuffleChapter';
import { useAppDispatch, useAppSelector } from 'redux/reduxHooks';
// import { deleteChapterById, shuffleChapters } from 'redux/gameBookSlice';

interface EditorMenuProps {}

const EditorMenuStyled = styled.div`
    // put some styles here
    display: flex;
    justify-content: space-between;
`;

/**
 * Shows the menu component with buttons above the chapter editor
 * @returns React component
 */
export const EditorMenu: React.FC<EditorMenuProps> = () => {
    const { selectedId, chapters } = useAppSelector(state => state.gamebook);
    const dispatch = useAppDispatch();

    const [isVisibleModalNewChapter, setisVisibleModalNewChapter] =
        React.useState(false);
    const [isVisibleModalDelete, setIsVisibleModalDelete] =
        React.useState(false);
    const [isVisibleModalShuffleChapter, setIsVisibleModalShuffleChapter] =
        React.useState(false);

    const handleShowNewChapterModal = () => {
        setisVisibleModalNewChapter(true);
    };
    const handleShowDeleteChapterModal = () => {
        setIsVisibleModalDelete(true);
    };
    const handleShowShuffleChapterModal = () => {
        setIsVisibleModalShuffleChapter(true);
    };
    return (
        <>
            <EditorMenuStyled>
                <Space direction='horizontal'>
                    <Tooltip title='Create new chapter'>
                        <Button
                            size='large'
                            onClick={handleShowNewChapterModal}
                        >
                            <FontAwesomeIcon
                                className='faIcon'
                                icon={faFileCirclePlus}
                            />{' '}
                            New chapter
                        </Button>
                    </Tooltip>
                    <Tooltip title='Shuffle chapters'>
                        <Button
                            size='large'
                            onClick={handleShowShuffleChapterModal}
                        >
                            <FontAwesomeIcon className='faIcon' icon={faDice} />{' '}
                            Shuffle
                        </Button>
                    </Tooltip>
                </Space>
                <Tooltip title='Delete chapter' style={{ marginLeft: 'auto' }}>
                    <Button
                        size='large'
                        danger
                        onClick={handleShowDeleteChapterModal}
                        disabled={!selectedId}
                    >
                        <FontAwesomeIcon className='faIcon' icon={faTrash} />{' '}
                        Delete
                    </Button>
                </Tooltip>
            </EditorMenuStyled>
            <ModalNewChapter
                isVisible={isVisibleModalNewChapter}
                setIsVisible={setisVisibleModalNewChapter}
            />
            <ModalDeleteChapter
                isVisible={isVisibleModalDelete}
                setIsVisible={setIsVisibleModalDelete}
            />
            <ModalShuffleChapter
                isVisible={isVisibleModalShuffleChapter}
                setIsVisible={setIsVisibleModalShuffleChapter}
            />
        </>
    );
};

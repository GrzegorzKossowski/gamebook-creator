import { Button, Space, Tooltip } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSkullCrossbones,
    faTrophy,
    faPlay,
    faCircleCheck,
    faCircleXmark,
    faCircleStop,
    faThumbTack,
    faPlusCircle,
    faFloppyDisk,
    faFileCirclePlus,
    faDice,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import ModalNewChapter from 'components/ModalNewChapter';

interface EditorMenuProps {}

const EditorMenuStyled = styled.div`
    // put some styles here
    display: flex;
    justify-content: space-between;
`;

export const EditorMenu: React.FC<EditorMenuProps> = () => {
    const [isVisibleModalNewChapter, setisVisibleModalNewChapter] =
        React.useState(false);

    const handleShowNewChapterModal = () => {
        setisVisibleModalNewChapter(true);
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
                        <Button size='large' disabled>
                            <FontAwesomeIcon className='faIcon' icon={faDice} />{' '}
                            Shuffle
                        </Button>
                    </Tooltip>
                </Space>
                <Tooltip title='Delete chapter' style={{ marginLeft: 'auto' }}>
                    <Button size='large' danger disabled>
                        <FontAwesomeIcon className='faIcon' icon={faTrash} />{' '}
                        Delete
                    </Button>
                </Tooltip>
            </EditorMenuStyled>
            <ModalNewChapter
                isVisible={isVisibleModalNewChapter}
                setIsVisible={setisVisibleModalNewChapter}
            />
        </>
    );
};

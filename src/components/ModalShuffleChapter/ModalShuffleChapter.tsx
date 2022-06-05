import { Button, Modal, Space, notification, Typography } from 'antd';
import React from 'react';
import { shuffleChapters } from 'redux/gameBookSlice';
import { useAppDispatch } from 'redux/reduxHooks';
import styled from 'styled-components';

interface ModalShuffleChapterProps {
    isVisible: boolean;
    setIsVisible: Function;
}

const ModalShuffleChapterStyled = styled.div`
    // put some styles here
`;

const { Text } = Typography;

export const ModalShuffleChapter: React.FC<ModalShuffleChapterProps> = ({
    isVisible,
    setIsVisible,
}) => {
    const dispatch = useAppDispatch();

    const handleCancel = () => {
        setIsVisible(false);
    };
    const handleDeleteChapter = () => {
        dispatch(shuffleChapters());
        notification['success']({
            message: 'Shuffled chapters',
            description: `Chapters shuffled.`,
            placement: 'bottomRight',
        });
        setIsVisible(false);
    };
    return (
        <ModalShuffleChapterStyled>
            <Modal
                title='Schuffle chapters'
                visible={isVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Text>Do you really want to shuffle chapters?</Text>
                <div
                    style={{
                        textAlign: 'end',
                    }}
                >
                    <Space size='middle'>
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button
                            onClick={handleDeleteChapter}
                            style={{
                                color: '#fa8c16',
                                borderColor: '#fa8c16',
                            }}
                        >
                            Shuffle
                        </Button>
                    </Space>
                </div>
            </Modal>
        </ModalShuffleChapterStyled>
    );
};

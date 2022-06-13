import React from 'react';
import { Button, Divider, Modal, Space, notification, Typography } from 'antd';
import { CONFIG } from 'configuration';
import { IChapter } from 'configuration/interfaces';
// import { deleteChapterById } from 'redux/gameBookSlice';
import { useAppSelector, useAppDispatch } from 'redux/reduxHooks';
import styled from 'styled-components';
import { deleteChapterByIdDB } from 'redux/gameBookSlice';

interface ModalDeleteChapterProps {
    isVisible: boolean;
    setIsVisible: Function;
}

const ModalDeleteChapterStyled = styled.div`
    // put some styles here
`;

const { Text } = Typography;

export const ModalDeleteChapter: React.FC<ModalDeleteChapterProps> = ({
    isVisible,
    setIsVisible,
}) => {
    const { selectedId, chapters } = useAppSelector(state => state.gamebook);
    const [chapterToDelete, setChapterToDelete] = React.useState<
        IChapter | undefined
    >(undefined);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        setChapterToDelete(chapters.find(ch => ch.id === selectedId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedId]);

    const handleCancel = () => {
        setIsVisible(false);
    };
    const handleDeleteChapter = () => {
        if (chapterToDelete) dispatch(deleteChapterByIdDB(chapterToDelete));

        notification['success']({
            message: 'Deleted chapter',
            description: `Chapter deleted.`,
            placement: 'bottomRight',
        });
        setIsVisible(false);
    };
    return (
        <ModalDeleteChapterStyled>
            <Modal
                title='Delete chapter'
                visible={isVisible}
                onCancel={handleCancel}
                footer={null}
            >
                {selectedId === CONFIG.FIRST_CHAPTER_ID ? (
                    <>
                        You can't delete chapter:{' '}
                        <Text style={{ fontWeight: 'bold', color: '#096dd9' }}>
                            {chapterToDelete?.chapterNumber}
                            {') '}
                            {chapterToDelete?.title.slice(0, 20)}...
                        </Text>
                        <p>
                            The very first chapter can't be deleted. It only can
                            be edited.
                        </p>
                        <Divider />
                        <div
                            style={{
                                textAlign: 'end',
                            }}
                        >
                            <Space size='middle'>
                                <Button onClick={handleCancel}>Cancel</Button>
                            </Space>
                        </div>
                    </>
                ) : (
                    <>
                        <Text>Do you really want to delete chapter: </Text>
                        <Text style={{ fontWeight: 'bold' }}>
                            {chapterToDelete?.chapterNumber}
                            {') '}
                            {chapterToDelete?.title.slice(0, 20)}...
                        </Text>
                        <Text type='warning'>
                            It can create some tree issues! All links to{' '}
                            {chapterToDelete?.chapterNumber} become empty {}{' '}
                            links.
                        </Text>
                        <div
                            style={{
                                textAlign: 'end',
                            }}
                        >
                            <Space size='middle'>
                                <Button onClick={handleCancel}>Cancel</Button>
                                <Button danger onClick={handleDeleteChapter}>
                                    Delete
                                </Button>
                            </Space>
                        </div>
                    </>
                )}
            </Modal>
        </ModalDeleteChapterStyled>
    );
};

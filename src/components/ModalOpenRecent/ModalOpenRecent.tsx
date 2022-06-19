import { Button, Modal, Space, Typography } from 'antd';
import { ModalProps } from 'configuration/interfaces';
import React from 'react';
import { checkDB } from 'redux/gameBookSlice';
import { useAppDispatch } from 'redux/reduxHooks';
import styled from 'styled-components';

interface ModalOpenRecentProps extends ModalProps {}

const ModalOpenRecentStyled = styled.div`
    // put some styles here
`;
const { Text } = Typography;
const ModalOpenRecent: React.FC<ModalOpenRecentProps> = ({
    isVisible,
    setIsVisible,
}) => {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(checkDB());
        return () => {};
    }, [dispatch]);

    const handleCancel = () => {
        setIsVisible(false);
    };
    return (
        <ModalOpenRecentStyled>
            <Modal
                title='Open recent'
                visible={isVisible}
                footer={null}
                onCancel={handleCancel}
                centered
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
                            // onClick={handleDeleteChapter}
                            type='primary'
                        >
                            Open
                        </Button>
                    </Space>
                </div>
            </Modal>
        </ModalOpenRecentStyled>
    );
};

export default ModalOpenRecent;

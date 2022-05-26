import { Button, Col, Modal, Row, Space, Typography, notification } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { HighlightOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'redux/reduxHooks';
import { setGamebookAuthor, setGamebookTitle } from 'redux/gameBookSlice';

interface ModalEditMetadataProps {
    isVisible: boolean;
    setIsVisible: Function;
}
const { Paragraph, Title } = Typography;

const ModalEditMetadataStyled = styled.div`
    // put some styles here
`;

export const ModalEditMetadata: React.FC<ModalEditMetadataProps> = ({
    isVisible,
    setIsVisible,
}) => {
    const dispatch = useAppDispatch();
    const { authorName, gamebookTitle } = useAppSelector(
        state => state.gamebook
    );
    const [author, setAuthor] = React.useState(authorName);
    const [title, setTitle] = React.useState(gamebookTitle);

    const handleMetadataChange = () => {
        dispatch(setGamebookAuthor(author));
        dispatch(setGamebookTitle(title));
        notification['success']({
            message: 'Metadata changed',
            description: `${author}, creator of "${title}" saved.`,
            placement: 'bottomRight',
        });
        setIsVisible(false);
    };

    const handleCancel = () => {
        setIsVisible(false);
    };

    return (
        <ModalEditMetadataStyled>
            <Modal
                title='View / Edit gamebook metadata'
                visible={isVisible}
                // onCancel={handleCancel}
                footer={null}
                onCancel={handleCancel}
            >
                <Title level={5}>Author</Title>
                <Paragraph
                    editable={{
                        icon: <HighlightOutlined />,
                        tooltip: 'click to edit text',
                        onChange: setAuthor,
                    }}
                >
                    {author}
                </Paragraph>
                <Title level={5}>Title</Title>
                <Paragraph
                    editable={{
                        icon: <HighlightOutlined />,
                        tooltip: 'click to edit text',
                        onChange: setTitle,
                    }}
                >
                    {title}
                </Paragraph>
                <Row>
                    <Col
                        span={24}
                        style={{ display: 'flex', justifyContent: 'end' }}
                    >
                        <Space direction='horizontal' size='large'>
                            <Button onClick={handleCancel}>Cancel</Button>
                            <Button
                                type='primary'
                                onClick={handleMetadataChange}
                            >
                                Save
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Modal>
        </ModalEditMetadataStyled>
    );
};

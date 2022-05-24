import { Button, Col, Modal, Row, Typography } from 'antd';
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
                        <Button onClick={handleMetadataChange}>Save</Button>
                    </Col>
                </Row>
            </Modal>
        </ModalEditMetadataStyled>
    );
};

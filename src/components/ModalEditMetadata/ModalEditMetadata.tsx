import {
    Button,
    Col,
    Modal,
    Row,
    Space,
    Typography,
    notification,
    Form,
    Input,
} from 'antd';
import React from 'react';
import styled from 'styled-components';
import { HighlightOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'redux/reduxHooks';
import { CONFIG } from 'configuration';
// import { setGamebookAuthor, setGamebookTitle } from 'redux/gameBookSlice';

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
    const [form] = Form.useForm();
    // const [author, setAuthor] = React.useState(authorName);
    // const [title, setTitle] = React.useState(gamebookTitle);
    // React.useEffect(() => {
    //     setAuthor(authorName);
    //     setTitle(gamebookTitle);
    // }, [authorName, gamebookTitle]);
    React.useEffect(() => {
        form.setFieldsValue({
            authorName,
            gamebookTitle,
        });
        return () => {};
    }, [authorName, form, gamebookTitle]);

    const handleMetadataChange = () => {
        // TODO: zaimplementować edycję metadata
        // dispatch(setGamebookAuthor(author));
        // dispatch(setGamebookTitle(title));
        // setIsVisible(false);
    };
    const onFinish = async (values: any) => {
        const { authorName, gamebookTitle } = values;
        authorName.trim();
        gamebookTitle.trim();
        // TODO: zaimplementować edycję metadata
        // dispatch(setGamebookAuthor(author));
        // dispatch(setGamebookTitle(title));
        // ?? dispach(createNewGamebookDB({ authorName, gamebookTitle }));
        // notification['success']({
        //     message: 'Metadata changed',
        //     description: `${author}, creator of "${title}" saved.`,
        //     placement: 'bottomRight',
        // });
        // form.resetFields();
        // setIsVisible(false);
    };
    const handleCancel = () => {
        form.resetFields();
        setIsVisible(false);
    };

    // TODO: zaimplementować formularz, żeby go validować
    return (
        <ModalEditMetadataStyled>
            <Modal
                title='View / Edit gamebook metadata'
                visible={isVisible}
                footer={null}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    layout='vertical'
                    autoComplete='off'
                    requiredMark='optional'
                    onFinish={onFinish}
                    initialValues={{
                        authorName, gamebookTitle
                    }

                    }
                >
                    <Form.Item
                        label={`Author's name`}
                        name='authorName'
                        rules={[
                            {
                                required: true,
                                message: "Please input author's name!",
                            },
                            {
                                min: CONFIG.AUHOR_NAME_LENGTH_MIN,
                                message: `Name min ${CONFIG.AUHOR_NAME_LENGTH_MIN} chars!`,
                            },
                            {
                                max: CONFIG.AUHOR_NAME_LENGTH_MAX,
                                message: `Name max ${CONFIG.AUHOR_NAME_LENGTH_MAX} chars`,
                            },
                        ]}
                    >
                        <Input placeholder='ex. John Doe' />
                    </Form.Item>
                    <Form.Item
                        label='Title'
                        name='gamebookTitle'
                        rules={[
                            {
                                required: true,
                                message: 'Please input gamebook main title!',
                            },
                            {
                                min: CONFIG.CHAPTER_TITLE_LENGTH_MIN,
                                message: `Name min ${CONFIG.CHAPTER_TITLE_LENGTH_MIN} chars!`,
                            },
                            {
                                max: CONFIG.CHAPTER_TITLE_LENGTH_MAX,
                                message: `Name max ${CONFIG.CHAPTER_TITLE_LENGTH_MAX} chars`,
                            },
                        ]}
                    >
                        <Input placeholder='ex. New Journey of Halflings' />
                    </Form.Item>
                    <Form.Item
                        style={{
                            textAlign: 'end',
                        }}
                    >
                        <Space size='middle'>
                            <Button onClick={handleCancel}>Cancel</Button>
                            <Button type='primary' htmlType='submit'>
                                Submit
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </ModalEditMetadataStyled>
    );
};

/* <Title level={5}>Author</Title>
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
                </Row> */

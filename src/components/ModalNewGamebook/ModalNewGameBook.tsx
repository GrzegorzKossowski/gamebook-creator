import { Button, Form, Input, Modal, Space, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { useAppDispatch } from 'redux/reduxHooks';
import { createNewGamebookDB } from 'redux/gameBookSlice';
import { useNavigate } from 'react-router-dom';
import { CONFIG } from 'configuration';

interface ModalNewGameBookProps {
    isVisible: boolean;
    setIsVisible: Function;
}

const ModalNewGameBookStyled = styled.div`
    // put some styles here
`;

const { Paragraph } = Typography;

export const ModalNewGameBook: React.FC<ModalNewGameBookProps> = ({
    isVisible,
    setIsVisible,
}) => {
    const [form] = Form.useForm();
    const dispach = useAppDispatch();
    let navigate = useNavigate();

    const onFinish = async (values: any) => {
        const { authorName, gamebookTitle } = values;
        authorName.trim();
        gamebookTitle.trim();
        dispach(createNewGamebookDB({ authorName, gamebookTitle }));
        form.resetFields();
        setIsVisible(false);
        navigate(`/editor`);
    };

    const handleCancel = () => {
        form.resetFields();
        setIsVisible(false);
    };

    return (
        <ModalNewGameBookStyled>
            <Modal
                title='Create new gamebook'
                visible={isVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    layout='vertical'
                    autoComplete='off'
                    requiredMark='optional'
                    onFinish={onFinish}
                    initialValues={{
                        authorName: 'John Doe',
                        gamebookTitle: 'New Journey of Halflings',
                    }}
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
                    <Paragraph type='warning'>
                        Please note, creating a new project will overwrite an
                        existing project already stored in your web browser's
                        DataBase. If you wish, export it to a file first.
                    </Paragraph>
                    <Form.Item
                        style={{
                            textAlign: 'end',
                        }}
                    >
                        <Space size='middle'>
                            <Button onClick={handleCancel}>Cancel</Button>
                            <Button danger htmlType='submit'>
                                Submit
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </ModalNewGameBookStyled>
    );
};

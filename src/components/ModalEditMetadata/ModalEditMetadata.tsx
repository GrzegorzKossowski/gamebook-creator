import { Button, Modal, Space, notification, Form, Input } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from 'redux/reduxHooks';
import { CONFIG } from 'configuration';
import { updateMetadataDB } from 'redux/gameBookSlice';

interface ModalEditMetadataProps {
    isVisible: boolean;
    setIsVisible: Function;
}

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

    const onFinish = async (values: any) => {
        const { authorName, gamebookTitle } = values;
        authorName.trim();
        gamebookTitle.trim();
        dispatch(updateMetadataDB({ authorName, gamebookTitle }));
        notification['success']({
            message: 'Metadata changed',
            description: `${authorName}, creator of "${gamebookTitle}" saved.`,
            placement: 'bottomRight',
        });
        setIsVisible(false);
        form.resetFields();
    };
    const handleCancel = () => {
        form.resetFields();
        setIsVisible(false);
    };

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
                        authorName,
                        gamebookTitle,
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

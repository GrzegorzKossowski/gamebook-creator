import { Button, Form, Input, Modal, notification } from 'antd';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from 'redux/reduxHooks';
import { addNewChapterDB } from 'redux/gameBookSlice';
import { CONFIG } from 'configuration';

interface ModalNewChapterProps {
    isVisible: boolean;
    setIsVisible: Function;
}

const ModalNewChapterStyled = styled.div`
    // put some styles here
`;

export const ModalNewChapter: React.FC<ModalNewChapterProps> = ({
    isVisible,
    setIsVisible,
}) => {
    const [form] = Form.useForm();
    const dispach = useAppDispatch();

    const handleCancel = () => {
        setIsVisible(false);
    };
    const onFinish = (variables: any) => {
        // TODO: ogarnąć doubleclick na formie...
        dispach(addNewChapterDB(variables.title));
        notification['success']({
            message: 'Chapter created',
            description: `Chapter "${variables.title}" created. You can select it in chapter's tree on the left to edit it's content.`,
            placement: 'bottomRight',
            duration: 3,
        });
        form.resetFields();
        setIsVisible(false);
    };

    return (
        <ModalNewChapterStyled>
            <Modal
                title='Create new Chapter'
                visible={isVisible}
                onCancel={handleCancel}
                footer={null}
                width={700}
            >
                <Form
                    form={form}
                    autoComplete='off'
                    layout='vertical'
                    requiredMark='optional'
                    size='large'
                    onFinish={onFinish}
                    initialValues={{
                        title: 'New chapter very new title',
                    }}
                >
                    <Form.Item
                        name='title'
                        rules={[
                            { required: true, message: 'Enter the title!' },
                            {
                                min: CONFIG.CHAPTER_TITLE_LENGTH_MIN,
                                message: `Min length ${CONFIG.CHAPTER_TITLE_LENGTH_MIN} chars!`,
                            },
                            {
                                max: CONFIG.CHAPTER_TITLE_LENGTH_MAX,
                                message: `Max length ${CONFIG.CHAPTER_TITLE_LENGTH_MAX} chars!`,
                            },
                        ]}
                    >
                        <Input placeholder="ex. Entering dungeon's kitchen" />
                    </Form.Item>
                    <Form.Item
                        style={{
                            textAlign: 'end',
                        }}
                    >
                        <Button htmlType='submit'>Create chapter</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </ModalNewChapterStyled>
    );
};

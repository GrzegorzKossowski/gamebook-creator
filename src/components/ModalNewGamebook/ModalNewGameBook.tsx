import { Button, Form, Input, Modal } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from 'redux/reduxHooks';
import { setGamebookInitialData } from 'redux/gameBookSlice';
import { useNavigate } from 'react-router-dom';

interface ModalNewGameBookProps {
    isVisible: boolean;
    setIsVisible: Function;
}

const ModalNewGameBookStyled = styled.div`
    // put some styles here
`;

export const ModalNewGameBook: React.FC<ModalNewGameBookProps> = ({
    isVisible,
    setIsVisible,
}) => {
    const [form] = Form.useForm();
    const dispach = useAppDispatch();
    let navigate = useNavigate();

    const onFinish = (values: any) => {
        const { authorName, gamebookTitle } = values;
        authorName.trim();
        gamebookTitle.trim();
        dispach(setGamebookInitialData({ authorName, gamebookTitle }));
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
                                min: 3,
                                message: 'Name min 3 chars!',
                            },
                            {
                                max: 30,
                                message: 'Name max 30 chars',
                            },
                        ]}
                    >
                        <Input placeholder='ex. John Doe' />
                    </Form.Item>
                    <Form.Item
                        label='Title'
                        tooltip='This is a required field, gamebook title.'
                        name='gamebookTitle'
                        rules={[
                            {
                                required: true,
                                message: 'Please input gamebook main title!',
                            },
                            {
                                min: 5,
                                message: 'Min title 5 chars!',
                            },
                            {
                                max: 50,
                                message: 'Max title 50 chars!',
                            },
                        ]}
                    >
                        <Input placeholder='ex. New Journey of Halflings' />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </ModalNewGameBookStyled>
    );
};

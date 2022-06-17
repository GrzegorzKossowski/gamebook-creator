import { Form, Modal, Input, Space, Button } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { ModalProps } from 'configuration/interfaces';
import { useAppDispatch, useAppSelector } from 'redux/reduxHooks';
import { updateMetadataDB } from 'redux/gameBookSlice';

interface ModalIntroductionProps extends ModalProps {}

const ModalIntroductionStyled = styled.div`
    // put some styles here
    .modal-introduction {
        &__input {
            &-textarea {
                resize: 'none';
                height: '50vh';
                font-size: '1.2rem';
            }
        }
    }
`;

export const ModalIntroduction: React.FC<ModalIntroductionProps> = ({
    isVisible,
    setIsVisible,
}) => {
    const dispach = useAppDispatch();
    const { authorName, gamebookTitle, introduction } = useAppSelector(
        state => state.gamebook
    );
    const [form] = Form.useForm();
    const onFinish = async (values: any) => {
        const { introduction } = values;
        dispach(updateMetadataDB({ introduction }));
        form.resetFields();
        setIsVisible(false);
    };
    const handleCancel = () => {
        form.resetFields();
        setIsVisible(false);
    };
    return (
        <ModalIntroductionStyled>
            <Modal
                title='Introduction'
                visible={isVisible}
                footer={null}
                onCancel={handleCancel}
                width={`50%`}
            >
                <Form
                    form={form}
                    layout='vertical'
                    autoComplete='off'
                    requiredMark={false}
                    onFinish={onFinish}
                    initialValues={{ introduction }}
                >
                    <Form.Item name='introduction'>
                        <Input.TextArea
                            style={{
                                resize: 'none',
                                height: '50vh',
                                fontSize: '1.2rem',
                            }}
                        />
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
        </ModalIntroductionStyled>
    );
};

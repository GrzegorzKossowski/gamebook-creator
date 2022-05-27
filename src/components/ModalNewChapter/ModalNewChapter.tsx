import {
    Button,
    Checkbox,
    Col,
    Form,
    Input,
    InputRef,
    Modal,
    Row,
    message,
    notification,
} from 'antd';
import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from 'redux/reduxHooks';
import { createNewChapter } from 'redux/gameBookSlice';
import { setGamebookInitialData } from 'redux/gameBookSlice';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleCheck,
    faSkullCrossbones,
    faThumbTack,
    faTrophy,
} from '@fortawesome/free-solid-svg-icons';

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
    const { chapters } = useAppSelector(state => state.gamebook);

    const handleCancel = () => {
        setIsVisible(false);
    };
    const onFinish = (variables: any) => {
        console.log(variables.title);
        dispach(createNewChapter(variables.title));
        notification['success']({
            message: 'Chapter created',
            description: `Chapter "${variables.title}" created. You can select it in chapter's tree on the left to edit it's content.`,
            placement: 'bottomRight',
            duration: 8,
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
                            { min: 10, message: 'Min length 10 chars!' },
                            { max: 60, message: 'Max length 60 chars!' },
                        ]}
                    >
                        <Input placeholder="ex. Entering dungeon's kitchen" />
                    </Form.Item>
                    {/* <Row gutter={16} justify='center'>
                        <Col>
                            <Form.Item name='win' valuePropName='checked'>
                                <Checkbox onChange={() => {}}>
                                    <FontAwesomeIcon
                                        className='faIcon'
                                        icon={faTrophy}
                                    />{' '}
                                    Win ending
                                </Checkbox>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item name='dead' valuePropName='checked'>
                                <Checkbox
                                    onChange={() => {}}
                                    value='Dead ending'
                                >
                                    <FontAwesomeIcon
                                        className='faIcon'
                                        icon={faSkullCrossbones}
                                    />{' '}
                                    Dead ending
                                </Checkbox>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item name='fixed' valuePropName='checked'>
                                <Checkbox
                                    onChange={() => {}}
                                    value='Fixed chapter'
                                >
                                    <FontAwesomeIcon
                                        className='faIcon'
                                        icon={faThumbTack}
                                    />{' '}
                                    Fixed chapter
                                </Checkbox>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item name='ready' valuePropName='checked'>
                                <Checkbox
                                    onChange={() => {}}
                                    value='Fixed chapter'
                                    disabled
                                >
                                    <FontAwesomeIcon
                                        className='faIcon'
                                        icon={faCircleCheck}
                                    />{' '}
                                    Is ready
                                </Checkbox>
                            </Form.Item>
                        </Col>
                    </Row> */}
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

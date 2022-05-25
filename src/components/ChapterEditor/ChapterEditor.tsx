import React from 'react';
import styled from 'styled-components';
import {
    Form,
    Input,
    Button,
    Checkbox,
    Switch,
    Space,
    Row,
    Col,
    Radio,
} from 'antd';
import { useAppDispatch, useAppSelector } from 'redux/reduxHooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSkullCrossbones,
    faTrophy,
    faPlay,
    faCircleCheck,
    faCircleXmark,
    faCircleStop,
    faThumbTack,
} from '@fortawesome/free-solid-svg-icons';

interface ChapterEditorProps {}

const ChapterEditorStyled = styled.div`
    // put some styles here
    height: 100%;
    textarea {
        width: 100%;
        height: 50vh;
        padding: 12px 20px;
        font-size: 1.2rem;
        resize: none;
    }
`;

export const ChapterEditor: React.FC<ChapterEditorProps> = () => {
    const { chapters, selectedId } = useAppSelector(state => state.gamebook);
    const [form] = Form.useForm();

    React.useEffect(() => {
        let chapter;
        if (selectedId) {
            chapter = chapters.find(ch => ch.id === selectedId);
            form.setFieldsValue({
                id: chapter?.id,
                chapterNumber: chapter?.chapterNumber,
                title: chapter?.title,
                content: chapter?.content,
                win: chapter?.status?.win,
                dead: chapter?.status?.dead,
                fixed: chapter?.status?.fixed,
                ready: chapter?.status?.ready,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedId]);

    const onFinish = (values: any) => {
        console.log(values);
    };

    return (
        <ChapterEditorStyled>
            <Form
                form={form}
                autoComplete='off'
                layout='vertical'
                size='large'
                onFinish={onFinish}
            >
                <Row>
                    <Col>
                        <Form.Item name='chapterNumber'>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item name='id'>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label='Title' name='title'>
                    <Input />
                </Form.Item>
                <Row gutter={16}>
                    <Col>
                        <Form.Item name='win' valuePropName='checked'>
                            <Checkbox onChange={() => {}}>
                                <FontAwesomeIcon icon={faTrophy} /> Win ending
                            </Checkbox>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item name='dead' valuePropName='checked'>
                            <Checkbox onChange={() => {}} value='Dead ending'>
                                <FontAwesomeIcon icon={faSkullCrossbones} />{' '}
                                Dead ending
                            </Checkbox>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item name='fixed' valuePropName='checked'>
                            <Checkbox onChange={() => {}} value='Fixed chapter'>
                                <FontAwesomeIcon icon={faThumbTack} /> Fixed
                                chapter
                            </Checkbox>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item name='ready' valuePropName='checked'>
                            <Checkbox onChange={() => {}} value='Fixed chapter'>
                                <FontAwesomeIcon icon={faCircleCheck} /> Is
                                ready
                            </Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    label='Paragraph'
                    name='content'
                    className='chapter-editor_textarea'
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit' disabled>
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </ChapterEditorStyled>
    );
};

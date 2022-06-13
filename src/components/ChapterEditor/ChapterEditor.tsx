import React from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Checkbox, Row, Col, Divider } from 'antd';
import { useAppSelector, useAppDispatch } from 'redux/reduxHooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSkullCrossbones,
    faTrophy,
    faCircleCheck,
    faThumbTack,
} from '@fortawesome/free-solid-svg-icons';
import EditorMenu from './EditorMenu';
import { CONFIG } from 'configuration';
// import { addNewChapter, addNewChapterDB, updateChapter } from 'redux/gameBookSlice';
import { IChapter } from 'configuration/interfaces';
import { createNewChapterDB, updateChapterDB } from 'redux/gameBookSlice';

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
    const [selectedChapterNumber, setSelectedChapterNumber] = React.useState<
        number | undefined
    >(undefined);
    const dispatch = useAppDispatch();
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
            setSelectedChapterNumber(chapter?.chapterNumber);
        } else {
            setSelectedChapterNumber(undefined);
            form.resetFields();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedId]);

    const onFinish = (values: any) => {
        // save new chapter
        if (!selectedId) {
            // TODO: zaimplementować dodawanie rozdziału
            dispatch(
                createNewChapterDB({
                    id: '',
                    title: values.title,
                    content: values.content,
                    status: {
                        fixed: values.fixed,
                        dead: values.dead,
                        win: values.win,
                        ready: values.ready,
                    },
                } as IChapter)
            );
            return;
        }
        // save selected chapter
        const chapterToUpdate = chapters.find(ch => ch.id === selectedId);
        if (chapterToUpdate) {
            // TODO: zaimplementować update rozdziału
            dispatch(
                updateChapterDB({
                    ...chapterToUpdate,
                    title: values.title,
                    content: values.content,
                    status: {
                        ...chapterToUpdate.status,
                        fixed: values.fixed,
                        dead: values.dead,
                        win: values.win,
                        ready: values.ready,
                    },
                })
            );
        }
    };

    return (
        <ChapterEditorStyled>
            <EditorMenu />
            <Divider />
            <Form
                form={form}
                autoComplete='off'
                // layout='vertical'
                size='large'
                onFinish={onFinish}
            >
                <Row>
                    <Col>
                        <Form.Item name='chapterNumber' hidden>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item name='id' hidden>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    name='title'
                    rules={[
                        { required: true, message: `Title can't be empty!` },
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
                    <Input
                        addonBefore={selectedChapterNumber}
                        placeholder='Title'
                    />
                </Form.Item>
                <Row gutter={16}>
                    <Col>
                        <Form.Item name='win' valuePropName='checked'>
                            <Checkbox onChange={() => {}}>
                                <FontAwesomeIcon
                                    className='faIcon'
                                    icon={faTrophy}
                                />{' '}
                                Victory!
                            </Checkbox>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item name='dead' valuePropName='checked'>
                            <Checkbox onChange={() => {}} value='Dead ending'>
                                <FontAwesomeIcon
                                    className='faIcon'
                                    icon={faSkullCrossbones}
                                />{' '}
                                Death
                            </Checkbox>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item name='fixed' valuePropName='checked'>
                            <Checkbox
                                onChange={() => {}}
                                value='Fixed chapter'
                                disabled={
                                    selectedId === CONFIG.FIRST_CHAPTER_ID
                                        ? true
                                        : false
                                }
                            >
                                <FontAwesomeIcon
                                    className='faIcon'
                                    icon={faThumbTack}
                                />{' '}
                                Is fixed
                            </Checkbox>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item name='ready' valuePropName='checked'>
                            <Checkbox onChange={() => {}} value='Fixed chapter'>
                                <FontAwesomeIcon
                                    className='faIcon'
                                    icon={faCircleCheck}
                                />{' '}
                                Is ready
                            </Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item name='content' className='chapter-editor_textarea'>
                    <Input.TextArea
                        placeholder={
                            selectedId
                                ? "Write chapter's content here. Use {} to create links to other chapters."
                                : 'Create a new chapter using the "New Chapter" buttons or just start writing.'
                        }
                    />
                </Form.Item>
                <Form.Item>
                    {selectedId ? (
                        <Button htmlType='submit' block>
                            Save
                        </Button>
                    ) : (
                        <Button htmlType='submit' block>
                            Create new
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </ChapterEditorStyled>
    );
};

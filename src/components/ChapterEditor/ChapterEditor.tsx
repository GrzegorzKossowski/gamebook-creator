import React from 'react';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import { useAppDispatch, useAppSelector } from 'redux/reduxHooks';

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
        }
        form.setFieldsValue({
            title: chapter?.title,
            content: chapter?.content,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedId]);

    return (
        <ChapterEditorStyled>
            <Form form={form} autoComplete='off' layout='vertical' size='large'>
                <Form.Item label='Title' name='title'>
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Paragraph'
                    name='content'
                    className='chapter-editor_textarea'
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item>
                    <Button>Save</Button>
                </Form.Item>
            </Form>
        </ChapterEditorStyled>
    );
};

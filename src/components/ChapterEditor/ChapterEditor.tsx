import React from 'react';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';

interface ChapterEditorProps {}

const ChapterEditorStyled = styled.div`
    // put some styles here
`;

export const ChapterEditor: React.FC<ChapterEditorProps> = () => {
    const [form] = Form.useForm();
    return (
        <ChapterEditorStyled>
            <Form form={form} autoComplete='off' layout='vertical' size='large'>
                <Form.Item label='Title'>
                    <Input />
                </Form.Item>
                <Form.Item label='Paragraph'>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item>
                    <Button>Save</Button>
                </Form.Item>
            </Form>
        </ChapterEditorStyled>
    );
};

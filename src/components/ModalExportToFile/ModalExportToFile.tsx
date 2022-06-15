//https://web.dev/file-system-access/
import {
    Button,
    Form,
    Input,
    Modal,
    notification,
    Radio,
    Space,
} from 'antd';
import { CONFIG } from 'configuration';
import React from 'react';
import { useAppSelector } from 'redux/reduxHooks';
import styled from 'styled-components';
import { plainTextFormatter } from 'utils/plainTextFormatter';

interface ModalExportToFileProps {
    isVisible: boolean;
    setIsVisible: Function;
}

const ModalExportToFileStyled = styled.div`
    // put some styles here
`;

export const ModalExportToFile: React.FC<ModalExportToFileProps> = ({
    isVisible,
    setIsVisible,
}) => {
    const { gamebookTitle, authorName, chapters } = useAppSelector(
        state => state.gamebook
    );
    const [form] = Form.useForm();
    const [radioValue, setRadioValue] = React.useState(`text/plain`);
    const onFinish = async (values: any) => {
        let textToSaveAsBlob;
        if (values.filetype === 'text/plain') {
            textToSaveAsBlob = new Blob(
                [
                    plainTextFormatter({
                        gamebookTitle,
                        authorName,
                        chapters,
                    }),
                ],
                { type: 'text/plain' }
            );
        } else {
            textToSaveAsBlob = new Blob(
                [
                    JSON.stringify({
                        gamebookTitle,
                        authorName,
                        chapters,
                    }),
                ],
                {
                    type: 'application/json',
                }
            );
        }
        const textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
        const fileNameToSaveAs = gamebookTitle || `gamebook_file`;

        const downloadLink = document.createElement('a');
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = 'Download File';
        downloadLink.href = textToSaveAsURL;
        downloadLink.onclick = (event: any) => {
            document.body.removeChild(event.target);
        };
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        notification['success']({
            message: `Saving...`,
            description: `File ${fileNameToSaveAs} by ${authorName} saved.`,
            placement: 'bottomRight',
        });
        setIsVisible(false);
    };
    const handleCancel = () => {
        form.resetFields();
        setIsVisible(false);
    };

    return (
        <ModalExportToFileStyled>
            <Modal
                title='Export to file'
                visible={isVisible}
                footer={null}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    layout='vertical'
                    autoComplete='off'
                    requiredMark={false}
                    onFinish={onFinish}
                    initialValues={{ gamebookTitle, filetype: radioValue }}
                >
                    <Form.Item
                        label={`Filename`}
                        name='gamebookTitle'
                        rules={[
                            {
                                required: true,
                                message: "Please input file's name!",
                            },
                            {
                                min: CONFIG.FILE_NAME_LENGTH_MIN,
                                message: `Filename min ${CONFIG.FILE_NAME_LENGTH_MIN} chars!`,
                            },
                            {
                                max: CONFIG.FILE_NAME_LENGTH_MAX,
                                message: `Filename max ${CONFIG.FILE_NAME_LENGTH_MAX} chars`,
                            },
                        ]}
                    >
                        <Input placeholder={`ex. ${gamebookTitle}`} />
                    </Form.Item>
                    <Form.Item label='Filetype' name='filetype'>
                        <Radio.Group>
                            <Radio value={`text/plain`}>txt</Radio>
                            <Radio value={`application/json`}>json</Radio>
                        </Radio.Group>
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
        </ModalExportToFileStyled>
    );
};

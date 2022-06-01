import { Col, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import ChaptersTree from 'components/ChaptersTree';
import ChapterEditor from 'components/ChapterEditor';
import GraphTree from 'components/GraphTree';
import TopMenu from 'components/TopMenu';

interface IEditorPageProps {}

const EditorPageStyled = styled.div`
    height: 100vh;
    .editor-page_container {
        height: calc(100% - 46px);
    }
    .sidebar__tree-container {
        width: 25%;
        min-width: 400px;
        height: 100%;
        overflow-y: hidden;
    }
    .editor-container {
        padding: 10px;
        width: 50%;
        height: 100%;
    }
    .graph__tree-container {
        width: 25%;
        height: 100%;
    }
`;

export const EditorPage: React.FC<IEditorPageProps> = ({ ...restProps }) => {
    return (
        <EditorPageStyled>
            <TopMenu />
            <Row className='editor-page_container'>
                <Col
                    className='sidebar__tree-container'
                    xs={{ span: 24, order: 2 }}
                    md={{ span: 12, order: 2 }}
                    lg={{ span: 10, order: 1 }}
                    xl={{ span: 6, order: 1 }}
                >
                    <ChaptersTree />
                </Col>
                <Col
                    className='editor-container'
                    xs={{ span: 24, order: 1 }}
                    md={{ span: 24, order: 1 }}
                    lg={{ span: 14, order: 2 }}
                    xl={{ span: 12, order: 2 }}
                >
                    <ChapterEditor />
                </Col>
                <Col
                    className='graph__tree-container'
                    xs={{ span: 24, order: 3 }}
                    md={{ span: 12, order: 3 }}
                    lg={{ span: 24, order: 3 }}
                    xl={{ span: 6, order: 3 }}
                >
                    <GraphTree />
                </Col>
            </Row>
        </EditorPageStyled>
    );
};

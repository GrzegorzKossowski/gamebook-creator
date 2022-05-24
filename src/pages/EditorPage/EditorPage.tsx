import { Col, Menu, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileCirclePlus,
    faFolderOpen,
    faDice,
    faFileWord,
} from '@fortawesome/free-solid-svg-icons';
import MainMenu from 'components/MainMenu';
import ChaptersTree from 'components/ChaptersTree';
import ChapterEditor from 'components/ChapterEditor';
import GraphTree from 'components/GraphTree';
import TopMenu from 'components/TopMenu';

interface IEditorPageProps {}

const EditorPageStyled = styled.div`
    // put some styles here
    height: 100vh;
    /* border: 1px solid red; */
    .sidebar__tree-container {
        /* border: 1px solid blue; */
        width: 25%;
        height: calc(100vh - 86px);
        overflow-y: hidden;
    }
    .graph__tree-container {
        width: 25%;
        height: calc(100vh - 86px);
        /* background-color: #222; */
    }
    .editor-container {
        padding: 10px;
        width: 50%;
    }
`;

const EditorPage: React.FC<IEditorPageProps> = ({ ...restProps }) => {
    return (
        <EditorPageStyled>
            <TopMenu />
            <Row>
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
                    {/* <GraphTree data={[]} /> */}
                </Col>
            </Row>
        </EditorPageStyled>
    );
};

export default EditorPage;

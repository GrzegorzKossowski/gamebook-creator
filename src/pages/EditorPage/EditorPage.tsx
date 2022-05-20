import { Menu, Row } from 'antd';
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
                <div className='sidebar__tree-container'>
                    <ChaptersTree />
                </div>
                <div className='editor-container'>
                    <ChapterEditor />
                </div>
                <div className='graph__tree-container'>
                    <GraphTree data={[]} />
                </div>
            </Row>
        </EditorPageStyled>
    );
};

export default EditorPage;

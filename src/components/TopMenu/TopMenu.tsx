import { Menu, MenuProps } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileCirclePlus,
    faFolderOpen,
    faDice,
    faBook,
    faFileLines,
    faFilePdf,
    faFileCode,
    faChartPie,
    faBookOpen,
} from '@fortawesome/free-solid-svg-icons';
import ModalEditMetadata from 'components/ModalEditMetadata';
import ModalNewChapter from 'components/ModalNewChapter';
interface TopMenuProps {}

const TopMenuStyled = styled.div`
    // put some styles here
`;

const items: MenuProps['items'] = [
    {
        label: 'File',
        key: 'File',
        disabled: true,
        children: [
            {
                label: 'New book',
                key: 'newBook',
                icon: <FontAwesomeIcon icon={faBook} />,
                disabled: true,
            },
            {
                label: 'Oper existing',
                key: 'openExisting',
                icon: <FontAwesomeIcon icon={faFolderOpen} />,
                disabled: true,
            },
        ],
    },
    {
        label: 'Book',
        key: 'bookOptions',
        children: [
            {
                label: 'Add new chapter',
                key: 'addNewChapter',
                icon: <FontAwesomeIcon icon={faFileCirclePlus} />,
            },
            {
                label: 'Schuffle chapters',
                key: 'schuffleChapters',
                disabled: true,
                icon: <FontAwesomeIcon icon={faDice} />,
            },
            {
                label: 'Statistics',
                key: 'bookStatistics',
                disabled: true,
                icon: <FontAwesomeIcon icon={faChartPie} />,
            },
            {
                label: 'Metadata',
                key: 'metadata',
                disabled: false,
                icon: <FontAwesomeIcon icon={faBookOpen} />,
            },
        ],
    },
    {
        label: 'Export',
        key: 'exportBook',
        disabled: true,
        children: [
            {
                label: 'Export to HTML',
                key: 'exportHtml',
                disabled: true,
                icon: <FontAwesomeIcon icon={faFileCode} />,
            },
            {
                label: 'Export to PDF',
                key: 'exportPdf',
                disabled: true,
                icon: <FontAwesomeIcon icon={faFilePdf} />,
            },
            {
                label: 'Export to TXT',
                key: 'exportTxt',
                disabled: true,
                icon: <FontAwesomeIcon icon={faFileLines} />,
            },
        ],
    },
    {
        label: 'Html Preview',
        key: 'previewBook',
        disabled: true,
    },
    {
        label: 'Graph',
        key: 'graphBook',
        disabled: true,
    },
    {
        label: 'About',
        key: 'aboutApp',
        disabled: true,
        children: [
            {
                label: 'Help',
                key: 'appHelp',
                disabled: true,
                icon: <FontAwesomeIcon icon={faFileCode} />,
            },
        ],
    },
];

export const TopMenu: React.FC<TopMenuProps> = () => {
    const [current, setCurrent] = React.useState('');
    const [isModalEditMetadataVisible, setIsModalEditMetadataVisible] =
        React.useState(false);
    const [isModalNewChapterVisible, setIsModalNewChapterVisible] =
        React.useState(false);

    const onClick: MenuProps['onClick'] = e => {
        setCurrent(e.key);
        switch (e.key) {
            case 'addNewChapter':
                setIsModalNewChapterVisible(true);
                break;
            case 'metadata':
                setIsModalEditMetadataVisible(true);
                break;
            default:
                break;
        }
    };
    return (
        <>
            <TopMenuStyled>
                <Menu
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode='horizontal'
                    items={items}
                />
            </TopMenuStyled>
            <ModalEditMetadata
                isVisible={isModalEditMetadataVisible}
                setIsVisible={setIsModalEditMetadataVisible}
            />
            <ModalNewChapter
                isVisible={isModalNewChapterVisible}
                setIsVisible={setIsModalNewChapterVisible}
            />
        </>
    );
};

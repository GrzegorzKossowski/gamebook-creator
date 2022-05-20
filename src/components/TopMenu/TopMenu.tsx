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
} from '@fortawesome/free-solid-svg-icons';
interface TopMenuProps {}

const TopMenuStyled = styled.div`
    // put some styles here
`;

const items: MenuProps['items'] = [
    {
        label: 'File',
        key: 'File',
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
                disabled: true,
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
        ],
    },
    {
        label: 'Export',
        key: 'exportBook',
        // disabled: true,
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
];

export const TopMenu: React.FC<TopMenuProps> = () => {
    const [current, setCurrent] = React.useState('mail');

    const onClick: MenuProps['onClick'] = e => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (
        <TopMenuStyled>
            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode='horizontal'
                items={items}
            />
        </TopMenuStyled>
    );
};

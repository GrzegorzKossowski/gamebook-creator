import React from 'react';
import { Menu, MenuProps } from 'antd';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileCirclePlus,
    faFolderOpen,
    faDice,
    faBook,
    faFileCode,
    faChartPie,
    faBookBookmark,
    faFileSignature,
    faFloppyDisk,
} from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from 'redux/reduxHooks';
import { dropDB } from 'redux/gameBookSlice';
import ModalEditMetadata from 'components/ModalEditMetadata';
import ModalShuffleChapter from 'components/ModalShuffleChapter';
import ModalNewChapter from 'components/ModalNewChapter';
import ModalExportToFile from 'components/ModalExportToFile';
import ModalIntroduction from 'components/ModalIntroduction';

interface MenuTopProps {}

const MenuTopStyled = styled.div`
    // put some styles here
`;

const items: MenuProps['items'] = [
    {
        label: 'File',
        key: 'File',
        disabled: false,
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
            {
                label: 'Export',
                key: 'exportBook',
                disabled: false,
                icon: <FontAwesomeIcon icon={faFloppyDisk} />,
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
                disabled: false,
                icon: <FontAwesomeIcon icon={faDice} />,
            },
            {
                label: 'Introduction',
                key: 'introduction',
                disabled: false,
                icon: <FontAwesomeIcon icon={faFileSignature} />,
            },
            {
                label: 'Metadata',
                key: 'metadata',
                disabled: false,
                icon: <FontAwesomeIcon icon={faBookBookmark} />,
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
        label: 'Html Preview',
        key: 'previewBook',
        disabled: false,
    },
    {
        label: 'Play',
        key: 'playBook',
        disabled: false,
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
    {
        label: 'DropDB',
        key: 'dropDB',
        disabled: true,
        danger: true,
    },
];

export const MenuTop: React.FC<MenuTopProps> = () => {
    let navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [current, setCurrent] = React.useState('');
    const [isModalEditMetadataVisible, setIsModalEditMetadataVisible] =
        React.useState(false);
    const [isModalNewChapterVisible, setIsModalNewChapterVisible] =
        React.useState(false);
    const [isVisibleModalShuffleChapter, setIsVisibleModalShuffleChapter] =
        React.useState(false);
    const [isVisibleModalIntroduction, setIsVisibleModalIntroduction] =
        React.useState(false);
    const [isVisibleModalExportToFile, setIsVisibleModalExportToFile] =
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
            case 'schuffleChapters':
                setIsVisibleModalShuffleChapter(true);
                break;
            case 'introduction':
                setIsVisibleModalIntroduction(true);
                break;
            case 'exportBook':
                setIsVisibleModalExportToFile(true);
                break;
            case 'previewBook':
                navigate(`/preview`);
                break;
            case 'playBook':
                navigate(`/play`);
                break;
            case 'dropDB':
                dispatch(dropDB());
                navigate(`/`);
                break;
            default:
                break;
        }
    };
    return (
        <>
            <MenuTopStyled>
                <Menu
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode='horizontal'
                    items={items}
                />
            </MenuTopStyled>
            <ModalEditMetadata
                isVisible={isModalEditMetadataVisible}
                setIsVisible={setIsModalEditMetadataVisible}
            />
            <ModalNewChapter
                isVisible={isModalNewChapterVisible}
                setIsVisible={setIsModalNewChapterVisible}
            />
            <ModalShuffleChapter
                isVisible={isVisibleModalShuffleChapter}
                setIsVisible={setIsVisibleModalShuffleChapter}
            />
            <ModalExportToFile
                isVisible={isVisibleModalExportToFile}
                setIsVisible={setIsVisibleModalExportToFile}
            />
            <ModalIntroduction
                isVisible={isVisibleModalIntroduction}
                setIsVisible={setIsVisibleModalIntroduction}
            />
        </>
    );
};

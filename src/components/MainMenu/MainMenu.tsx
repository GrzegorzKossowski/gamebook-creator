import React from 'react';
import styled from 'styled-components';
import {
    Button,
    Col,
    Divider,
    Layout,
    Row,
    Space,
    Tooltip,
    Tree,
    Typography,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileCirclePlus,
    faFolderOpen,
    faDice,
} from '@fortawesome/free-solid-svg-icons';
import { DownOutlined } from '@ant-design/icons';

interface IMainMenuProps {}
const { Header, Footer, Sider, Content } = Layout;
const { Text } = Typography;
const { DirectoryTree } = Tree;

const MainMenuStyled = styled.div`
    height: 80px;
    background-color: #333;
    .header-btn {
        height: 100%;
    }
`;

const items = [
    {
        icon: faFileCirclePlus,
        label: 'New book',
        key: 'new',
        toolTip: 'Create new gamebook',
    },
    {
        icon: faFolderOpen,
        label: 'Open saved',
        key: 'open',
        toolTip: 'Open existing gamebook',
    },
    {
        icon: faDice,
        label: 'Shuffle paragraphs',
        key: 'shuffle',
        toolTip: 'Shuffle random',
    },
];

const treeData = [
    {
        title: 'parent 0',
        key: '0-0',
        children: [
            {
                title: 'Bardzo dlugi tekst to jest',
                key: '0-0-0',
                isLeaf: true,
                icon: <FontAwesomeIcon icon={faDice} />,
            },
            {
                title: 'leaf 0-1',
                key: '0-0-1',
                children: [
                    { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
                    { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
                ],
            },
            ...Array.from({ length: 100 }, () => {
                return {
                    title: 'losowy',
                    key: '0-0-0',
                    isLeaf: true,
                    icon: <FontAwesomeIcon icon={faDice} />,
                };
            }),
        ],
    },
];

export const MainMenu: React.FC<IMainMenuProps> = ({ ...restProps }) => {
    return (
        <MainMenuStyled>
            {items.map(item => (
                <Tooltip title={item.toolTip} key={item.key}>
                    <Button className='header-btn'>
                        <Space direction='vertical' align='center'>
                            <FontAwesomeIcon
                                icon={item.icon}
                                size='lg'
                            />
                            {item.label}
                        </Space>
                    </Button>
                </Tooltip>
            ))}

            {/* <Layout>
                <Header>
                </Header>
            </Layout>
            <Layout>
                <Sider
                    style={{
                        overflow: 'auto',
                        height: '80vh',
                        width: '300px',
                    }}
                >
                    <DirectoryTree
                        multiple
                        defaultExpandAll
                        onSelect={onSelect}
                        onExpand={onExpand}
                        treeData={treeData}
                    />
                </Sider>
            </Layout> */}
        </MainMenuStyled>
    );
};

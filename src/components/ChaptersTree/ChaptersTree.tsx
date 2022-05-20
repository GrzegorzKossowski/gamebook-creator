import { Input, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileCirclePlus,
    faFolderOpen,
    faDice,
    faFileWord,
} from '@fortawesome/free-solid-svg-icons';

interface IChaptersTreeProps {}
const { Text } = Typography;
const ChaptersTreeStyled = styled.div`
    // put some styles here
    height: 100%;
    /* border: 1px solid #444; */
    padding: 10px;

    .tree-list {
        overflow-y: auto;
        height: calc(100% - 50px);
        border: 1px solid #444;
        margin: 10px 0;
        list-style-type: none;
        padding-left: 15px;
        li {
            font-size: 1.2rem;
            color: #bbb;
            margin: 10px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
        }
    }
`;

export const ChaptersTree: React.FC<IChaptersTreeProps> = () => {
    return (
        <ChaptersTreeStyled>
            <Input placeholder='Filter paragraphs by title' size='large' />
            <ul className='tree-list'>
                {Array.from({ length: 300 }, (x, i) => {
                    return (
                        <li key={i + Math.random().toString(36).slice(2, 7)}>
                            <Text>
                                {`${
                                    i + 1
                                }) Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Fuga aliquid dicta dolores
                                    omnis dolorem? Ullam fugiat enim
                                    necessitatibus vitae, qui ut quia voluptate
                                    beatae eius illo soluta dolorum inventore
                                    rerum? 
                                  `.slice(0, 20) + '...'}
                            </Text>
                            <div>
                                <FontAwesomeIcon
                                    icon={faDice}
                                    size='sm'
                                    style={{ marginRight: '10px' }}
                                />
                                <FontAwesomeIcon
                                    icon={faFileWord}
                                    size='sm'
                                    style={{ marginRight: '10px' }}
                                />
                            </div>
                        </li>
                    );
                })}
            </ul>
        </ChaptersTreeStyled>
    );
};

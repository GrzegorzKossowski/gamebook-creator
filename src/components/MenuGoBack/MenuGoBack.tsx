import React from 'react';
import styled from 'styled-components';
import { Menu, MenuProps } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface MenuGoBackProps {}

const MenuGoBackStyled = styled.div`
    // put some styles here
`;

const items: MenuProps['items'] = [
    {
        label: 'Editor',
        key: 'goToEditor',
        disabled: false,
        icon: <FontAwesomeIcon icon={faChevronLeft} />,
    },
];

export const MenuGoBack: React.FC<MenuGoBackProps> = () => {
    let navigate = useNavigate();
    const onClick: MenuProps['onClick'] = e => {
        // setCurrent(e.key);
        switch (e.key) {
            case 'goToEditor':
                navigate(`/editor`);
                break;
            default:
                break;
        }
    };
    return (
        <MenuGoBackStyled>
            <Menu
                onClick={onClick}
                // selectedKeys={[current]}
                mode='horizontal'
                items={items}
            />
        </MenuGoBackStyled>
    );
};

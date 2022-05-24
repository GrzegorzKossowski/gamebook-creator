import React from 'react';
import styled from 'styled-components';
import { Col, ColProps, Row, Spin, SpinProps } from 'antd';

const FullPageSpinStyled: React.FC<ColProps> = styled(Col)`
    // put some styles here
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const FullPageSpin: React.FC<SpinProps> = ({
    size = 'large',
    ...restProps
}) => {
    return (
        <Row>
            <FullPageSpinStyled>
                <Spin size={size} {...restProps} />
            </FullPageSpinStyled>
        </Row>
    );
};

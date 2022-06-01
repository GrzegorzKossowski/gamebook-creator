import { Col, Row } from 'antd';
import GraphTreeBig from 'components/GraphTreeBig';
import TopMenu from 'components/TopMenu';
import React from 'react';
import styled from 'styled-components';

interface GraphTreeBigPageProps {}

const GraphTreeBigPageStyled = styled.div`
    // put some styles here
    height: 100vh;
    .graph-big_page-container {
        height: calc(100% - 70px);
        width: 100%;
    }
    .graph-big_tree-container {
        width: 100%;
    }
`;

export const GraphTreeBigPage: React.FC<GraphTreeBigPageProps> = () => {
    return (
        <GraphTreeBigPageStyled>
            <TopMenu />
            <Row className='graph-big_page-container'>
                <Col className='graph-big_tree-container'>
                    <GraphTreeBig />
                </Col>
            </Row>
        </GraphTreeBigPageStyled>
    );
};

import React from 'react';
import styled from 'styled-components';
import Graph from 'react-graph-vis';
import { Typography } from 'antd';

interface GraphTreeProps {
    data: [];
}

const { Title, Text, Paragraph } = Typography;

const GraphTreeStyled = styled.div`
    // put some styles here
    height: 100%;
    padding: 10px;
    .graph-container {
        background-color: #222;
        height: 50%;
        border: 1px solid #444;
    }
`;

const graph = {
    nodes: [
        {
            id: 'blebleble',
            label: 'node 1 tootip text',
            title: 'node 1 tootip text',
            color: 'white',
        },
        {
            id: 2,
            label: 'Node 2 tootip text',
            title: 'node 2 tootip text',
        },
        { id: 3, label: 'Node 3 tootip text', title: 'node 3 tootip text' },
        { id: 4, label: 'Node 4 tootip text', title: 'node 4 tootip text' },
        { id: 5, label: 'Node 5 tootip text', title: 'node 5 tootip text' },
        { id: 6, label: 'Node 6 tootip text', title: 'node 5 tootip text' },
        { id: 7, label: 'Node 7 tootip text', title: 'node 5 tootip text' },
        { id: 8, label: 'Node 8 tootip text', title: 'node 5 tootip text' },
    ],
    edges: [
        { from: 'blebleble', to: 2 },
        { from: 'blebleble', to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 },
        { from: 3, to: 4 },
        { from: 4, to: 8 },
        { from: 5, to: 6 },
        { from: 5, to: 7 },
    ],
};

const options = {
    layout: {
        hierarchical: false,
        randomSeed: 321,
    },
    edges: {
        color: '#FFFFFF',
        smooth: true,
    },
    nodes: {
        shape: 'box',
    },
    height: '100%',
    width: '100%',
};

const events = {
    select: function (event: any) {
        var { nodes, edges } = event;
        // console.log(`nodes id: `, nodes);
        // console.log('edges', edges);
    },
};

export const GraphTree: React.FC<GraphTreeProps> = ({ data }) => {
    return (
        <GraphTreeStyled>
            <div className='graph-container'>
                <Graph graph={graph} options={options} events={events} />
            </div>
            <div>bleble</div>
        </GraphTreeStyled>
    );
};

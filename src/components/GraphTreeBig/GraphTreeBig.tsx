import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'redux/reduxHooks';
import { IChapter, IGraph, IGraphEdge } from 'configuration/interfaces';
import { v4 as uuidv4 } from 'uuid';
// import Graph from 'react-graph-vis';
import Graph from 'react-graph-vis';
import { CONFIG } from 'configuration';

interface GraphTreeBigProps {}

const GraphTreeBigStyled = styled.div`
    // put some styles here
    height: 100%;
    padding: 10px;
    .graph-container {
        background-color: #222;
        height: 100%;
        border: 1px solid #444;
    }
`;

const initialGraph = {
    nodes: [],
    edges: [],
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
    },
};

export const GraphTreeBig: React.FC<GraphTreeBigProps> = () => {
    const { chapters, selectedId } = useAppSelector(state => state.gamebook);
    const [graph, setGraph] = React.useState<IGraph>(initialGraph);
    React.useEffect(() => {
        const chaptersIds = chapters.map(chapter => chapter.id);
        const edges = chapters
            .map(chapter => {
                const newArr = chapter.content
                    ?.match(/(\d+)/g)
                    ?.map(el => parseInt(el));
                const newEdges = newArr?.map(element => {
                    if (element > 0 && element < chapters.length) {
                        return {
                            from: chapter.id,
                            to: chaptersIds[element - 1],
                        };
                    }
                    return { from: chapter.id, to: 'NO_CHAPTER' };
                });
                return newEdges;
            })
            .flat() as IGraphEdge[];

        setGraph({
            nodes: [
                ...chapters.map(chapter => {
                    return {
                        id: chapter.id,
                        label: `${chapter.chapterNumber} ${chapter.title.slice(
                            0,
                            10
                        )}`,
                        title: `${chapter.chapterNumber} ${chapter.title.slice(
                            0,
                            10
                        )}`,
                        color: getChapterColor(chapter),
                    };
                }),
                {
                    id: 'NO_CHAPTER',
                    label: 'NO CHAPTER',
                    title: 'NO CHAPTER',
                    color: 'red',
                },
            ],
            edges: [...edges],
        });
    }, [chapters]);

    return (
        <GraphTreeBigStyled>
            <div className='graph-container'>
                <Graph
                    key={uuidv4()}
                    graph={graph}
                    options={options}
                    events={events}
                />
            </div>
        </GraphTreeBigStyled>
    );
};

function getChapterColor(chapter: IChapter) {
    if (chapter.id === CONFIG.FIRST_CHAPTER_ID) return 'blue';
    return 'white';
}

import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from 'redux/reduxHooks';
import {
    IChapter,
    IGraph,
    IGraphEdge,
    IGraphNode,
} from 'configuration/interfaces';
import { v4 as uuidv4 } from 'uuid';
import Graph from 'react-graph-vis';
import { CONFIG } from 'configuration';

interface GraphTreeProps {}

const GraphTreeStyled = styled.div`
    // put some styles here
    height: 50%;
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
        randomSeed: 741,
    },
    edges: {
        color: '#FFFFFF',
        smooth: true,
        length: 200,
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

export const GraphTree: React.FC<GraphTreeProps> = () => {
    const { chapters, selectedId } = useAppSelector(state => state.gamebook);
    const [graph, setGraph] = React.useState<IGraph>(initialGraph);

    React.useEffect(() => {
        // pobierz id dla wszystkich, bo sie przyda
        const chaptersIds = chapters.map(chapter => chapter.id);
        // pobierz selected
        const selectedChapter = chapters.filter(ch => ch.id === selectedId);
        // dodaj go do nodes
        let nodes: IGraphNode[] = [];
        let edges: IGraphEdge[] = [];
        if (selectedChapter.length > 0) {
            // // dodaj nodea dla zaznaczonego
            nodes = [
                ...nodes,
                {
                    id: selectedChapter[0].id,
                    label: `${
                        selectedChapter[0].chapterNumber
                    }\n${selectedChapter[0].title.slice(0, 10)}`,
                    title: `${
                        selectedChapter[0].chapterNumber
                    } ${selectedChapter[0].title.slice(0, 10)}`,
                    color: '#1890ff',
                },
            ];
            // sprawdź Empty chapter, dodaj empty chapter
            if (selectedChapter[0].content?.includes('{}')) {
                nodes = [
                    ...nodes,
                    {
                        id: 'EMPTY_CHAPTER',
                        label: '{ EMPTY LINK }',
                        color: 'yellow',
                    },
                ];
                edges = [
                    ...edges,
                    {
                        from: selectedChapter[0].id,
                        to: 'EMPTY_CHAPTER',
                    },
                ];
            }

            // // przeanalizuj content
            let newArr = selectedChapter[0].content
                ?.match(/(\d+)/g)
                ?.map(el => parseInt(el));
            if (newArr && newArr?.length > 0) {
                newArr?.map(element => {
                    if (element > 0 && element <= chapters.length) {
                        nodes.push({
                            id: chapters[element - 1].id,
                            label: `${
                                chapters[element - 1].chapterNumber
                            }\n${chapters[element - 1].title.slice(0, 10)}`,
                            title: `${
                                chapters[element - 1].chapterNumber
                            }\n${chapters[element - 1].title.slice(0, 10)}`,
                            color: '#69c0ff',
                        });
                        edges.push({
                            from: selectedChapter[0].id,
                            to: chapters[element - 1].id,
                        });
                    }
                    if (element > chapters.length) {
                        nodes.push({
                            id: 'NO_CHAPTER',
                            label: 'NO CHAPTER',
                            title: 'NO CHAPTER',
                            color: '#ff7875',
                        });
                        edges.push({
                            from: selectedChapter[0].id,
                            to: 'NO_CHAPTER',
                            label: `${element}`,
                        });
                    }

                    const newArrSecLayer = chapters[element - 1]?.content
                        ?.match(/(\d+)/g)
                        ?.map(el => parseInt(el));

                    if (newArrSecLayer && newArrSecLayer.length > 0) {
                        newArrSecLayer?.map(layerChapter => {
                            if (
                                layerChapter > 0 &&
                                layerChapter <= chapters.length
                            ) {
                                nodes.push({
                                    id: chapters[layerChapter - 1].id,
                                    label: `${
                                        chapters[layerChapter - 1].chapterNumber
                                    }\n${chapters[layerChapter - 1].title.slice(
                                        0,
                                        10
                                    )}`,
                                    color: '#bae7ff',
                                });
                                edges.push({
                                    from: chapters[element - 1].id,
                                    to: chapters[layerChapter - 1].id,
                                });
                            }
                            // za duże,
                            if (layerChapter > chapters.length) {
                                nodes.push({
                                    id: 'NO_CHAPTER',
                                    label: 'NO CHAPTER',
                                    title: 'NO CHAPTER',
                                    color: '#ff7875',
                                });
                                edges.push({
                                    from: chapters[element - 1].id,
                                    to: 'NO_CHAPTER',
                                    label: `${layerChapter}`,
                                });
                            }
                            // pusty

                            return null;
                        });
                    }

                    return null;
                });
            }
            // // remove duplicates
            const ids = nodes.map(o => o.id);
            nodes = nodes.filter(
                ({ id }, index) => !ids.includes(id, index + 1)
            );
        }
        setGraph({
            nodes: [...nodes],
            edges: [...edges],
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chapters, selectedId]);

    function getChapterGraph(
        step: number,
        nodes: IGraphNode[],
        edges: IGraphEdge[]
    ): IGraph {
        if (step > 0) {
            step -= 1;
            getChapterGraph(step, nodes, edges);
        }

        return {
            nodes,
            edges,
        };
    }

    return (
        <GraphTreeStyled>
            <div className='graph-container'>
                <Graph
                    key={uuidv4()}
                    graph={graph}
                    options={options}
                    events={events}
                />
            </div>
        </GraphTreeStyled>
    );
};

function getChapterColor(chapter: IChapter) {
    if (chapter.id === CONFIG.FIRST_CHAPTER_ID) return '#8299ff';
    return 'white';
}

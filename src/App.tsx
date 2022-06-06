import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LazySuspense from 'components/LazySuspense';
// import HomePage from 'pages/HomePage';
// import EditorPage from 'pages/EditorPage';
// import PreviewPage from 'pages/PreviewPage';
// import PlayPage from 'pages/PlayPage';
// import GraphTreeBig from 'components/GraphTreeBig';
const HomePage = React.lazy(() => import('./pages/HomePage'));
const EditorPage = React.lazy(() => import('./pages/EditorPage'));
const PreviewPage = React.lazy(() => import('./pages/PreviewPage'));
const PlayPage = React.lazy(() => import('./pages/PlayPage'));
const GraphTreeBig = React.lazy(() => import('./pages/GraphTreeBigPage'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
    return (
        <Routes>
            {['/'].map((element, index) => {
                return (
                    <Route
                        key={`mainRoute_${index}`}
                        path={element}
                        element={<LazySuspense component={<HomePage />} />}
                    />
                );
            })}
            <Route
                path='editor'
                element={<LazySuspense component={<EditorPage />} />}
            />
            <Route
                path='preview'
                element={<LazySuspense component={<PreviewPage />} />}
            />
            <Route
                path='play'
                element={<LazySuspense component={<PlayPage />} />}
            />
            <Route
                path='graph'
                element={<LazySuspense component={<GraphTreeBig />} />}
            />
            <Route
                path='*'
                element={<LazySuspense component={<NotFound />} />}
            />
        </Routes>
    );
}

export default App;

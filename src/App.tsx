import React from 'react';
import { Button } from 'antd';
import { Route, Routes } from 'react-router-dom';
import LazySuspense from 'components/LazySuspense';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const EditorPage = React.lazy(() => import('./pages/EditorPage/EditorPage'));

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
                path='*'
                element={<LazySuspense component={<NotFound />} />}
            />
        </Routes>
    );
}

export default App;

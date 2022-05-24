import * as React from 'react';
import FullPageSpin from '../FullPageSpin/';


interface ILazySuspenseProps {
    component: React.ReactNode;
}

export const LazySuspense = ({ component }: ILazySuspenseProps) => {
    return (
        <>
            <React.Suspense
                fallback={
                    <>
                        <FullPageSpin size='large' />
                    </>
                }
            >
                {component}
            </React.Suspense>
        </>
    );
};

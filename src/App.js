import React, { useState, lazy, Suspense } from 'react';

import Header from './shared/Header/Header';
import LoadingSpinner from './shared/LoadingSpinner/LoadingSpinner';

const ItemCollector = lazy(() => import('./ItemCollector/ItemCollector'));
const NamesCollector = lazy(() => import('./NamesCollector/NamesCollector'));
const Tip = lazy(() => import('./Tip/Tip'));
const Splitter = lazy(() => import('./Splitter/Splitter'));
const Conclusion = lazy(() => import('./Conclusion/Conclusion'));

function App() {
    const [phase, setPhase] = useState(1);

    const nextClickHandler = () => {
        setPhase(phase + 1);
    };

    let renderedComponent;

    switch (phase) {
        case 1:
            renderedComponent = <ItemCollector
                onNextClick={nextClickHandler}
            />;
            break;

        case 2:
            renderedComponent = <NamesCollector
                onNextClick={nextClickHandler}
            />;
            break;

        case 3:
            renderedComponent = <Tip
                onNextClick={nextClickHandler}
            />;
            break;

        case 4:
            renderedComponent = <Splitter
                onCalculateClick={nextClickHandler}
            />;
            break;

        case 5:
            renderedComponent = <Conclusion />;
            break;

        default:
            break;
    }

    return (
        <>
            <Header />
            <main>
                <Suspense
                    fallback={
                        <div className="center">
                            <LoadingSpinner />
                        </div>
                    }
                >
                    {renderedComponent}
                </Suspense>
            </main>
        </>
    );
}

export default App;

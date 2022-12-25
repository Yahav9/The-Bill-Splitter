import React, { useState, lazy, Suspense, useEffect } from 'react';

import Header from './shared/Header/Header';
import LoadingSpinner from './shared/LoadingSpinner/LoadingSpinner';

const ItemCollector = lazy(() => import('./ItemCollector/ItemCollector'));
const NamesCollector = lazy(() => import('./NamesCollector/NamesCollector'));
const Tip = lazy(() => import('./Tip/Tip'));
const Splitter = lazy(() => import('./Splitter/Splitter'));
const Conclusion = lazy(() => import('./Conclusion/Conclusion'));

function App() {
    const [phase, setPhase] = useState(0);
    const [data, setData] = useState();

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('billSplitterData'));
        if (!storedData) setPhase(1);
        else {
            if (new Date(storedData.expiration) < new Date()) {
                localStorage.removeItem('billSplitterData');
                setPhase(1);
            } else {
                setPhase(storedData.phase);
            }
        }
    }, []);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('billSplitterData'));
        setData(storedData);
    }, [phase]);

    const nextClickHandler = () => {
        setPhase(phase + 1);
    };

    const backClickHandler = () => {
        setPhase(phase - 1);
    };

    let renderedComponent;

    switch (phase) {
        case 1:
            renderedComponent = <ItemCollector
                onNextClick={nextClickHandler}
                onBackClick={backClickHandler}
                data={data}
            />;
            break;

        case 2:
            renderedComponent = <NamesCollector
                onNextClick={nextClickHandler}
                onBackClick={backClickHandler}
                data={data}
            />;
            break;

        case 3:
            renderedComponent = <Tip
                onNextClick={nextClickHandler}
                onBackClick={backClickHandler}
                data={data}
            />;
            break;

        case 4:
            renderedComponent = <Splitter
                onCalculateClick={nextClickHandler}
                onBackClick={backClickHandler}
                data={data}
            />;
            break;

        case 5:
            renderedComponent = <Conclusion
                data={data}
                onBackClick={backClickHandler}
            />;
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

import React, { useState } from "react";
import Conclusion from "./Conclusion/Conclusion";

import ItemCollector from "./ItemCollector/ItemCollector";
import NamesCollector from "./NamesCollector/NamesCollector"
import Splitter from "./Splitter/Splitter";
import Tip from "./Tip/Tip";
import Header from "./shared/Header/Header";

function App() {
    const [phase, setPhase] = useState(1);

    const nextClickHandler = () => {
        setPhase(phase + 1);
    }

    let renderedComponent;

    switch (phase) {
        case 1:
            renderedComponent = <ItemCollector
                onNextClick={nextClickHandler}
            />
            break;

        case 2:
            renderedComponent = <NamesCollector
                onNextClick={nextClickHandler}
            />
            break;

        case 3:
            renderedComponent = <Tip
                onNextClick={nextClickHandler}
            />
            break;

        case 4:
            renderedComponent = <Splitter
                onCalculateClick={nextClickHandler}
            />
            break;

        case 5:
            renderedComponent = <Conclusion />
            break;

        default:
            break;
    }

    return (
        <>
            <Header />
            <main>
                {renderedComponent}
            </main>
        </>
    )
}

export default App;
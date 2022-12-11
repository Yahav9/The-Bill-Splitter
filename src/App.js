import React, { useState } from "react";

import ItemCollector from "./ItemCollector/ItemCollector";
import NamesCollector from "./NamesCollector/NamesCollector"
import Tip from "./Tip/Tip";

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

        default:
            break;
    }

    return (
        <main>
            <h1
                onClick={() => setPhase(phase + 1)}
            >
                your'e on phase {phase}
            </h1>
            {renderedComponent}
        </main>
    )
}

export default App;
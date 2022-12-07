import React, { useState } from "react";

import ItemCollector from "./ItemCollector/ItemCollector";
import NamesCollector from "./NamesCollector/NamesCollector"

function App() {
    const [phase, setPhase] = useState(1);

    let renderedComponent;

    switch (phase) {
        case 1:
            renderedComponent = <ItemCollector
                onNextClick={() => setPhase(phase + 1)}
            />
            break;

        case 2:
            renderedComponent = <NamesCollector />
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
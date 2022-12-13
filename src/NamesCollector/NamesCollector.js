import React from "react";

import './NamesCollector.scss';
import NamesList from "./NamesList/NamesList";

function NamesCollector(props) {
    return (
        <div className="names-collector">
            <h1>Who's Here?</h1>
            <NamesList
                onNextClick={props.onNextClick}
            />
        </div>
    )
}

export default NamesCollector;
import React from "react";

import './NamesCollector.scss';
import NamesList from "./NamesList/NamesList";

function NamesCollector(props) {
    return (
        <div className="names-collector">
            <h2>Who's Here?</h2>
            <NamesList
                onNextClick={props.onNextClick}
            />
        </div>
    )
}

export default NamesCollector;
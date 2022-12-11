import React from "react";

import Card from '../../shared/Card/Card'

function Name(props) {
    return (
        <li>
            <Card>
                <h2>{props.name}</h2>
            </Card>
        </li>
    )
}

export default Name;
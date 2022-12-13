import React from "react";

import Card from '../../shared/Card/Card';
import './Name.scss';

function Name(props) {
    return (
        <li>
            <Card className="name">
                <h2>{props.name}</h2>
            </Card>
        </li>
    )
}

export default Name;
import React from "react";

import Card from '../../shared/Card/Card'

function Item(props) {
    return (
        <li>
            <Card>
                <h2>{props.name}</h2>
                <h2>{Number(props.price).toFixed(2)}</h2>
            </Card>
        </li>
    )
}

export default Item;
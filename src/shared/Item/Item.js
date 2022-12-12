import React from "react";

import Card from '../Card/Card'

function Item(props) {
    return (
        <Card>
            <h2>{props.name}</h2>
            <h2>{Number(props.price).toFixed(2)}</h2>
        </Card>
    )
}

export default Item;
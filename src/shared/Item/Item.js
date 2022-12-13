import React from "react";

import Card from '../Card/Card';
import './Item.scss';

function Item(props) {
    return (
        <Card className="item">
            <h3>{props.name}</h3>
            <h3>{Number(props.price).toFixed(2)}₪</h3>
        </Card>
    )
}

export default Item;
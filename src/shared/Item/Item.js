import React from 'react';

import Card from '../Card/Card';
import Button from '../Button/Button';
import './Item.scss';

function Item(props) {
    return (
        <>
            <Card className="item">
                <h3>{props.name}</h3>
                <h3>{Number(props.price).toFixed(2)}₪</h3>
            </Card>
            {
                props.isItemCollectorPhase &&
                <Button onClick={() => props.onDelete(props.index)} danger>
                    <i className="material-icons"
                    >
                        delete
                    </i>
                </Button>}
        </>
    );
}

export default Item;

import React from 'react';

import Card from '../Card/Card';
import Button from '../Button/Button';
import './Item.scss';

function Item(props) {
    return (
        <Card
            isListItem={props.isItemCollectorPhase}
            className="item"
            style={
                props.isItemCollectorPhase ?
                    { backgroundColor: 'white' } :
                    { backgroundColor: 'rgba(255, 0, 0, 0.5)' }
            }
        >
            <h3>{props.name}</h3>
            <h3>{Number(props.price).toFixed(2)}₪</h3>
            {
                props.isItemCollectorPhase &&
                <Button onClick={() => props.onDelete(props.index)} danger>
                    <i className="material-icons"
                    >
                        delete
                    </i>
                </Button>
            }
        </Card>
    );
}

export default Item;

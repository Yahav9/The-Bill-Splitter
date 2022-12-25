import React, { useState } from 'react';

import './ItemCollector.scss';
import Item from '../shared/Item/Item';
import ItemForm from './ItemForm/ItemForm';
import Card from '../shared/Card/Card';
import Button from '../shared/Button/Button';

function ItemCollector(props) {
    const [items, setItems] = useState(props.data ? props.data.items : []);

    const createItem = (event, name, price, index) => {
        event.preventDefault();
        name.length < 1 && (name = 'Item');
        const newItem = { name, price, index };
        setItems(items => [...items, newItem]);
    };

    const nextClickHandler = () => {
        const data = {
            expiration: new Date(new Date().getTime() + 1000 * 60 * 60).toISOString(),
            phase: 2,
            items,
            people: props.data ? props.data.people : [],
            tip: props.data ? props.data.tip : 1.1
        };
        localStorage.setItem('billSplitterData', JSON.stringify(data));
        props.onNextClick();
    };

    const itemDeleteHandler = deletedItemIndex => {
        setItems(items.filter(item => item.index !== deletedItemIndex));
    };

    return (
        <div className="item-collector">
            <h1>Give Me Every Item on the Bill</h1>
            <ul className="items-list">
                {
                    items.length > 0 && items.map(item => {
                        return (
                            <li key={item.index}>
                                <Item
                                    name={item.name}
                                    price={item.price}
                                    index={item.index}
                                    onDelete={itemDeleteHandler}
                                    isItemCollectorPhase
                                />
                            </li>
                        );
                    })
                }
                <li>
                    <Card className="item total">
                        <h3>Total: </h3>
                        <h3>{items.reduce((a, b) => Number(a) + Number(b.price), 0).toFixed(2)}₪</h3>
                    </Card>
                </li>
                <ItemForm onAdd={createItem} />
                <Button
                    className="next-button"
                    onClick={nextClickHandler}
                    disabled={items.length < 1}
                >NEXT</Button>
            </ul>
        </div>
    );
}

export default ItemCollector;

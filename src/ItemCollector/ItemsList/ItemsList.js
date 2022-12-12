import React, { useState } from "react";

import Item from "../Item/Item";
import ItemForm from "../ItemForm/ItemForm";
import Card from "../../shared/Card/Card";
import Button from "../../shared/Button/Button";

function ItemsList(props) {
    const [items, setItems] = useState([]);

    const createItem = (event, name, price, index) => {
        event.preventDefault();
        name.length < 1 && (name = 'Item');
        const newItem = { name, price, index };
        setItems(items => [...items, newItem]);
    }

    const nextClickHandler = () => {
        localStorage.clear();
        localStorage.setItem('storedItems', JSON.stringify(items));
        props.onNextClick();
    }

    return (
        <ul>
            {
                items.length > 0 && items.map(item => {
                    return (
                        <li key={item.index}>
                            <Item
                                name={item.name}
                                price={item.price}
                            />
                        </li>
                    )
                })
            }
            <li>
                <Card>
                    <h2>Total: </h2>
                    <h2>{items.reduce((a, b) => Number(a) + Number(b.price), 0).toFixed(2)}</h2>
                </Card>
            </li>
            <ItemForm onAdd={createItem} />
            <Button
                onClick={nextClickHandler}
                disabled={items.length < 1}
            >Next</Button>
        </ul>
    )
}

export default ItemsList;
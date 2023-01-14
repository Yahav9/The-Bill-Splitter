import React, { useState } from 'react';
import axios from 'axios';

import './ItemCollector.scss';
import Item from '../shared/Item/Item';
import ItemForm from './ItemForm/ItemForm';
import Card from '../shared/Card/Card';
import Button from '../shared/Button/Button';
import LoadingSpinner from '../shared/LoadingSpinner/LoadingSpinner';

function ItemCollector(props) {
    const [items, setItems] = useState(props.data ? props.data.items : []);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = async event => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('image', event.target.files[0]);
        try {
            const res = await axios.post('http://localhost:5000/process-bill', formData);
            setItems(res.data);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setIsLoading(false);
        }
    };

    const createItem = (event, name, price) => {
        event.preventDefault();
        const index = items.length < 1 ? 0 : items[items.length - 1].index + 1;
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
            <form className='file-form'>
                <label htmlFor='file-input'>Take a picture of the bill</label>
                <input
                    id='file-input'
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    capture
                />
            </form>
            <ul className="items-list">
                {isLoading && <LoadingSpinner />}
                {
                    !isLoading && items.length > 0 && items.map(item => {
                        return (
                            <Item
                                key={item.index}
                                name={item.name}
                                price={item.price}
                                index={item.index}
                                onDelete={itemDeleteHandler}
                                isItemCollectorPhase
                            />
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
                <div className='buttons'>
                    <Button
                        className="next-button"
                        onClick={nextClickHandler}
                        disabled={items.length < 1}
                    >
                        NEXT
                    </Button>
                </div>
            </ul>
        </div>
    );
}

export default ItemCollector;

import React, { useRef, useState } from 'react';

import Button from '../../shared/Button/Button';
import './ItemForm.scss';

function ItemForm(props) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const ref = useRef(null);

    const submitHandler = event => {
        setName('');
        setPrice('');
        ref.current.focus();
        props.onAdd(event, name, price);
    };

    return (
        <form className="item-form" onSubmit={submitHandler}>
            <input
                type="text"
                placeholder="Item (optional)"
                value={name}
                onChange={event => setName(event.target.value)}
                autoFocus
                ref={ref}
            />
            <input
                className="price"
                type="number"
                placeholder="Price"
                value={price}
                step="0.1"
                onChange={event => setPrice(event.target.value)}
            />
            <Button
                inverse
                disabled={price <= 0}
            >
                +
            </Button>
        </form>
    );
}

export default ItemForm;

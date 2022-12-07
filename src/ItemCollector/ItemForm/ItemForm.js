import React, { useRef, useState } from "react";

import Button from "../../shared/Button/Button";

function ItemForm(props) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [index, setIndex] = useState(0);
    const ref = useRef(null);

    const submitHandler = event => {
        setName('');
        setPrice('');
        ref.current.focus();
        props.onAdd(event, name, price, index);
        setIndex(index + 1);
    }

    return (
        <form onSubmit={submitHandler}>
            <input
                type="text"
                placeholder="Item (optional)"
                value={name}
                onChange={event => setName(event.target.value)}
            />
            <input
                type="number"
                placeholder="Price"
                autoFocus
                ref={ref}
                value={price}
                step="0.1"
                onChange={event => setPrice(event.target.value)}
            />
            <Button

                disabled={price <= 0}
            >
                ADD
            </Button>
        </form>
    )
}

export default ItemForm;

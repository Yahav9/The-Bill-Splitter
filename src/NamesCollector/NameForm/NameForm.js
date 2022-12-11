import React, { useRef, useState } from "react";

import Button from "../../shared/Button/Button";

function ItemForm(props) {
    const [name, setName] = useState('');
    const [index, setIndex] = useState(0)
    const ref = useRef(null);

    const submitHandler = event => {
        setName('');
        ref.current.focus();
        props.onAdd(event, name, index);
        setIndex(index + 1);
    }

    return (
        <form onSubmit={submitHandler}>
            <input
                type="text"
                placeholder="Name"
                autoFocus
                ref={ref}
                value={name}
                onChange={event => setName(event.target.value)}
            />
            <Button
                disabled={name.length < 1}
            >
                ADD
            </Button>
        </form>
    )
}

export default ItemForm;

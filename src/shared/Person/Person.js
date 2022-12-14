import React, { useState } from "react";

import Card from "../../shared/Card/Card";
import './Person.scss';

function Person(props) {
    const [selected, setSelected] = useState('');

    const clickHandler = () => {
        props.onClick(props.name);
        selected === '' ? setSelected('selected') : setSelected('');
    }

    return (
        <li onClick={clickHandler}>
            <Card className={selected}>
                <h2>{props.name}</h2>
                {
                    props.payment &&
                    <h2>{props.payment.toFixed(2)}</h2>
                }
            </Card>
        </li>
    )
}

export default Person;
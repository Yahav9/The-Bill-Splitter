import React from 'react';

import Card from '../../shared/Card/Card';
import './Person.scss';

function Person(props) {

    const clickHandler = () => {
        if (props.onClick) {
            props.onClick(props.name);
        }
    };
    return (
        <li onClick={clickHandler}>
            <Card className={props.isSelected ? 'person selected' : 'person'}>
                <h2>{props.name}</h2>
                {
                    props.payment &&
                    <h2>{props.payment.toFixed(2)}₪</h2>
                }
            </Card>
        </li>
    );
}

export default Person;

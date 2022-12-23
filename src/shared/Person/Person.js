import React from 'react';

import Card from '../../shared/Card/Card';
import Button from '../Button/Button';
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
                {
                    props.isNamesCollectorPhase &&
                    <Button onClick={() => props.onDelete(props.index)} danger>
                        <i className="material-icons"
                        >
                            delete
                        </i>
                    </Button>
                }
            </Card>
        </li>
    );
}

export default Person;

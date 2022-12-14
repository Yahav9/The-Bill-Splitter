import React from "react";

import Person from "../../shared/Person/Person";
import Card from "../Card/Card";
import './PeopleList.scss';

function PeopleList(props) {
    return (
        <ul className="people-list">
            {props.people.map(person => {
                return (
                    <Person
                        key={person.index}
                        name={person.name}
                        payment={props.total ? person.payment : null}
                        onClick={props.onPersonClick}
                    />
                )
            })}
            {
                props.total &&
                <li>
                    <Card>
                        <h2>Total: {props.total}</h2>
                    </Card>
                </li>
            }
        </ul>
    )
}

export default PeopleList;
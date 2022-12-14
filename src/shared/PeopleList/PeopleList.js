import React from "react";

import Person from "../../shared/Person/Person";
import Card from "../Card/Card";
import './PeopleList.scss';

function PeopleList(props) {
    return (
        <ul className="people-list">
            {props.people.map(person => {
                let isSelected = false;
                if (props.splitters) {
                    for (let splitter of props.splitters) {
                        if (splitter === person.name) {
                            isSelected = true;
                            break;
                        }
                    }
                }
                return (
                    <Person
                        key={person.index}
                        name={person.name}
                        payment={props.total ? person.payment : null}
                        onClick={props.onPersonClick}
                        isSelected={isSelected}
                    />
                )
            })}
            {
                props.total &&
                <Card>
                    <h2>Total: {props.total}₪</h2>
                </Card>
            }
        </ul>
    )
}

export default PeopleList;
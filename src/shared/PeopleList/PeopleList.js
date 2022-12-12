import React from "react";

import Person from "../../shared/Person/Person";

function PeopleList(props) {
    return (
        <ul>
            {props.people.map(person => {
                return (
                    <Person
                        key={person.index}
                        name={person.name}
                        onClick={props.onPersonClick}
                    />
                )
            })}
        </ul>
    )
}

export default PeopleList;
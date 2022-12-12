import React, { useState } from "react";

import Name from "../Name/Name";
import NameForm from "../NameForm/NameForm";
import Button from "../../shared/Button/Button";

function NamesList(props) {
    const [people, setPeople] = useState([]);

    const createName = (event, name, index) => {
        event.preventDefault();
        const newPerson = { name, payment: 0, index };
        setPeople(people => [...people, newPerson]);
    }

    const nextClickHandler = () => {
        localStorage.setItem('storedPeople', JSON.stringify(people));
        props.onNextClick();
    }

    return (
        <ul>
            {
                people.length > 0 && people.map(person => {
                    return <Name
                        key={person.index}
                        name={person.name}
                    />
                })
            }
            <NameForm onAdd={createName} />
            <Button
                onClick={nextClickHandler}
                disabled={people.length < 2}
            >Next</Button>
        </ul>
    )
}

export default NamesList;
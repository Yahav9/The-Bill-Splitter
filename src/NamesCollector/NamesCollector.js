import React, { useState } from 'react';

import './NamesCollector.scss';
import Person from '../shared/Person/Person';
import NameForm from './NameForm/NameForm';
import Button from '../shared/Button/Button';

function NamesCollector(props) {
    const [people, setPeople] = useState([]);

    const createName = (event, name, index) => {
        event.preventDefault();
        const newPerson = { name, payment: 0, index };
        setPeople(people => [...people, newPerson]);
    };

    const nextClickHandler = () => {
        localStorage.setItem('storedPeople', JSON.stringify(people));
        props.onNextClick();
    };

    return (
        <div className="names-collector">
            <h1>Who's Here?</h1>
            <ul className="names-list">
                {
                    people.length > 0 && people.map(person => {
                        return <Person
                            key={person.index}
                            name={person.name}
                        />;
                    })
                }
            </ul>
            <NameForm onAdd={createName} />
            <Button
                className="next-button"
                onClick={nextClickHandler}
                disabled={people.length < 2}
            >Next</Button>
        </div>
    );
}

export default NamesCollector;

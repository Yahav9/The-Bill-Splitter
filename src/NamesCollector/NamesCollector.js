import React, { useState } from 'react';

import './NamesCollector.scss';
import Person from '../shared/Person/Person';
import NameForm from './NameForm/NameForm';
import Button from '../shared/Button/Button';

function NamesCollector(props) {
    const [people, setPeople] = useState(props.data ? props.data.people : []);

    const createName = (event, name, index) => {
        event.preventDefault();
        const newPerson = { name, payment: 0, index };
        setPeople(people => [...people, newPerson]);
    };

    const nextClickHandler = () => {
        const data = {
            expiration: new Date(new Date().getTime() + 1000 * 60 * 60).toISOString(),
            phase: 3,
            items: props.data ? props.data.items : [],
            people,
            tip: props.data ? props.data.tip : 1.1
        };
        localStorage.setItem('billSplitterData', JSON.stringify(data));
        props.onNextClick();
    };

    const personDeleteHandler = deletedPersonIndex => {
        setPeople(people.filter(person => person.index !== deletedPersonIndex));
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
                            index={person.index}
                            onDelete={personDeleteHandler}
                            isNamesCollectorPhase
                        />;
                    })
                }
            </ul>
            <NameForm onAdd={createName} />
            <Button
                className="next-button"
                onClick={nextClickHandler}
                disabled={people.length < 2}
            >NEXT</Button>
        </div>
    );
}

export default NamesCollector;

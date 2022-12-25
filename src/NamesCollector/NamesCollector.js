import React, { useState } from 'react';

import './NamesCollector.scss';
import Person from '../shared/Person/Person';
import NameForm from './NameForm/NameForm';
import Button from '../shared/Button/Button';

function NamesCollector(props) {
    const [people, setPeople] = useState(props.data ? props.data.people : []);

    const createName = (event, name) => {
        event.preventDefault();
        const index = people.length < 1 ? 0 : people[people.length - 1].index + 1;
        const newPerson = { name, payment: 0, index };
        setPeople(people => [...people, newPerson]);
    };

    const nextOrBackClickHandler = phase => {
        const data = {
            expiration: new Date(new Date().getTime() + 1000 * 60 * 60).toISOString(),
            phase,
            items: props.data ? props.data.items : [],
            people,
            tip: props.data ? props.data.tip : 1.1
        };
        localStorage.setItem('billSplitterData', JSON.stringify(data));
        if (phase === 3) props.onNextClick();
        if (phase === 1) props.onBackClick();
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
            <div className='buttons'>
                <Button
                    inverse
                    className="back-button"
                    onClick={() => nextOrBackClickHandler(1)}
                >Back</Button>
                <Button
                    className="next-button"
                    onClick={() => nextOrBackClickHandler(3)}
                    disabled={people.length < 2}
                >NEXT</Button>
            </div>
        </div>
    );
}

export default NamesCollector;

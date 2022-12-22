import React, { useEffect, useState } from 'react';

import { calculatePayment, splitItem } from './helper-functions/helperFunctions';
import Button from '../shared/Button/Button';
import Item from '../shared/Item/Item';
import PeopleList from '../shared/PeopleList/PeopleList';
import './Splitter.scss';

function Splitter(props) {
    const [items, setItems] = useState([]);
    const [people, setPeople] = useState([]);
    const [itemsIndex, setItemsIndex] = useState(0);
    const [splitters, setSplitters] = useState([]);

    useEffect(() => {
        setItems(JSON.parse(localStorage.getItem('storedItems')));
        setPeople(JSON.parse(localStorage.getItem('storedPeople')));
    }, []);

    const addOrRemoveSplitter = (personName) => {
        for (let splitter of splitters) {
            if (splitter === personName) {
                setSplitters(
                    splitters.filter((splitter) => {
                        return splitter !== personName;
                    })
                );
                return;
            }
        }
        setSplitters((splitters) => [...splitters, personName]);
    };

    const nextClickHandler = () => {
        splitItem(items[itemsIndex].price, splitters, people);
        if (items.length > itemsIndex + 1) {
            setSplitters([]);
            setItemsIndex(itemsIndex + 1);
        } else {
            const tip = Number(localStorage.getItem('tip'));
            calculatePayment(tip, people);
            localStorage.setItem('storedPeople', JSON.stringify(people));
            props.onCalculateClick();
        }
    };

    return (
        <div className="splitter">
            <h1>Who's paying?</h1>
            {items.length > 0 && (
                <Item name={items[itemsIndex].name} price={items[itemsIndex].price} />
            )}
            <PeopleList
                people={people}
                splitters={splitters}
                onPersonClick={addOrRemoveSplitter}
            />
            <Button
                className="next-button"
                onClick={nextClickHandler}
                disabled={splitters.length < 1}
            >
                {items.length > itemsIndex + 1 ? 'NEXT' : 'CALCULATE'}
            </Button>
        </div>
    );
}

export default Splitter;

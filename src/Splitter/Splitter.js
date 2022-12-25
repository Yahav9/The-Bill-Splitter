import React, { useState } from 'react';

import { calculatePayment, splitItem } from './helper-functions/helperFunctions';
import Button from '../shared/Button/Button';
import Item from '../shared/Item/Item';
import PeopleList from '../shared/PeopleList/PeopleList';
import './Splitter.scss';

function Splitter(props) {
    const [itemsIndex, setItemsIndex] = useState(0);
    const [splitters, setSplitters] = useState([]);
    const items = props.data.items;
    const people = props.data.people;

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
            const tip = Number(props.data.tip);
            calculatePayment(tip, people);
            const data = {
                expiration: new Date(new Date().getTime() + 1000 * 60 * 60).toISOString(),
                phase: 5,
                items: props.data.items,
                people,
                tip: props.data.tip
            };
            localStorage.setItem('billSplitterData', JSON.stringify(data));
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

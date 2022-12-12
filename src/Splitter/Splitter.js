import React, { useEffect, useState } from "react";

import Button from "../shared/Button/Button";
import Item from "../ItemCollector/Item/Item";
import PeopleList from "./PeopleList/PeopleList";

function Splitter(props) {
    const [items, setItems] = useState([]);
    const [people, setPeople] = useState([]);
    const [itemsIndex, setItemsIndex] = useState(0);
    const [splitters, setSplitters] = useState([]);

    useEffect(() => {
        setItems(JSON.parse(localStorage.getItem('storedItems')));
        setPeople(JSON.parse(localStorage.getItem('storedPeople')));
    }, []);

    const addOrRemoveSplitter = personName => {
        for (let splitter of splitters) {
            if (splitter === personName) {
                setSplitters(splitters.filter(splitter => { return splitter !== personName }));
                console.log(splitters);
                return;
            }
        }
        setSplitters(splitters => [...splitters, personName]);
        console.log(splitters);
    }

    const splitItem = () => {
        const splittedPrice = items[itemsIndex].price / splitters.length;
        console.log(splittedPrice);
        for (const splitter of splitters) {
            for (const person of people) {
                if (splitter === person.name) {
                    person.payment += splittedPrice;
                }
            }
        }
        if (items.length > itemsIndex + 1) {
            setSplitters([]);
            setItemsIndex(itemsIndex + 1);
        } else {
            const tip = Number(localStorage.getItem('tip'));
            for (const person of people) {
                person.payment = person.payment * tip;
            }
            localStorage.setItem('storedPeople', JSON.stringify(people));
            props.onCalculateClick();
        }
    }

    return (
        <>
            <h2>Who's paying?</h2>
            {
                items.length > 0 &&
                <Item
                    name={items[itemsIndex].name}
                    price={items[itemsIndex].price}
                />
            }
            <PeopleList
                people={people}
                onPersonClick={addOrRemoveSplitter}
            />
            <Button
                onClick={splitItem}
                disabled={splitters.length < 1}
            >
                {items.length > itemsIndex + 1 ? 'NEXT' : 'CALCULATE'}
            </Button>
        </>
    )
}

export default Splitter;
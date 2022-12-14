import React, { useEffect, useState } from "react";

import PeopleList from "../shared/PeopleList/PeopleList";
import './Conclusion.scss';

function Conclusion() {
    const [people, setPeople] = useState([]);

    useEffect(() => {
        setPeople(JSON.parse(localStorage.getItem('storedPeople')))
    }, []);

    return (
        <div className="conclusion">
            <h1>Come Again!</h1>
            <PeopleList
                people={people}
                total={people.reduce((a, b) => Number(a) + Number(b.payment), 0).toFixed(2)}
            />
        </div>

    )
}

export default Conclusion;
import React, { useEffect, useState } from "react";

import PeopleList from "../shared/PeopleList/PeopleList";

function Conclusion() {
    const [people, setPeople] = useState([]);

    useEffect(() => {
        setPeople(JSON.parse(localStorage.getItem('storedPeople')))
    }, []);

    return (
        <>
            <h1>Come Again</h1>
            <PeopleList
                people={people}
                total={people.reduce((a, b) => Number(a) + Number(b.payment), 0).toFixed(2)}
            />
        </>
    )
}

export default Conclusion;
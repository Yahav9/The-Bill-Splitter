import React from 'react';

import PeopleList from '../shared/PeopleList/PeopleList';
import './Conclusion.scss';

function Conclusion(props) {
    return (
        <div className="conclusion">
            <h1>See You Next Time!</h1>
            <PeopleList
                people={props.data.people}
                total={props.data.people
                    .reduce((a, b) => Number(a) + Number(b.payment), 0)
                    .toFixed(2)}
            />
        </div>
    );
}

export default Conclusion;

import React from "react";

import Card from "../../shared/Card/Card";

function Person(props) {


    return (
        <li onClick={() => props.onClick(props.name)}>
            <Card>
                <h2>
                    {props.name}
                </h2>
                {
                    props.payment &&
                    <h2>{props.payment.toFixed(2)}</h2>
                }
            </Card>
        </li>
    )
}

export default Person;
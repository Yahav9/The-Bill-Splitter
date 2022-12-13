import React, { useState } from "react";

import Button from "../shared/Button/Button";
import './Tip.scss';

function Tip(props) {
    const [percentage, setPercentage] = useState(10);

    const submitHandler = event => {
        event.preventDefault();
        localStorage.setItem('tip', 1 + percentage / 100);
        props.onNextClick();
    }

    return (
        <form className="tip" onSubmit={submitHandler}>
            <h1>Tip?</h1>
            <div className="input">
                <input
                    type="number"
                    min="0"
                    max="100"
                    autoFocus
                    value={percentage}
                    onChange={event => setPercentage(event.target.value)}
                /> %</div>
            <Button>Next</Button>
        </form>
    )
}

export default Tip;
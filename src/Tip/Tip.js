import React, { useState } from "react";

import Button from "../shared/Button/Button";

function Tip(props) {
    const [percentage, setPercentage] = useState(10);

    const submitHandler = event => {
        event.preventDefault();
        localStorage.setItem('tip', 1 + percentage / 100);
        props.onNextClick();
    }

    return (
        <form onSubmit={submitHandler}>
            <h2>How much tip do you wanna give?</h2>
            <input
                type="number"
                autoFocus
                value={percentage}
                onChange={event => setPercentage(event.target.value)}
            /> %
            <Button>Next</Button>
        </form>
    )
}

export default Tip;
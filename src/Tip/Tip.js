import React, { useState } from 'react';

import Button from '../shared/Button/Button';
import './Tip.scss';

function Tip(props) {
    const [percentage, setPercentage] = useState(props.data ? Math.round((props.data.tip - 1) * 100) : 10);

    const submitHandler = event => {
        event.preventDefault();
        const data = {
            expiration: new Date(new Date().getTime() + 1000 * 60 * 60).toISOString(),
            phase: 4,
            items: props.data.items,
            people: props.data.people,
            tip: 1 + percentage / 100
        };
        localStorage.setItem('billSplitterData', JSON.stringify(data));
        props.onNextClick();
    };

    const backClickHandler = () => {
        const data = {
            expiration: new Date(new Date().getTime() + 1000 * 60 * 60).toISOString(),
            phase: 2,
            items: props.data.items,
            people: props.data.people,
            tip: 1 + percentage / 100
        };
        localStorage.setItem('billSplitterData', JSON.stringify(data));
        props.onBackClick();
    };

    return (
        <form className="tip" onSubmit={submitHandler}>
            <h1>Tip?</h1>
            <div className="input">
                <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    autoFocus
                    value={percentage}
                    onChange={event => setPercentage(event.target.value)}
                /> %</div>
            <div className='buttons'>
                <Button inverse type='button' onClick={backClickHandler}>BACK</Button>
                <Button disabled={percentage < 1} type="submit">NEXT</Button>
            </div>
        </form>
    );
}

export default Tip;

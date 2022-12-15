import React from 'react';

import './ItemCollector.scss';
import ItemsList from './ItemsList/ItemsList';

function ItemCollector(props) {
    return (
        <div className="item-collector">
            <h2>Give Me Every Item on the Bill</h2>
            <ItemsList
                onNextClick={props.onNextClick}
            />
        </div>
    );
}

export default ItemCollector;

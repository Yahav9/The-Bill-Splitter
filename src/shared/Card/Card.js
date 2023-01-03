import React from 'react';

import './Card.scss';

const Card = props => {
    if (props.isListItem) {
        return (
            <li
                className={`card ${props.className}`}
                style={props.style}
                onClick={props.onClick ? () => props.onClick() : () => {
                    return;
                }}
            >
                {props.children}
            </li >
        );
    } else {
        return (
            <div
                className={`card ${props.className}`}
                style={props.style}>
                {props.children}
            </div>
        );
    }
};

export default Card;

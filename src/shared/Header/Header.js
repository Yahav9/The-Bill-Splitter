import React from 'react';

import './Header.scss';

function Header(props) {
    return (
        <header className="header">
            <h1>BillSplitter</h1>
            <button onClick={() => props.onNewBillClick()}>New Bill</button>
        </header>
    );
};

export default Header;

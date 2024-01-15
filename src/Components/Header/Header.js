import React from "react";
import './Header.css';
class Header extends React.Component {
    render() {
        const jsx = (

            <div className='Header'>
                <img src="/images/jammming_logo_logo.png" alt="logo" />
            </div>
        );
        return jsx;
    }
}

export default Header;
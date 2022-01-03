import React from 'react';
import './style.css';

const DropdownMenu = (props) => {
    return (
        <>
            <div className="dropdown">
                {props.menu}
                <div className="main-content">
                    <div class="triangle-down"></div>
                    {props.firstMenu}

                    <ul className="rest-dropdown">
                        {props.menus &&
                            props.menus.map((item, index) => (
                                <li key={index} className="dropdown-item">
                                    <a className="dropdown-anchor">
                                        {item.icon}
                                        <div className="profile">{item.label}</div>
                                    </a>
                                </li>

                            ))
                        }
                    </ul>
                </div>
            </div>
        </>
    );
}

const BlueButton = (props) => {
    return (
        <>
            <a className="bluebtn blue_btn" href=''>
                View All
            </a>
        </>
    );
}

export { DropdownMenu, BlueButton };
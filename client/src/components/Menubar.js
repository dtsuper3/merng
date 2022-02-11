import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'
import { AuthContext } from "../context/auth";

export default function MenuBar() {
    const pathname = window.location.pathname;
    const path = pathname === "/" ? "home" : pathname.substr(1);
    const context = useContext(AuthContext);
    const [activeItem, setActiveItem] = useState(path);


    function handleItemClick(e, { name }) {
        setActiveItem(name);
    }
    function logout() {

    }
    const menuBar = context.user ? (

        <Menu pointing secondary size="massive" color="teal">
            <Menu.Item
                name={context.user.username}
                active
                as={Link}
                to="/"
            />

            <Menu.Menu position='right'>
                <Menu.Item
                    name='logout'
                    onClick={logout}
                    color="red"
                />
            </Menu.Menu>
        </Menu>
    ) : (
            <Menu pointing secondary size="massive" color="teal">
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/"
                />

                <Menu.Menu position='right'>
                    <Menu.Item
                        name='login'
                        active={activeItem === 'login'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/login"
                    />
                    <Menu.Item
                        name='register'
                        active={activeItem === 'register'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/register"
                    />
                </Menu.Menu>
            </Menu>
        )

    return menuBar;
}
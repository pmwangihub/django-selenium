
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';

export const NavBarProfileDropDown = ({ authData }) => {

    const email = authData.details.user.email;
    const username = email.split('@')[0];



    return (
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-person-circle me-1" />{username}
            </a>
            <ul className="dropdown-menu">
                <li>
                    <NavLink className="dropdown-item bg-transparent text-dark fs-6" to="/profile" >
                        <i className="bi bi-person-fill me-2" />
                        Account
                    </NavLink>
                </li>
                <li>
                    <NavLink className="dropdown-item bg-transparent text-dark fs-6" to="/profile/settings" >
                        <i className="bi bi-gear-fill me-2" />
                        Settings
                    </NavLink>
                </li>
                <li>
                    <NavLink className="dropdown-item bg-transparent text-dark fs-6" to="/profile/products-alert" >
                        <i className="bi bi-archive-fill me-2" />
                        Your products
                    </NavLink>
                </li>

            </ul>
        </li>
    )
}

NavBarProfileDropDown.propTypes = {
    authData: PropTypes.object.isRequired
}

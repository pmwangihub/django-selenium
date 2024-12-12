import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export const NavLinkItem = ({ to, label, active, children }) => (
    <li className="nav-item">
        <NavLink
            to={to}
            className={({ isActive }) => `nav-link rounded-0  link-body-emphasis mx-1 border-bottom mb-1 ${isActive ? active : ""}`}
        >
            {children}
            {label}
        </NavLink>
    </li>
);

NavLinkItem.propTypes = {
    to: PropTypes.string.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    icon: PropTypes.string,
    active: PropTypes.string,
    children: PropTypes.node,
};

export default NavLinkItem;

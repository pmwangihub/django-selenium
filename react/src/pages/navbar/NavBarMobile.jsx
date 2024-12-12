
import { NavLink } from "react-router-dom";
import { Logout } from "../auth/Logout";

export const NavBarMobile = () => {
    return (
        <ul className="list-group list-group-flush">
            <NavLink
                className="list-group-item list-group-item-action text-white bg-transparent fs-6"
                to="/">
                <i className="bi bi-house-fill me-2" />
                Overview
            </NavLink>

            <NavLink
                className="list-group-item list-group-item-action text-white bg-transparent fs-6"
                to="/categories">
                <i className="bi bi-archive-fill me-2" />
                Jumia Products
            </NavLink>
            <NavLink
                className="list-group-item list-group-item-action text-white bg-transparent fs-6"
                to="/project-scrape">
                <i className="bi bi bi-cloud-lightning-fill me-2" />
                Web scrape
            </NavLink>
            <NavLink
                className="list-group-item list-group-item-action text-white bg-transparent fs-6"
                to="/register">
                <i className="bi bi-browser-edge me-2" />
                Sign up
            </NavLink>
            <NavLink className="list-group-item list-group-item-action text-white bg-transparent fs-6" />
            <Logout redirect={true} navigate_to={"/"} styles={"mt-3"} />
        </ul>
    );
};


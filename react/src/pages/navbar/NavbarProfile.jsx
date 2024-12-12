import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

export const NavbarProfile = ({ authData }) => {
    const email = authData.details.user.email;
    const username = email.split("@")[0];
    return (
        <div className="" id="userMenuParent">
            <h4
                className="fw-bold px-3"
                data-bs-toggle="collapse"
                data-bs-target="#userMenu"
                style={{ cursor: "pointer" }}
            >
                <i className="bi bi-person-circle me-2" />
                <span className="text-capitalize">{username}</span>
            </h4>

            <div
                id="userMenu"
                className="accordion-collapse collapse"
                data-bs-parent="#userMenuParent"
            >
                <div className="accordion-body bg-transparent">
                    <ul className="list-group list-group-flush text-white ms-3">
                        <button className="list-group-item list-group-item-action bg-transparent">
                            <NavLink className="text-decoration-none fs-6" to="/profile">
                                Account
                            </NavLink>
                        </button>
                        <button className="list-group-item list-group-item-action bg-transparent">
                            <NavLink
                                className="text-decoration-none fs-6"
                                to="/profile/settings"
                            >
                                Settings
                            </NavLink>
                        </button>
                        <button className="list-group-item list-group-item-action bg-transparent">
                            <NavLink
                                className="text-decoration-none fs-6"
                                to="/profile/products-alert"
                            >
                                Your products
                            </NavLink>
                        </button>
                    </ul>
                </div>
            </div>
        </div>
    );
};

NavbarProfile.propTypes = { authData: PropTypes.object.isRequired };

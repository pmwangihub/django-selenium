
import PropTypes from 'prop-types';
import { NavLinkItem } from "../NavLinkItem";
export const SideBar = ({ authData }) => {
    return (
        <div className="bg-white border-right col-md-3 col-lg-2 p-0">
            <div className="offcanvas-md offcanvas-end" tabIndex="-1" >
                <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                    <ul className="nav nav-pills flex-column mb-auto fs-6">

                        <NavLinkItem to={"/"} label={"Home"} icon={"house"} >
                            <i className="bi bi-house me-1" />
                        </NavLinkItem>
                        <NavLinkItem to={"/profile"} label={"Account"}  >
                            <i className="bi bi-person me-1" />
                        </NavLinkItem>
                        <NavLinkItem to={"/profile/settings"} label={"Settings"}  >
                            <i className="bi bi-gear me-1" />
                        </NavLinkItem>
                        <NavLinkItem to={"/profile/products-alert"} label={"Your products"}  >
                            <i className="bi bi-archive me-1" />
                        </NavLinkItem>
                        {authData.details.user.is_admin && <NavLinkItem to={"/profile/scrape"} label={"Scrape"}  >
                            <i className="bi bi-database-gear me-1" />
                        </NavLinkItem>}

                    </ul>
                </div>
            </div>
        </div>
    )
};

SideBar.propTypes = {
    authData: PropTypes.object
}
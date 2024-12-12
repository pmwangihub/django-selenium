import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Logout } from "../auth/Logout";
import { NavBarMobile } from "./NavBarMobile";
import { NavBarProfileDropDown } from "./NavBarProfileDropDown";
import { NavbarProfile } from "./NavbarProfile";

export const NavBar = () => {
	const authData = useSelector(state => state.AuthLoginReducer.authData);
	return (
		<>
			<header className="sticky-top">
				<div className="collapse text-white" id="navbarHeader" style={{ backgroundColor: "#2006ad" }}>
					<div className="container">
						<div className="row justify-content-between">

							{authData &&
								<div className="col-sm-12 col-md-4 offset-md-1 py-4">

									<NavbarProfile authData={authData} />
								</div>
							}
							<div className="col-sm-12 col-md-4 py-4">
								<h4 className="fw-bold px-3">Links</h4>
								<NavBarMobile authData={authData} />
							</div>
						</div>
					</div>
				</div>

				<div className="navbar  navbar-dark navbar-expand-md py-3" style={{ backgroundColor: "#2006ad" }}>
					<div className="container-fluid">

						<Link className="navbar-brand d-flex align-items-center" to="/">
							<strong className="d-none d-lg-block">Case Study: Jumia</strong>
						</Link>
						<div className="navbar-collapse collapse">
							<ul className="navbar-nav fs-6 ms-auto mb-2 mb-md-0">

								<li className="nav-item">
									<NavLink
										to="/"
										className={`nav-link ${({ isActive }) => (isActive ? "active" : "")}`}
									>
										Overview
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink
										to="/categories"
										className={`nav-link ${({ isActive }) => (isActive ? "active" : "")}`}
									>
										Jumia Products
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink
										to="/project-scrape"
										className={`nav-link ${({ isActive }) => (isActive ? "active" : "")}`}
									>
										Web Scrape
									</NavLink>
								</li>
								{authData &&
									<NavBarProfileDropDown authData={authData} />
								}
								{!authData &&
									<li className="nav-item">
										<NavLink
											to="/register"
											className={`nav-link ${({ isActive }) => (isActive ? "active" : "")}`}
										>
											Sign up
										</NavLink>
									</li>
								}
							</ul>
							<Logout
								redirect={true}
								navigate_to={"/"}
							/>
						</div>

						<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="true" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
					</div>
				</div>

			</header>
		</>
	)
}



export const OldNavBar = () => {
	const authData = useSelector(state => state.AuthLoginReducer.authData);
	return (
		<>
			<nav className="navbar sticky-top navbar-dark bg-primary navbar-expand-md">
				<div className="container-fluid">
					<Link className="navbar-brand" to="/">Case Study: Jumia</Link>
					<i className="bi bi-list navbar-toggler collapsed" data-bs-toggle="offcanvas" data-bs-target="#mobileNav" />


					<div className="navbar-collapse collapse">
						<ul className="navbar-nav fs-6 ms-auto mb-2 mb-md-0">

							<li className="nav-item">
								<NavLink
									to="/categories"
									className={`nav-link ${({ isActive }) => (isActive ? "active" : "")}`}
								>
									Jumia Products
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink
									to="/project-scrape"
									className={`nav-link ${({ isActive }) => (isActive ? "active" : "")}`}
								>
									Scrape
								</NavLink>
							</li>
							{authData &&
								<NavBarProfileDropDown authData={authData} />
							}
							{!authData &&
								<li className="nav-item">
									<NavLink
										to="/register"
										className={`nav-link ${({ isActive }) => (isActive ? "active" : "")}`}
									>
										Sign up
									</NavLink>
								</li>
							}
						</ul>
						<Logout
							redirect={true}
							navigate_to={"/"}
						/>
					</div>
				</div>
			</nav>
			{authData && <NavBarMobile authData={authData} />}
		</>
	)
}



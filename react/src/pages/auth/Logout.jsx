import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// Use thunk for advance actions
import { LogoutAction } from "../../resource/actions/LogoutAction";
// Use localAction for custom effects
// import { localLogout } from "../../resource";
// import { Api } from "../../api";

export const Logout = (props) => {
	const { redirect, navigate_to, styles } = props;
	const authData = useSelector(state => state.AuthLoginReducer.authData);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logout = (event) => {
		event.preventDefault();
		if (authData && authData.isAuthenticated) {
			dispatch(LogoutAction());
			if (redirect) {
				navigate(navigate_to);
			}
		}
	};

	return (
		<>
			{authData && authData.isAuthenticated ? (
				<button className={`btn btn-dark btn-sm ${styles}`} type="button" onClick={logout}>
					Logout
				</button>
			) : null}
		</>
	);
};

Logout.propTypes = {
	redirect: PropTypes.bool,
	navigate_to: PropTypes.string,
	styles: PropTypes.string,
};

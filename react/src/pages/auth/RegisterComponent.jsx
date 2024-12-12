
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
import TextField from '@mui/material/TextField';

import { wrapper } from "../wrapper/Wrapper";
import { localLogout } from "../../resource/reducer/LoginReducer";
import { authRegisterAction } from "../../resource/actions/RegisterAction";

export const Register = React.memo(function Register() {

	const [formError, setFormError] = useState(null);
	const [isPassword, setisPassword] = useState(true);
	const authLoader = useSelector(state => state.AuthLoginReducer.authLoader);
	const authError = useSelector(state => state.AuthLoginReducer.authError);
	const authData = useSelector(state => state.AuthLoginReducer.authData);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (authData) {
			navigate("/profile", { replace: true })
		}
	}, [authData, navigate]);

	const clearAuthLoginReducerError = () => dispatch(localLogout());

	const handleSubmit = event => {
		event.preventDefault();
		const { email, name, password, password2 } = event.target;

		if (password.value !== password2.value) {
			setFormError("Password don't match.");
			return;
		}
		const object = {
			name: name.value,
			email: email.value,
			password: password.value,
			password2: password2.value
		};
		dispatch(authRegisterAction(object));

	};


	return (
		<div className="d-flex justify-content-center my-5 pt-5">
			<div className="col-lg-6 col-12">

				{formError &&
					<div className="alert alert-danger alert-dismissible fade show">
						<strong className='ms-1'>Check passwords:</strong> {formError}
						<button type="button" className="btn-close" onClick={() => setFormError(null)} />
					</div>
				}

				{authError &&
					<div className="alert alert-danger alert-dismissible fade show">
						<strong className='ms-1'>Register error:</strong> {JSON.stringify(authError)}
						<button type="button" className="btn-close" onClick={clearAuthLoginReducerError} />
					</div>
				}

				<form onSubmit={handleSubmit}>
					<h3 className="mb-5">Sign up</h3>

					<div className="form-floating mb-3">
						<TextField id="outlined-basic" name="email" type='email' label="Email address" variant="outlined" sx={{
							width: "100%"
						}} required />
					</div>
					<div className="form-floating mb-3">
						<TextField id="outlined-basic" name="name" type='text' label="Name" variant="outlined" sx={{
							width: "100%"
						}} />
					</div>
					<div className="form-floating mb-3">
						<TextField id="outlined-basic" type={isPassword ? "password" : "text"}
							label="Password"
							variant="outlined"
							name="password"
							sx={{
								width: "100%"
							}} required />
					</div>
					<div className="form-floating mb-3">
						<TextField id="outlined-basic" type={isPassword ? "password" : "text"}
							label="Password again"
							variant="outlined"
							name="password2"
							sx={{
								width: "100%"
							}} required />
					</div>

					<div className="form-check mb-2">
						<input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" onChange={() => setisPassword(!isPassword)} />
						<label className="form-check-label text-muted" htmlFor="flexCheckChecked">
							Show passwords
						</label>
					</div>
					<button className="w-100 btn btn-warning" type="submit" disabled={authLoader}>Sign up</button>

					<div className='mt-3'>
						<p >If you an account <Link style={{ color: "#00f900" }} to="/login">Sign in</Link></p>
					</div>
				</form>

			</div>
		</div>

	)
});

export const RegisterComponent = wrapper(Register);
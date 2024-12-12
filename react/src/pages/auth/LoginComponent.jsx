import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { localLogout } from "../../resource/reducer/LoginReducer";
import { wrapper } from "../wrapper/Wrapper"
import { authLoginAction } from "../../resource/actions/LoginAction";


const Login = (function Login() {
	const [isPassword, setisPassword] = useState(true);
	const authLoader = useSelector(state => state.AuthLoginReducer.authLoader);
	const authError = useSelector(state => state.AuthLoginReducer.authError);
	const authData = useSelector(state => state.AuthLoginReducer.authData);
	const dispatch = useDispatch();
	const navigate = useNavigate()

	useEffect(() => {
		if (authData) {
			navigate("/profile", { replace: true })
		}
	}, [authData, navigate]);

	const handleSubmit = event => {
		event.preventDefault();
		const { email, password } = event.target;
		const object = {
			email: email.value,
			password: password.value,
		};
		dispatch(authLoginAction(object));
	};

	const clearAuthLoginReducerError = () => dispatch(localLogout());


	return (
		<div className="d-flex justify-content-center my-5 pt-5">
			<div className="col-lg-6 col-12">


				{authError &&
					<div className="alert alert-danger alert-dismissible fade show">
						<strong className='ms-1'>Register error:</strong> {JSON.stringify(authError)}
						<button type="button" className="btn-close" onClick={clearAuthLoginReducerError} />
					</div>
				}

				<form onSubmit={handleSubmit}>
					<h3 className="mb-5">Sign in</h3>
					<div className="mb-3">
						<TextField id="outlined-basic" name="email" type='email' label="Email" variant="outlined" sx={{
							width: "100%"
						}} />
					</div>

					<div className="form-floating mb-3">
						<TextField
							id="outlined-basic"
							type={isPassword ? "password" : "text"}
							label="Password"
							variant="outlined"
							name="password"
							sx={{
								width: "100%"
							}} />
					</div>
					<div className="form-check mb-2">
						<input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" onChange={() => setisPassword(!isPassword)} />
						<label className="form-check-label text-muted" htmlFor="flexCheckChecked">
							Show passwords
						</label>
					</div>
					<button className="w-100 btn btn-warning" type="submit" disabled={authLoader}>Sign in</button>

					<div className='mt-3'>
						<p >If you have no account <Link style={{ color: "#00f900" }} to="/register">Create one</Link></p>
					</div>
				</form>

			</div>
		</div>

	)
});

export const LoginComponent = wrapper(Login);
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Api } from "../../api";
import { LogoutAction } from "../../resource/actions/LogoutAction";


export const AlreadyAuthenticated = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [deleteAccountLoading, setDeleteAccountLoading] = useState(false);
	const [successMSG, setSuccessMSG] = useState(null);
	const [errors, setErrors] = useState([]);
	const { authData, authError, authLoader } = useSelector(state => state.AuthLoginReducer);

	useEffect(() => {
		if (authError) {
			setErrors(prevErrors => Array.isArray(prevErrors) ? [...prevErrors, authError] : [authError]);
		}
	}, [authError])

	useEffect(() => {
		if (!authData && !authLoader) {
			navigate("/", { replace: true })
		}
	}, [authData, authLoader, navigate])

	const handleDeleteAccount = () => {
		setDeleteAccountLoading(true);
		if (authData) {
			let email = {
				email: authData.details.user.email
			}
			Api.deleteAccount(email)
				.then(response => {
					if (response.data) {
						setSuccessMSG(response.data)
						dispatch(LogoutAction());
					}
					setDeleteAccountLoading(false);
				})
				.catch(err => {
					let errors_ = {
						"deleteFailed": err.message
					}
					setErrors(prevErrors => Array.isArray(prevErrors) ? [...prevErrors, errors_] : [errors_]);
					setDeleteAccountLoading(false);
				});
		} else {
			let errors_ = {
				"deleteFailed": "Are you sure you have an account?"
			}
			setErrors(prevErrors => Array.isArray(prevErrors) ? [...prevErrors, errors_] : [errors_]);
		}
		setDeleteAccountLoading(false);
	}

	const handleLogout = (event) => {
		event.preventDefault();
		dispatch(LogoutAction());
	}

	const dismissError = () => setErrors([]);

	const errorProps = {
		dismissError,
		errors
	}

	return (
		<>
			{authData &&
				<>
					{(errors.length > 0) && <ErrorAlert {...errorProps} />}
					{(successMSG) && <SuccessAlert successMSG={successMSG} />}
					<div className="card mb-4 fs-6">
						<div className="card-body">
							<h3 className="card-title fw-bold">Account Details</h3>
							<p className="card-text">Your dashboard is ready. You can change any settings freely.</p>
							<ul className="list-group list-group-flush">
								<li className="list-group-item">
									<strong className="me-2">Email:</strong>
									<span>{authData.details.user.email}</span>
								</li>
								<li className="list-group-item">
									<strong className="me-2">Account status:</strong>
									<span>{authData.details.user.is_active ? "Account is active" : "Account inactive"}</span>
								</li>
								<li className="list-group-item">
									<strong className="me-2">Account Name:</strong>
									<span>{authData.details.user.name ? `${authData.details.user.name}` : "Empty"}</span>
								</li>
							</ul>
						</div>
					</div>
					<div className="card fs-6 mb-4" >
						<div className="card-body">
							<h3 className="card-title fw-bold">Account Settings</h3>
							<p className="card-text">Delete your account or update your account. <span className="text-danger">Kindly note these actions may not work for now</span></p>
							<div className="d-flex justify-content-start">
								<button className="me-1 btn btn-sm btn-primary">Update</button>
								<button disabled={deleteAccountLoading} className="me-1 btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#deleteAccountModal" >
									{deleteAccountLoading && <div className="spinner-border text-dark me-1" style={{ height: "1.5rem", width: "1.5rem" }} />}
									Delete account
								</button>
								<button disabled={authLoader} className="me-1 btn btn-sm btn-outline-dark" onClick={handleLogout}>
									{authLoader && <div className="spinner-border text-dark me-1" style={{ height: "1.5rem", width: "1.5rem" }} />}
									Sign out
								</button>
							</div>

							<DeleteAccountModal handleDeleteAccount={handleDeleteAccount} />
						</div>
					</div>
				</>
			}
		</>
	)
}


const ErrorAlert = (props) => {
	return (
		<div className="alert alert-danger alert-dismissible fade show" role="alert">
			<strong>Error:</strong> {JSON.stringify(props.errors)}
			<button type="button" className="btn-close" onClick={() => props.dismissError()} />
		</div>
	)
}

const SuccessAlert = (props) => {
	return (
		<div className="alert alert-success alert-dismissible fade show" role="alert">
			<strong>Error:</strong> {JSON.stringify(props.successMSG)}
		</div>
	)

}

const DeleteAccountModal = ({ handleDeleteAccount }) => {
	return (
		<div className="modal fade" id="deleteAccountModal" tabIndex="-1">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-6">Account Deletion</h1>
						<button type="button" className="btn-close" data-bs-dismiss="modal"></button>
					</div>
					<div className="modal-body fs-6">
						Are you sure you want to delete account?
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal">Cancel</button>
						<button type="button" className="btn btn-sm btn-primary" onClick={handleDeleteAccount} data-bs-dismiss="modal">Yes Delete</button>
					</div>
				</div>
			</div>
		</div>
	);
};
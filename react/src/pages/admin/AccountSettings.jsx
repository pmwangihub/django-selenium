
import PropTypes from 'prop-types'
import { profileWrapper } from "./ProfileWrapper";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Api } from "../../api";
import { LogoutAction } from "../../resource/actions/LogoutAction";
import { SettingsDeleteAccountModal } from './settings/SettingsDeleteAccountModal';
import { SettingsErrorAlert } from './settings/SettingsErrorAlert';
import { SettingsSuccessAlert } from './settings/SettingsSuccessAlert';

export const AccountSettingsComponent = ({ authData, authError, authLoader }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [deleteAccountLoading, setDeleteAccountLoading] = useState(false);
    const [successMSG, setSuccessMSG] = useState(null);
    const [errors, setErrors] = useState([]);


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

    const dismissError = () => setErrors([]);

    const errorProps = {
        dismissError,
        errors
    }

    return (
        <>
            {authData &&
                <>
                    {(errors.length > 0) && <SettingsErrorAlert {...errorProps} />}
                    {(successMSG) && <SettingsSuccessAlert successMSG={successMSG} />}

                    <div className="card border-0 fs-6 mb-4" >
                        <div className="card-body">
                            <h3 className="card-title fw-bold">Account Settings</h3>
                            <p className="card-text">Delete your account or update your account.
                                <span className="text-danger">Kindly note these actions may not work for now</span></p>
                            <div className="d-flex justify-content-start">
                                <button className="me-1 btn btn-sm btn-primary">Update</button>
                                <button disabled={deleteAccountLoading} className="me-1 btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#deleteAccountModal" >
                                    {deleteAccountLoading &&
                                        <div className="spinner-border text-dark me-1" style={{ height: "1.5rem", width: "1.5rem" }} />}
                                    Delete account
                                </button>
                            </div>

                            <SettingsDeleteAccountModal handleDeleteAccount={handleDeleteAccount} />
                        </div>
                    </div>
                </>
            }
        </>
    )
}
AccountSettingsComponent.propTypes = {
    authData: PropTypes.object,
    authError: PropTypes.object,
    authLoader: PropTypes.bool,
}


export const AccountSettings = profileWrapper(AccountSettingsComponent);



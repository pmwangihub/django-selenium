
import { profileWrapper } from "./ProfileWrapper";
import PropTypes from 'prop-types'

export const AccountDetailsComponent = ({ authData }) => {

    return (
        <>
            {authData &&
                <>
                    <div className="card border-0 mb-4 fs-6">
                        <div className="card-body">
                            <h3 className="card-title fw-bold">Account Details</h3>
                            <p className="card-text">Your dashboard is ready. You can change any settings freely.</p>
                            <div className="col-lg-4">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item px-0">
                                        <strong className="me-2">Email:</strong>
                                        <span>{authData.details.user.email}</span>
                                    </li>
                                    <li className="list-group-item px-0">
                                        <strong className="me-2">Account status:</strong>
                                        <span>{authData.details.user.is_active ? "Account is active" : "Account inactive"}</span>
                                    </li>
                                    <li className="list-group-item px-0">
                                        <strong className="me-2">Account Name:</strong>
                                        <span>{authData.details.user.name ? `${authData.details.user.name}` : "Empty"}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </>
            }
        </>
    )
}

AccountDetailsComponent.propTypes = {
    authData: PropTypes.object,
}


export const AccountDetails = profileWrapper(AccountDetailsComponent);


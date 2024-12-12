import PropTypes from 'prop-types'

export const SettingsDeleteAccountModal = ({ handleDeleteAccount }) => {
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
                        <button type="button" className="btn btn-sm btn-danger" onClick={handleDeleteAccount} data-bs-dismiss="modal">Yes Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

SettingsDeleteAccountModal.propTypes = {
    handleDeleteAccount: PropTypes.func,
}

export default SettingsDeleteAccountModal
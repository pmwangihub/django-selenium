
import PropTypes from 'prop-types'

export const SettingsSuccessAlert = ({ successMSG }) => {
    return (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Error:</strong> {JSON.stringify(successMSG)}
        </div>
    )
}

SettingsSuccessAlert.propTypes = {
    successMSG: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
}

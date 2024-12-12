
import PropTypes from 'prop-types'

export const SettingsErrorAlert = (props) => {
    const { errors, dismissError } = props;
    return (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error:</strong> {JSON.stringify(errors)}
            <button type="button" className="btn-close" onClick={() => dismissError()} />
        </div>
    )
}

SettingsErrorAlert.propTypes = {
    errors: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    dismissError: PropTypes.func.isRequired,
}

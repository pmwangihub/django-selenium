
import PropTypes from 'prop-types';

export const LoaderDiv = ({ loadInfo }) => {
    return (
        <div className="px-4 py-5 my-5 text-center">
            <div className="mx-auto d-flex flex-column align-items-center">
                <span className="mb-2">{loadInfo ? loadInfo : `Loading...`}</span>
                <div className="spinner-border text-info" />
            </div>
        </div>
    );
};

LoaderDiv.propTypes = {
    loadInfo: PropTypes.string
}
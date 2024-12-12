import React from 'react';
import PropTypes from 'prop-types';

export const ErrorDiv = ({ error }) => {

    if (!error) return (
        <React.Fragment />
    );

    return (
        <div className="px-4 py-5 my-5 text-center">
            <div className="col-lg-6 mx-auto">
                <div className="alert alert-danger" >
                    {typeof error === 'object' ? JSON.stringify(error) : error}
                </div>
            </div>
        </div>
    );
};

ErrorDiv.propTypes = {
    error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
};


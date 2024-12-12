
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

export const PageNavBar = ({ current }) => {
    const navigate = useNavigate();

    const goBack = (event) => {
        event.preventDefault();
        return navigate(-1);
    };
    return (
        <nav >
            <ol className="breadcrumb fs-6 py-3">
                <li className="breadcrumb-item">
                    <a className="link-body-emphasis" onClick={goBack}>
                        <i className="bi bi-house-fill" />
                    </a>
                </li>
                <li className="breadcrumb-item">
                    <Link to="/categories" className="link-body-emphasis fw-semibold text-decoration-none" >
                        Categories
                    </Link>
                </li>
                <li className="breadcrumb-item ms-2 active" aria-current="page">
                    {current}
                </li>
            </ol>
        </nav>
    )
}

PageNavBar.propTypes = {
    current: PropTypes.string.isRequired
}


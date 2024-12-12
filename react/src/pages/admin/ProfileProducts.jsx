import PropTypes from 'prop-types';
import { profileWrapper } from "./ProfileWrapper";
import { useEffect, useState, useCallback } from 'react';
import { Api } from '../../api';
import { LoaderDiv } from '../LoaderDiv';
import { ErrorDiv } from "../ErrorDiv";
import { utils } from '../../utils';
import { Link } from 'react-router-dom';
import { ProductSubscription } from '../components/ProductSubscription';

export const ProfileProductsComponent = ({ authData }) => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState(null);
    const [error, setError] = useState(null);
    const userEmail = authData?.details?.user?.email;

    const fetchSubscription = useCallback(async () => {
        if (!userEmail) return;
        setLoading(true);
        setError(null);
        try {
            const response = await Api.getProfileProducts({ user: userEmail });
            setProducts(response?.data || null);
        } catch (error) {
            setError("Failed to load products. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, [userEmail]);

    useEffect(() => {
        fetchSubscription();
    }, [fetchSubscription]);

    return (
        <div className="card border-0 fs-6">
            <Introduction />

            {loading && <LoaderDiv loadInfo="Fetching subscribed products" />}
            {error && <ErrorDiv error={error} />}

            {!loading && !error && (!products || products.length === 0) && (
                <div className="card border-0 shadow">
                    <div className="card-body">
                        You do not have any products now.
                        <Link to="/categories" className="link-underline-light">
                            {` Find your favorite products`}
                        </Link>
                    </div>
                </div>
            )}

            {!loading && !error && products && products.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-hover fs-6">
                        <thead>
                            <tr>
                                <th scope="col">Preview</th>
                                <th scope="col">Date</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Discount</th>
                                <th scope="col">
                                    <i className="bi bi-trash-fill text-danger" />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((sub) => (
                                <tr key={sub.product.slug}>
                                    <td>
                                        <Link to={`/product-info/${sub.product.slug}`}>
                                            <img src={sub.product.image_url} alt="product" height={80} />
                                        </Link>
                                    </td>
                                    <td>{utils.PlainDate(sub.created_at)}</td>
                                    <td>
                                        <Link to={`/product-info/${sub.product.slug}`}>
                                            {utils.truncateText(sub.product.product_name, 5)}
                                        </Link>
                                    </td>
                                    <td>{sub.product.current_price}</td>
                                    <td><s>{sub.product.old_price}</s></td>
                                    <td>
                                        <ProductSubscription product_id={sub.product.id} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export const ProfileProducts = profileWrapper(ProfileProductsComponent);

const Introduction = () => (
    <div className="card-body">
        <h5 className="card-title">Your Products</h5>
        <p className="card-text mb-0">Your products simply mean you have selected specific product alerts.</p>
        <p className="card-text">
            Each time the product is checked from Jumia, an alert will be sent to your email with brief statistics.
        </p>
        <a href="#" className="card-link small text-uppercase d-none">Select a product</a>
    </div>
);

ProfileProductsComponent.propTypes = {
    authData: PropTypes.object.isRequired,
};

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import { useEffect, useState } from 'react';
import { Api } from '../../api';
import { Link } from 'react-router-dom';

const LOADING = "Loading ...";
const SUBSCRIBE = "Subscribe this product";
const UNSUBSCRIBE = "Unsubscribe this product";
const CREATE_ACCOUNT = "Create account!";

export const ProductSubscription = ({ useLabel, product_id, showLink }) => {
    const { authData, authLoader } = useSelector((state) => state.AuthLoginReducer);
    const [checked, setChecked] = useState(false);
    const [label, setLabel] = useState(SUBSCRIBE);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const user = authData?.details?.user?.email;
    useEffect(() => {
        const fetchSubscription = async () => {
            if (!user) return;
            setLoading(true);
            setLabel(LOADING);
            setErrorMessage('');

            try {
                const response = await Api.getProfileProduct({ user, product_id });
                if (response?.data?.is_subscribed) {
                    setChecked(true);
                    setLabel(UNSUBSCRIBE);
                } else {
                    setChecked(false);
                    setLabel(SUBSCRIBE);
                }
                setLoading(false);
            } catch (error) {
                setErrorMessage('Failed to load subscription status.');
                setLoading(false);
                setLabel(SUBSCRIBE);
            }
        };

        fetchSubscription();

    }, [product_id, user]);

    const handleChange = async (event) => {
        setLoading(true);
        setLabel(LOADING);
        setErrorMessage('');
        const is_checked = event.target.checked;
        setChecked(is_checked);

        try {
            const response = await Api.subscribeProfileProducts({ user, product_id, is_checked });
            if (response.status === 200) {
                setLabel(is_checked ? UNSUBSCRIBE : SUBSCRIBE);
            }
            setLoading(false);
        } catch (error) {
            setErrorMessage('Failed to update subscription.');
            setChecked(!is_checked);
            setLoading(false);
        }
    };

    return (
        <FormGroup>
            {!loading && errorMessage && <small className="text-danger">{errorMessage}</small>}

            {(authData && !authLoader) && (
                <>
                    <FormControlLabel
                        disabled={loading}
                        control={
                            <Switch
                                checked={checked}
                                onChange={handleChange}
                            />
                        }
                        label={loading ? <SmallSpinner /> : useLabel ? <small>{label}</small> : ''}

                    />
                    {showLink && <small><Link to="/profile/products-alert">View subscribed products</Link></small>}
                </>
            )}
            {(!authData && !authLoader) && (
                <FormControlLabel
                    disabled
                    control={<Switch />}
                    label={CREATE_ACCOUNT}
                />
            )}
        </FormGroup>
    );
};
const SmallSpinner = () => (<div className="spinner-border text-primary"
    style={{
        width: "10px",
        height: "10px",
        borderWidth: " 1px",
    }}
/>)

ProductSubscription.propTypes = {
    useLabel: PropTypes.bool,
    showLink: PropTypes.bool,
    product_id: PropTypes.number.isRequired,
};

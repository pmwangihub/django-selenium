import PropTypes from 'prop-types';
import * as React from 'react';
import { Api } from '../../../api';
import { LoaderDiv } from "../../LoaderDiv";
import { ErrorDiv } from "../../ErrorDiv";
import { ProductListTable } from './ProductListTable ';
import Input from '@mui/material/Input';

export const ProductsList = ({ category }) => {
    const { slug } = category;
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [products, setProducts] = React.useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [filteredProducts, setFilteredProducts] = React.useState([]);
    const [sortConfig, setSortConfig] = React.useState({ key: '', direction: '' });

    React.useEffect(() => {
        const fetchProductPriceChange = async () => {
            setLoading(true);
            try {
                const response = await Api.getCategoryProducts(slug);
                setProducts(response.data.products);
                setFilteredProducts(response.data.products);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchProductPriceChange();
    }, [slug]);

    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = products.filter(product =>
            product.product_name.toLowerCase().includes(query) ||
            product.current_price.toString().includes(query)
        );
        setFilteredProducts(filtered);
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }

        const sortedProducts = [...filteredProducts].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });

        setSortConfig({ key, direction });
        setFilteredProducts(sortedProducts);
    };

    if (loading) return <LoaderDiv loadInfo={'Fetching product data'} />;
    if (error) return <ErrorDiv error={error} />;

    return (
        <div className="col-12">
            <div className="card border-0 top-selling">
                <div className="row">
                    <div className='col-lg-9' />
                    <div className='col-lg-3'>
                        <Input
                            placeholder="Search ..."
                            sx={{ width: "100%", marginBottom: "3rem" }}
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                {filteredProducts && filteredProducts.length > 0 && (
                    <ProductListTable
                        products={filteredProducts}
                        handleSort={handleSort}
                        sortConfig={sortConfig}
                    />
                )}
            </div>
        </div>
    );
};

ProductsList.propTypes = {
    category: PropTypes.object.isRequired
};

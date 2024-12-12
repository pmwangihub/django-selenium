import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const ProductListTable = ({ products, handleSort, sortConfig }) => {

    const handleSortEvent = (event, key) => {
        event.preventDefault();
        handleSort(key);
    }
    return (
        <div className="table-responsive">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Preview</th>
                        <th scope="col">

                            <a href="#" className='text-decoration-none text-dark' onClick={(e) => handleSortEvent(e, 'product_name')}>
                                Product {sortConfig.key === 'product_name' ?
                                    (sortConfig.direction === 'ascending' ? <AscAlfaIcon /> : <DescAlfaIcon />) : <FilterIcon />}
                            </a>
                        </th>
                        <th scope="col">

                            <a href="#" className='text-decoration-none text-dark' onClick={(e) => handleSortEvent(e, 'current_price')}>
                                Price {sortConfig.key === 'current_price' ?
                                    (sortConfig.direction === 'ascending' ? <AscNumIcon /> : <DescNumIcon />) : <FilterIcon />}
                            </a>
                        </th>
                        <th scope="col">Discount%</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <th scope="row">
                                <Link to={`/product-info/${product.slug}`}>
                                    <img src={product.image_url} alt="" />
                                </Link>
                            </th>
                            <td>
                                <Link
                                    to={`/product-info/${product.slug}`}
                                    className="link-offset-2 link-underline link-underline-opacity-0"
                                >
                                    {product.product_name}
                                </Link>
                            </td>
                            <td>{`Ksh ${product.current_price}`}</td>
                            <td className="fw-bold">
                                {product.discount_percent ? product.discount_percent : "-"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


const AscNumIcon = () => (<i className="bi bi-sort-numeric-up" />)
const AscAlfaIcon = () => (<i className="bi bi-sort-alpha-up" />)
const DescNumIcon = () => (<i className="bi bi-sort-numeric-down-alt" />)
const DescAlfaIcon = () => (<i className="bi bi-sort-alpha-down-alt" />)
const FilterIcon = () => (<i className="bi bi-caret-up-fill" />)


ProductListTable.propTypes = {
    products: PropTypes.array.isRequired,
    handleSort: PropTypes.func.isRequired,
    sortConfig: PropTypes.object.isRequired
};

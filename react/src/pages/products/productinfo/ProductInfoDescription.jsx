
import PropTypes from 'prop-types';
import { utils } from "../../../utils";
import { ProductSubscription } from '../../components/ProductSubscription';



export const ProductInfoDescription = ({ created_at, chartData, data }) => {

    return (

        <div className='col-lg-5 card border-0'>

            <div className="row g-3">
                <div className='col-lg-12'>
                    <div className='card card-body border-0'>
                        <img src={data.image_url} className="img-fluid" alt="product" style={{
                            height: '250px',
                            objectFit: 'contain'
                        }} />
                    </div>
                </div>

                <div className='col-lg-12'>
                    <ul className="list-group fs-6 list-group-flush">
                        <li className="list-group-item">
                            <span className='me-3'>
                                <a
                                    className='link-offset-2 link-underline link-underline-opacity-0'
                                    href={data.url}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    Locate product at Jumia
                                </a>
                            </span>
                        </li>
                        <li className="list-group-item">
                            <strong className='me-3'>Last check: </strong> {utils.FormatDate(created_at)}
                        </li>
                        <li className="list-group-item">
                            <strong className='me-3'>Price changes: </strong>
                            {chartData.map((product) => <span key={product.id}>{`Ksh ${product.current_price}, `}</span>)}
                        </li>
                        <li className="list-group-item">
                            <strong className='me-3'>Express shipping: </strong>
                            {data.express_shipping ? "Available" : "Not applicable"}
                        </li>
                        <li className="list-group-item">
                            <strong className='me-3'>Discount percent : </strong>
                            {chartData.map((product) => (
                                <span key={product.id}>{`${product.data.discount_percent} `}</span>
                            ))}
                        </li>
                        {data.ratings && <li className="list-group-item">
                            <strong className='me-3'>Ratings : </strong>
                            {data.ratings}
                        </li>}
                        {data.extra_description && <li className="list-group-item">
                            <strong className='me-3'>Description : </strong>
                            {data.extra_description}
                        </li>}
                        <li className="list-group-item">
                            <strong className='me-3'>Subscribe : </strong>
                            <ProductSubscription
                                product_id={chartData[0].jumia_product}
                                useLabel={true}
                                showLink={true}
                            />
                        </li>
                    </ul>
                </div>


            </div>
        </div>
    );
};


ProductInfoDescription.propTypes = {
    created_at: PropTypes.string.isRequired,
    chartData: PropTypes.array.isRequired,
    data: PropTypes.object.isRequired,
};

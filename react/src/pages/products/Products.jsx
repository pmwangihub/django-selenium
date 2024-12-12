import { useLocation } from 'react-router-dom';
import { wrapper } from "../wrapper/Wrapper";
import { ProductsList } from './products/ProductsList';
import { PageNavBar } from './PageNavBar';

const ProductsComponent = () => {

    let location = useLocation();
    let pageTitle = location.state.name ? location.state.name : ""
    return (
        <div className='dashboard_user'>

            <PageNavBar current={pageTitle} />
            {
                location.state.url &&
                <div className='fs-6'>
                    View this category in <a href={location.state.url}> Jumia</a>
                </div>
            }
            <ProductsList category={location.state} />
        </div>
    )
}

export const Products = wrapper(ProductsComponent);

Products.propTypes = {}
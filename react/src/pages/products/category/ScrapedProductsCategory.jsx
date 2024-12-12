

import PropTypes from 'prop-types';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { LoaderDiv } from "../../LoaderDiv";
import { ErrorDiv } from "../../ErrorDiv";
import { getJumiaProductsCategoryAction } from '../../../resource/actions/JumiaProductsCategoryAction';


export const ScrapedProductsCategory = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { jPCategoryLoader, jPCategoryError, jPCategoryData } = useSelector(
        state => state.jumiaProductsCategory
    );

    useEffect(() => {
        if (!jPCategoryData && !jPCategoryLoader) {
            dispatch(getJumiaProductsCategoryAction());
        }
    }, [])


    if (jPCategoryLoader)
        return (
            <LoaderDiv loadInfo={`Fetching scraped categories`} />
        )

    if (jPCategoryError)
        return (
            <ErrorDiv error={jPCategoryError} />
        )

    const productsInfo = (event, category) => {
        event.preventDefault();
        navigate(`/category/${category.slug}`, { state: { ...category } });
    };


    return (
        <div className="row g-4">

            {jPCategoryData &&
                jPCategoryData.map((category) => {

                    return (
                        <div className="col-lg-3 col-md-4 col-sm-6" key={category.id}>
                            <div className="card border-0">
                                <img src={category.image_url} className="card-img" alt="product" />
                                <div className='card-body bg-white p-0'>
                                    <div className='fs-6 p-2'>
                                        <a href='#'
                                            onClick={(e) => productsInfo(e, category)}
                                            className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                                            <span className='text-capitalize'>{category.name}</span>
                                        </a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}

ScrapedProductsCategory.propTypes = {
    productsNumber: PropTypes.number,
};
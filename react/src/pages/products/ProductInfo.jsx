import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Api } from '../../api';
import { LoaderDiv } from "../LoaderDiv";
import { ErrorDiv } from "../ErrorDiv";
import { wrapper } from "../wrapper/Wrapper";
import { PageNavBar } from './PageNavBar';
import { ProductInfoChart } from './productinfo/ProductInfoChart';
import { ProductInfoDescription } from './productinfo/ProductInfoDescription';
import { ProductPriceChange } from './productinfo/ProductPriceChange';




const ProductInfoComponent = () => {
    const [error, setError] = React.useState(null);
    const [Loading, setLoading] = React.useState(false);
    const [chartData, setChartData] = React.useState(null);
    let { productSLUG } = useParams();

    React.useEffect(() => {
        const fetchProductPriceChange = async () => {
            setLoading(true)
            try {
                const response = await Api.getProductEvents(productSLUG);
                setChartData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }
        fetchProductPriceChange()
        return () => { }
    }, [productSLUG])


    if (Loading)
        return (
            <LoaderDiv loadInfo={'Fetching product data'} />
        )

    if (error)
        return (
            <ErrorDiv error={error} />
        )

    let pageTitle = chartData ? chartData[0].data.product_name : ""

    return (
        <div className='dashboard_user pb-5'>
            <PageNavBar current={pageTitle} />
            <div className='row' data-masonry='{"percentPosition": true }'>
                {chartData &&
                    <>
                        <ProductInfoChart chartData={chartData} />
                        <ProductInfoDescription
                            created_at={chartData[0].created_at}
                            chartData={chartData}
                            data={chartData[0].data}
                        />
                        <ProductPriceChange chartData={chartData} />
                    </>
                }
            </div>
        </div>
    )
};

export const ProductInfo = wrapper(ProductInfoComponent)

import PropTypes from 'prop-types';
import { LineChart } from '@mui/x-charts/LineChart';

export const ProductInfoChart = ({ chartData }) => {
    const numberList = [...Array(chartData.length + 1).keys()]
    const priceList = [0, ...chartData.map((product) => product.current_price)];
    return (
        <div className='col-lg-6'>
            <div className="card border-0 fs-6">
                <div className="card-body">


                    <LineChart
                        xAxis={[{ data: numberList }]}
                        series={[
                            {
                                data: priceList,
                            },
                        ]}
                        width={500}
                        height={300}
                        grid={{ vertical: true, horizontal: true }}
                    />

                </div>
            </div>
        </div>
    );
};

ProductInfoChart.propTypes = {
    chartData: PropTypes.array.isRequired,
};

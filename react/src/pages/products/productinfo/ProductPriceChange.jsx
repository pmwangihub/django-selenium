import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { utils } from "../../../utils";

export const ProductPriceChange = React.memo(({ chartData }) => {
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const sortedData = React.useMemo(() => {
        let sortableData = [...chartData];
        if (sortConfig !== null) {
            sortableData.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableData;
    }, [chartData, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? "text-danger" : "text-primary";
    };

    return (
        <div className='col-12 my-5'>
            <div className='responsive card border-0'>
                <table className="table table-borderless table-striped fs-6">
                    <thead>
                        <tr>
                            <th
                                scope="col"
                                onClick={() => requestSort('id')}
                                className={getClassNamesFor('id')}
                                style={{ cursor: 'pointer' }}
                            >
                                Scrape ID {sortConfig.key === 'id' ?
                                    (sortConfig.direction === 'ascending' ? <AscIcon /> : <DescIcon />) : <FilterIcon />}
                            </th>
                            <th scope="col">Scraped date</th>
                            <th
                                scope="col"
                                onClick={() => requestSort('current_price')}
                                className={getClassNamesFor('current_price')}
                                style={{ cursor: 'pointer' }}
                            >
                                Price Change {sortConfig.key === 'current_price' ?
                                    (sortConfig.direction === 'ascending' ? <AscIcon /> : <DescIcon />) : <FilterIcon />}
                            </th>
                            <th scope="col">Old Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((product, index) => (
                            <tr key={product.id}>
                                <td scope="row">{`${index + 1}-${product.id}`}</td>
                                <td>{utils.PlainDate(product.created_at)}</td>
                                <td>{`Ksh. ${product.current_price}`}</td>
                                <td><s>{`Ksh. ${product.data.old_price}`}</s></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
});

const AscIcon = () => (<i className="bi bi-sort-numeric-down" />)
const DescIcon = () => (<i className="bi bi-sort-numeric-up" />)
const FilterIcon = () => (<i className="bi bi-caret-up-fill" />)


ProductPriceChange.propTypes = {
    chartData: PropTypes.array.isRequired,
};

ProductPriceChange.displayName = 'ProductPriceChange';

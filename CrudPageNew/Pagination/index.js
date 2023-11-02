import React from 'react';
import { Pagination as Paginate } from 'react-laravel-paginex'

export default function Pagination(props) {
    const options = {
        nextButtonText: 'Próxima',
        prevButtonText: 'Anterior'
    };

    return (
        <div style={{ float: 'right' }}>
            <Paginate 
                {...props}
                options={options}
            />
        </div>
    );
}
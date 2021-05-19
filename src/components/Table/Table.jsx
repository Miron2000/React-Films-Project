import React, {useState} from 'react';
import './Table.css';

//hooks
function Table(props) {

    const [sortingOrder, setSortingOrder] = useState('ASC');//'DESC' - по спаданию
    const [activeColumn, setActiveColumn] = useState(0);


    // console.log(sortingOrder, 'sortingOrder')
    const createTableColumns = (item) => {
        return props.columns.map((i) => {
            return <td key={i.acessor}>{item[i.acessor]}</td>;
        })
    }
    const createTableRows = () => {
        return sortTable(props.data, activeColumn).map((item) => {
            return <tr key={item.number}>{createTableColumns(item)}</tr>
        })
    }

    const handleClickTitle = (item) => {

        // console.log(item)
        setActiveColumn(item.acessor);
        // sortTable(props.data, 'assessment')
    }

    const sortTable = (data, field) => {
        //сортування написати тут (сортує в залежності від стейту)
        console.log(field, 'field')
        const sortType = sortingOrder === 'ASC' ? 'DESC' : 'ASC';

        // function getColumnValue(field) {
        //     data.forEach((item) => {
        //         if (field === 'number' || field === 'assessment') {
        //             return item.number;
        //         }
        //         else if (field === 'films') {
        //             return item.films;
        //         }
        //         else if(field === 'genre'){
        //             return item.genre;
        //         }
        //         else if(field === 'countries'){
        //             return item.countries;
        //         }
        //         else if (field === 'releaseDate') {
            //             const dateA = item.releaseDate.split('.').reverse().join('-');
        //             return new Date(dateA).getTime();
        //         }
        //     })
        // }

        // function quickSort(data){
        //     if(data.length < 2) return data;
        //     let pivotRow = data[0];
        //     let pivot = getColumnValue(field);
        //     const left = [];
        //     const right = [];
        //
        //     for (let i = 1; i < data.length; i++) {
        //         const columnValue = getColumnValue(field);
        //         if (pivot > columnValue) {
        //             left.push(data[i]);
        //         } else {
        //             right.push(data[i]);
        //         }
        //     }
        //     return [...quickSort(left), pivotRow, ...quickSort(right)];
        // }


        return data.sort((a, b) => a[field] > b[field] ? 1 : -1);
        // return quickSort;
    }


    // console.log(activeColumn)
    return (
        <>
            <div className="section-table indentation">
                <table className="table">
                    <thead>
                    <tr>
                        {props.columns.map((item) => <th key={item.acessor} data-type={item.data}
                                                         onClick={() => handleClickTitle(item)}>{item.title}</th>)}
                    </tr>
                    </thead>
                    <tbody>
                    {createTableRows()}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Table;
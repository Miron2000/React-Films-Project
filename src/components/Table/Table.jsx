import React from 'react';
import './Table.css';

//hooks
function Table(props) {

    const createTableColumns = (item) => {
        return props.columns.map((i) => {
            console.log(item[i.acessor])
            return <td key={i.acessor}>{item[i.acessor]}</td>;
        })
    }
    const createTableRows = () => {
        return sortTable(props.data).map((item) => {
            return <tr key={item.number}>{createTableColumns(item)}</tr>
        })
    }

    const sortTable = (data) => {
        //сортування написати тут (сортує в залежності від стейту)
        return data;

    }

    return (
        <>
            <div className="section-table indentation">
                <table className="table">
                    <thead>
                    <tr>
                        {props.columns.map((item) => <th key={item.acessor}>{item.title}</th>)}
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
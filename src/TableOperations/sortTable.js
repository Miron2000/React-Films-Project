import React from 'react';

const sortTable = (data, activeColumn, sortingOrder, columns) => {
    const arrFilms = data.concat();

    function getColumnValue(row, activeColumn) {

        const dataType = columns.find(t => t.acessor === activeColumn);

        if (dataType && dataType.data) {//при загрузці даних ще немає
            if (dataType.data === "integer" || dataType.data === "double") {
                return row[activeColumn];
            } else if (dataType.data === "text" || dataType.data === "boolean") {
                return row[activeColumn];
            } else if (dataType.data === "date") {
                const dateA = row[activeColumn].split('.').reverse().join('-');
                return new Date(dateA).getTime();
            }
        }
    }

    function quickSort(data) {
        if (data.length < 2) return data;
        let pivotRow = data[0];
        let pivot = getColumnValue(pivotRow, activeColumn);
        const left = [];
        const right = [];

        for (let i = 1; i < data.length; i++) {
            const columnValue = getColumnValue(data[i], activeColumn);
            if (pivot > columnValue) {
                left.push(data[i]);
            } else {
                right.push(data[i]);
            }
        }
        return [...quickSort(left), pivotRow, ...quickSort(right)];
    }

    const sortArrFilms = quickSort(arrFilms);

    if (sortingOrder === 'DESC') {
        sortArrFilms.reverse();
    }

    return sortArrFilms;
}

export default sortTable;
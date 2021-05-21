const sortTable = (data, activeColumnAcessor, columns, sortingOrder) => {

    if (activeColumnAcessor === -1 || data.length === 0) {
        return data;
    }

    const arrFilms = data.concat();
    const activeColumn = columns.find(t => t.acessor === activeColumnAcessor);

    if (!activeColumn || !activeColumn.data) {
        throw new Error("Sorry there are no movies");
    }

    const dataType = activeColumn.data;

    function getColumnValue(row, activeColumnAcessor) {

        switch(dataType){
            case "integer":
            case "double":
            case "text":
            case "boolean":
                return row[activeColumnAcessor];

            case "date":
                const dateA = row[activeColumnAcessor].split('.').reverse().join('-');
                return new Date(dateA).getTime();
        }
    }

    function quickSort(data) {
        if (data.length < 2) return data;
        let pivotRow = data[0];
        let pivot = getColumnValue(pivotRow, activeColumnAcessor);
        const left = [];
        const right = [];

        for (let i = 1; i < data.length; i++) {
            const columnValue = getColumnValue(data[i], activeColumnAcessor);
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
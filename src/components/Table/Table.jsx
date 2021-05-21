import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import './Table.css';
import sortTable from "../../TableOperations/sortTable";

function Table(props) {

    const [activeColumnIndex, setActiveColumnIndex] = useState(-1)
    const [sortingOrder, setSortingOrder] = useState('ASC');//'DESC' - по спаданию
    const [activeColumnAcessor, setActiveColumnAcessor] = useState(-1);

    //for search
    const [searchQuery, setSearchQuery] = useState('');
    //for search Rating
    const [searchQueryRating, setSearchQueryRating] = useState('');

    //for input ul > li
    const [isOpen, setIsOpen] = useState(true);

    const sortArr = sortTable(props.data, activeColumnAcessor, props.columns, sortingOrder);

    const createTableColumns = (item) => {
        return props.columns.map((i) => {
            return <td key={i.acessor}>{item[i.acessor]}</td>;
        })
    }
    const createTableRows = () => {
        return filteredFilms.map((item) => {
            return <tr key={item.number}>{createTableColumns(item)}</tr>
        })
    }


    const handleClickTitle = (item) => {
        setActiveColumnAcessor(item.acessor);

        const definition = activeColumnAcessor === activeColumnIndex ? -1 : activeColumnAcessor;
        setActiveColumnIndex(definition);

        const sortType = definition === -1 ? 'ASC' : 'DESC';
        setSortingOrder(sortType);
    }

    //linear search
    const filteredFilms = sortArr.filter(item => {
        const searchItem = (title) => {
            return title.toString().toLowerCase().includes(searchQuery.trim().toLowerCase());
        }

        if (searchQuery === '') {
            return true;
        }

        return props.columns.some(col => {
            return searchItem(item[col.acessor]);
        })

    });


    //BinarySearch
    const binarySearch = (arr, target) => {
        let left = 0;
        let right = arr.length - 1;
        let mid;

        if (searchQueryRating === '') {
            return -1;
        }

        while (left <= right) {
            mid = Math.round((right - left) / 2) + left;

            if (+target === arr[mid]) {
                return mid;
            } else if (+target < arr[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        return -1;
    }

    const ratingArr = sortArr.map((film) => film.assessment);
    const indexSearch = binarySearch(ratingArr, searchQueryRating);

    const drawTableBinarySearch = (indexSearch) => {
        if (indexSearch === -1) {
            return;
        }

        let outputArray = [indexSearch];
        let i = indexSearch;

        while (ratingArr.length > i + 1 && ratingArr[i] === ratingArr[i + 1]) {
            outputArray.push(i + 1);
            i++;
        }

        i = indexSearch;
        while (i - 1 >= 0 && ratingArr[i] === ratingArr[i - 1]) {
            outputArray.push(i - 1);
            i--;
        }

        return outputArray.map((elem, indexSearch) => {
            console.log(sortArr[outputArray[indexSearch]], 'BinarySearch');
            return sortArr[outputArray[indexSearch]];
        })
    }
    drawTableBinarySearch(indexSearch);


    //for input ul > li
    const itemClickHendler = (e) => {
        setSearchQuery(e.target.textContent);
        setIsOpen(false);

    }
    const inputClickHandler = () => {
        setIsOpen(true);
    }


    return (
        <>
            <div className='searchInputs'>
                <div className="searchInputs__item">

                    <input className="searchInputs__search"
                           type="search"
                           name="q"
                           placeholder="Search..."
                           value={searchQuery}
                           onChange={(event) => setSearchQuery(event.target.value)}
                           onClick={inputClickHandler}/>
                    <span className='icon__search'><FontAwesomeIcon icon={faSearch}/></span>

                    <ul className='autocomplete'>
                        {
                            searchQuery && isOpen ? filteredFilms.map((item) => {
                                return (
                                    <li className='searchInputs__item'
                                        key={item.number} onClick={itemClickHendler}>{item.films}</li>
                                )
                            }) : null
                        }
                    </ul>

                </div>
                <div className="searchInputs__item"><input className="searchInputs__search"
                                                           type="number"
                                                           name="q"
                                                           placeholder="Search by Rating"
                                                           onChange={(event) => setSearchQueryRating(event.target.value)}/>
                </div>
            </div>

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
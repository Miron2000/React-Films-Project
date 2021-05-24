import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import './Table.css';
import sortTable from "../../TableOperations/sortTable";
import {binarySearch, drawTableBinarySearch} from "../../TableOperations/binarySearch";

function Table(props) {

    const [activeColumnIndex, setActiveColumnIndex] = useState(-1)
    const [sortingOrder, setSortingOrder] = useState('');//'DESC' - по спаданию
    const [activeColumnAcessor, setActiveColumnAcessor] = useState(-1);

    //for search
    const [searchQuery, setSearchQuery] = useState('');
    //for search Rating
    const [searchQueryRating, setSearchQueryRating] = useState('');

    //for input ul > li
    const [isOpen, setIsOpen] = useState(true);


    const createTableColumns = (item) => {
        return props.columns.map((i) => {
            return <td key={i.acessor}>{item[i.acessor]}</td>;
        })
    }


    const handleClickTitle = (item) => {
        setActiveColumnAcessor(item.acessor);

        const definition = activeColumnAcessor === activeColumnIndex ? -1 : activeColumnAcessor;
        setActiveColumnIndex(definition);

        const sortType = definition === -1 ? 'ASC' : 'DESC';
        setSortingOrder(sortType);
    }

    const ratingArr = props.data.map((film) => film.assessment);
    const indexSearch = binarySearch(ratingArr, searchQueryRating);
    const arrBinarySearch = drawTableBinarySearch(indexSearch, ratingArr, props.data);

    //Search
    const filteredFilms = arrBinarySearch.filter(item => {
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

    const sortArr = sortTable(filteredFilms, activeColumnAcessor, props.columns, sortingOrder);


    //for input ul > li
    const itemClickHendler = (e) => {
        setSearchQueryRating(e.target.textContent);
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
                           onChange={(event) => setSearchQuery(event.target.value)}/>
                    <span className='icon__search'><FontAwesomeIcon icon={faSearch}/></span>


                </div>
                <div className="searchInputs__item"><input className="searchInputs__search"
                                                           type="number"
                                                           name="q"
                                                           placeholder="Search by Rating"
                                                           onChange={(event) => setSearchQueryRating(event.target.value)}
                                                           onClick={inputClickHandler}/>

                    <ul className='autocomplete'>
                        {
                            searchQueryRating && isOpen ? sortArr.map((item) => {
                                return (
                                    <li className='searchInputs__item'
                                        key={item.number} onClick={itemClickHendler}>{item.assessment}</li>
                                )
                            }) : null
                        }
                    </ul>
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
                    {sortArr?.map((item) => <tr key={item.number}>{createTableColumns(item)}</tr>)}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Table;
import React, {useEffect, useState} from 'react';
import './Table.css';
import { Form } from 'react-bootstrap';
import FilteredInputs from "./FilteredInputs";
import sortTable from "../../TableOperations/sortTable";
import {binarySearch, drawTableBinarySearch} from "../../TableOperations/binarySearch";
import {useSelector, useDispatch} from "react-redux";
import {searchFilm} from "../../store/reducers/reducers";
import {setSearchValue, setSearchValueRating} from "../../store/actions/actions";
import Tooggle from "../Common/Tooggle";


function Table(props) {

    const searchQuery = useSelector((state) => state.searchFilm.searchQuery);
    const searchQueryRating = useSelector((state) => state.searchFilm.searchQueryRating);


    const dispatch = useDispatch();
    const setSearchQuery = (value) => {
        dispatch(setSearchValue(value))
    }
    const setSearchQueryRating = (value) => {
        dispatch(setSearchValueRating(value))
    }



    const [activeColumnIndex, setActiveColumnIndex] = useState(-1)
    const [sortingOrder, setSortingOrder] = useState('');//'DESC' - по спаданию
    const [activeColumnAcessor, setActiveColumnAcessor] = useState(-1);

    const [darkMode, setDarkMode] = useState(false);

    //for search
    // const [searchQuery, setSearchQuery] = useState('');
    //for search Rating
    // const [searchQueryRating, setSearchQueryRating] = useState('');


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


    return (
        <div className={darkMode ? "dark-mode" : "light-mode"}>

            <Tooggle  setDarkMode={setDarkMode} darkMode={darkMode}/>

            <FilteredInputs searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                            searchQueryRating={searchQueryRating} setSearchQueryRating={setSearchQueryRating}
                            sortArr={sortArr}/>

            <div className="section-table indentation">
                <table style={{backgroundColor: darkMode ? '#fff' : '#fff'}} className="table">
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
        </div>
    );
}

export default Table;
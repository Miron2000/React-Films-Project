import React, {useEffect, useState} from 'react';
import './Table.css';
import {Link} from "react-router-dom";
import FilteredInputs from "./FilteredInputs";
import sortTable from "../../TableOperations/sortTable";
import {binarySearch, drawTableBinarySearch} from "../../TableOperations/binarySearch";
import {useSelector, useDispatch} from "react-redux";
import {debounce} from "lodash";
import {Films, User} from "../../store/reducers/reducers";
import {setSearchValue, setSearchValueRating} from "../../store/actions/actions";


function Table(props) {

    const user = useSelector((state) => state.User.user);
    const searchQuery = useSelector((state) => state.Films.searchQuery);
    const searchQueryRating = useSelector((state) => state.Films.searchQueryRating);

    const dispatch = useDispatch();
    // const setSearchQuery = debounce((value) => {
    //     dispatch(setSearchValue(value))
    // }, 200)
    const setSearchQuery = (value) => {
        dispatch(setSearchValue(value))
    }
    // const test = debounce(setSearchQuery, 200)
    const setSearchQueryRating = (value) => {
        dispatch(setSearchValueRating(value))
    }

    const [activeColumnIndex, setActiveColumnIndex] = useState(-1)
    const [sortingOrder, setSortingOrder] = useState('');//'DESC' - по спаданию
    const [activeColumnAcessor, setActiveColumnAcessor] = useState(-1);

    const createTableColumns = (item) => {
        const isAuthUser = user.userId && user.userId !== null;
        if (isAuthUser) {
            return props.columns.map((i) => {
                let linkItem = <Link to={`film/${item.id}`} className='link__filmId'>{item[i.acessor]}</Link>
                return <td key={i.acessor}>{linkItem}</td>;
            })
        } else {
            return props.columns.map((i) => {
                return <td key={i.acessor} className='link__filmId'>{item[i.acessor]}</td>;
            })
        }

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
        console.log(searchQuery, 'searchQuery')
        return props.columns.some(col => {
            return searchItem(item[col.acessor]);
        })

    });

    // const debounce = (fn, ms) => {
    //     let timeout;
    //     return function () {
    //         const fnCall = () => {
    //             fn.apply(this, arguments)
    //         }
    //         clearTimeout(timeout);
    //
    //         timeout = setTimeout(fnCall, ms)
    //         console.log(timeout, 'timeout');
    //     }
    // }
    // let test = debounce(setSearchQuery, 200);
    // console.log(test, 'test')

    const sortArr = sortTable(filteredFilms, activeColumnAcessor, props.columns, sortingOrder);



    return (
        <>

            <FilteredInputs searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                            searchQueryRating={searchQueryRating} setSearchQueryRating={setSearchQueryRating}
                            sortArr={sortArr}/>

            <div className="section-table indentation">
                <table className="table">
                    <thead>
                    <tr>
                        {props.columns.map((item) => <th key={item.acessor} data-type={item.data}
                                                         onClick={() => handleClickTitle(item)}>{item.title}</th>)}
                    </tr>
                    </thead>
                    <tbody>
                    {sortArr?.map((item) => <tr key={item.id}>{createTableColumns(item)}</tr>)}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Table;
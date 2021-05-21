import React, {useState} from 'react';
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
    })

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
                                                           placeholder="Search by Rating"/>
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
import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import './Table.css';
import sortTable from "../../TableOperations/sortTable";

function Table(props) {

    const [activeColumnIndex, setActiveColumnIndex] = useState(-1)
    const [sortingOrder, setSortingOrder] = useState('ASC');//'DESC' - по спаданию
    const [activeColumn, setActiveColumn] = useState(-1);

    //for search
    const [value, setValue] = useState('');
    //for input ul > li
    const [isOpen, setIsOpen] = useState(true);

    const sortArr = sortTable(props.data, activeColumn, sortingOrder, props.columns);

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
        setActiveColumn(item.acessor);

        const definition = activeColumn === activeColumnIndex ? -1 : activeColumn;
        setActiveColumnIndex(definition);

        const sortType = definition === -1 ? 'ASC' : 'DESC';
        setSortingOrder(sortType);
        // console.log(activeColumn, 'activeColumn');
        // console.log(activeColumnIndex, 'activeColumnIndex');
    }


    function search(rows) {
        const columns = rows[0] && Object.keys(rows[0]);

        return rows.filter((row) => {
            columns.some((column) => row[column].toString().toLowerCase().includes(value.trim().toLowerCase()))
        })
    }

    search(sortArr);

    const filteredFilms = sortArr.filter(item => {
        const columns = sortArr[0] && Object.values(sortArr[0])
        // console.log(sortArr[0] && Object.values(sortArr[0]))//взять значения с tr

        const searchItem = (title) => {
            return title.toString().toLowerCase().includes(value.trim().toLowerCase());
        }

        if (value === '') {
            return item
        } else {
            return searchItem(item.number) || searchItem(item.films) || searchItem(item.genre)
                || searchItem(item.releaseDate) || searchItem(item.countries) || searchItem(item.assessment) || searchItem(item.imdbFilm)
        }

    })

    //for input ul > li
    const itemClickHendler = (e) => {
        setValue(e.target.textContent);
        setIsOpen(false);

    }
    const inputClickHandler = () => {
        setIsOpen(true);
    }


    // console.log(createTableRows())
    return (
        <>
            <div className='searchInputs'>
                <div className="searchInputs__item">

                    <input className="searchInputs__search"
                           type="search"
                           name="q"
                           placeholder="Search..."
                           value={value}
                           onChange={(event) => setValue(event.target.value)}
                           onClick={inputClickHandler}/>
                    <span className='icon__search'><FontAwesomeIcon icon={faSearch}/></span>

                    <ul className='autocomplete'>
                        {
                            value && isOpen ? filteredFilms.map((item) => {
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
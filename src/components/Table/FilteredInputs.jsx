import React, {useState, useCallback} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {DebounceInput} from 'react-debounce-input';
import './Table.css';
import logo from "../../logo/logo.png";

function FilteredInputs(props) {

    const [isOpen, setIsOpen] = useState(true);

    const itemClickHandler = (e) => {
        props.setSearchQueryRating(e.target.textContent);
        setIsOpen(false);

    }
    const inputClickHandler = () => {
        setIsOpen(true);
    }

    const onChange = (event) => {
        props.setSearchQuery(event.target.value);
    }

    return (
        <>
            <div className='searchInputs'>
                <div className="searchInputs__item">

                    <input className="searchInputs__search"
                           type="search"
                           name="q"
                           placeholder="Search..."
                           value={props.searchQuery}
                           onChange={onChange}/>

                    <span className='icon__search'><FontAwesomeIcon icon={faSearch}/></span>

                    <div>Search Term: {props.searchQuery}</div>

                </div>
                <div><img className="img__table" src={logo} alt="logo"/></div>
                <div className="searchInputs__item"><input className="searchInputs__search"
                                                           type="number"
                                                           name="q"
                                                           placeholder="Search by Rating"
                                                           value={props.searchQueryRating}
                                                           onChange={(event) => props.setSearchQueryRating(event.target.value)}
                                                           onClick={inputClickHandler}/>

                    <ul className='autocomplete'>
                        {
                            props.searchQueryRating && isOpen ? props.sortArr.map((item) => {
                                return (
                                    <li className='searchInputs__item'
                                        key={item.number} onClick={itemClickHandler}>{item.assessment}</li>
                                )
                            }) : null
                        }
                    </ul>
                </div>
            </div>
        </>
    );
}

export default FilteredInputs;
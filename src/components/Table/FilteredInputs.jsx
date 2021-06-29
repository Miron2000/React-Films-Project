import React, {useState, useCallback} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import _ from "lodash";
import {debounce} from "lodash";
import {DebounceInput} from 'react-debounce-input';
import './Table.css';

function FilteredInputs(props) {

    const [isOpen, setIsOpen] = useState(true);

    const itemClickHandler = (e) => {
        props.setSearchQueryRating(e.target.textContent);
        setIsOpen(false);

    }
    const inputClickHandler = () => {
        setIsOpen(true);
    }
// const test = debounce((event) => {
//     props.setSearchQuery(event.target.value)
//     console.log(props.searchQuery, 'props.searchQuery')
// }, 500)


    // const handler = useCallback((event) => {
    //     debounce(props.setSearchQuery(event), 500);
    // }, []);

    //2 пример
    // const sendQuery = (query) => console.log(`Querying for ${query}`);
    //
    // const Search = () => {
    //     const delayedQuery = _.debounce(q => sendQuery(q), 200);
    //     const onChange = e => {
    //         props.setSearchQuery(e.target.value);
    //         delayedQuery(e.target.value);
    //     };
    //
    //     return (
    //         <div>
    //             <input className="searchInputs__search"
    //                    type="search"
    //                    name="q"
    //                    placeholder="Search..."
    //                    onChange={onChange}
    //                    value={props.searchQuery}/>
    //         </div>
    //     );
    // };

    //3 пример
    // const debounce = (func) => {
    //     let timer;
    //     return function (...args) {
    //         const context = this;
    //         if(timer) clearTimeout(timer);
    //         timer = setTimeout(() => {
    //             timer = null;
    //             func.apply(context, args);
    //         }, 500)
    //     }
    // }
    //
    // const handleChange = (event) => {
    //     props.setSearchQuery(event.target.value)
    // }
    //
    // const optimisedVersion = useCallback(debounce(handleChange), [])

    //4 пример
    // const deb = useCallback(
    //     debounce((text) => props.setSearchQuery(text), 200),
    //     []
    // );
    //
    // const handleText = (text) => {
    //     deb(text)
    // }

    //5 пример
    const debounce = (fn, wait) => {
        let timeoutId;

        return (...arg) => {
            timeoutId && clearTimeout(timeoutId)
            timeoutId = setTimeout(() => fn(...arg), wait)
        }
    }

    const debauncedSearch = useCallback(
        debounce(fn => fn(), 200),
        []
    );

    const onChange = (search) => {
        // props.setSearchQuery(search);
        debauncedSearch(() =>  props.setSearchQuery(search));
    }


    return (
        <>
            <div className='searchInputs'>
                <div className="searchInputs__item">
                    {/*<DebounceInput*/}
                    {/*    className="searchInputs__search"*/}
                    {/*    type="search"*/}
                    {/*    name="q"*/}
                    {/*    placeholder="Search..."*/}
                    {/*    value={props.searchQuery}*/}
                    {/*    minLength={1}*/}
                    {/*    debounceTimeout={200}*/}
                    {/*    onChange={event => props.setSearchQuery(event.target.value)} />*/}

                    {/*По дефолту вариант */}
                    {/*<input className="searchInputs__search"*/}
                    {/*       type="search"*/}
                    {/*       name="q"*/}
                    {/*       placeholder="Search..."*/}
                    {/*       value={props.searchQuery}*/}
                    {/*       onChange={(event) => props.setSearchQuery(event.target.value)}/>*/}


                    {/*2 вариант*/}
                    {/*{Search()}*/}

                    {/*4 вариант* или 3 в onChange -> optimisedVersion/}
                    {/*<input className="searchInputs__search"*/}
                    {/*       type="search"*/}
                    {/*       name="q"*/}
                    {/*       placeholder="Search..."*/}
                    {/*       value={props.searchQuery}*/}
                    {/*       onChange={(event) => handleText(event.target.value)}/>*/}


                    {/*5 пример*/}
                    <input className="searchInputs__search"
                           type="search"
                           name="q"
                           placeholder="Search..."
                           value={props.searchQuery}
                           onChange={(event) => onChange(event.target.value)}/>

                    <span className='icon__search'><FontAwesomeIcon icon={faSearch}/></span>

                    <div>Search Term: {props.searchQuery}</div>

                </div>
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
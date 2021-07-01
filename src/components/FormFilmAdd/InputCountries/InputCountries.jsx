import React, {useEffect, useState} from 'react';
import './InputCountries.css';
import MultiSelect from "react-multi-select-component";
import axios from 'axios';

function InputCountries(props) {
    const [countries, setCountries] = useState([]);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        const apiUrlCountries = `http://localhost:3000/api/countries`;
        axios.get(apiUrlCountries).then((response) => {
            const getCountries = response.data;
            setCountries(getCountries)
        });
    }, []);
    console.log(countries, 'countries')

    let options = countries.map((c) => {
        const label = {
            label: c.name,
            value: c.id
        }
        return label
    })


    return (
        <>
            <div>
                <pre>{JSON.stringify(selected)}</pre>
                <MultiSelect className='multi__select'
                             options={options}
                             value={selected}
                             onChange={setSelected}
                             labelledBy="Select"
                />
            </div>
        </>
    );
}

export default InputCountries;
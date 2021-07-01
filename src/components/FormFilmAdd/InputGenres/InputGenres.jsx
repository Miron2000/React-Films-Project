import React, {useEffect, useState} from 'react';
import './InputGenres.css';
import axios from 'axios';

function InputGenres(props) {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const apiUrlGenres = `http://localhost:3000/api/genres`;
        axios.get(apiUrlGenres).then((response) => {
            const getGenres = response.data;
            setGenres(getGenres)
        });
    }, []);
    console.log(genres, 'genres')

    return (
        <>
            <div>Genres</div>
        </>
    );
}

export default InputGenres;
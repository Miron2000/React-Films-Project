import React, {useEffect, useState} from 'react';
import './FilmById.css'
import axios from 'axios';

function FilmById(props) {

    const [objFilm, setObjFilm] = useState('');
    useEffect(() => {
        const apiUrlFilmById = `http://localhost:3000/api/film/${props.match.params.id}`;
        axios.get(apiUrlFilmById).then((response) => {
            const getFilm = response.data;
            setObjFilm(getFilm)
        });
    }, [setObjFilm])
    console.log(objFilm, 'filmById')

    if (!objFilm || objFilm.length === 0) return <p>there is no data.</p>
    return (
        <>
            <div className="section-table indentation">
                <h1>Film by id</h1>
                <table className='table_by_id'>
                    <tbody>
                    <tr key={objFilm.id}>
                        <td>{objFilm.id}</td>
                        <td>{objFilm.name}</td>
                        <td>{objFilm.genre}</td>
                        <td>{objFilm.releaseDate}</td>
                        <td>{objFilm.country}</td>
                        <td>{objFilm.assessment}</td>
                        <td>{objFilm.imdbFilm}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default FilmById;
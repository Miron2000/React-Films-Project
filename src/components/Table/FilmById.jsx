import React, {useEffect, useState} from 'react';
import './FilmById.css'
import axios from 'axios';

function FilmById(props) {

    const [film, setFilm] = useState('');
    useEffect(() => {
        const apiUrlFilmById = `http://localhost:3000/api/film/${props.match.params.id}`;
        axios.get(apiUrlFilmById).then((response) => {
            const getFilm = response.data;
            setFilm(getFilm)
        });
    }, [setFilm])
    console.log(film, 'filmById')

    if (!film || film.length === 0) return <p>there is no data.</p>
    return (
        <div className='film-container'>
            <div className='film-img'>
                <img key={film.id} src={film.imageFilm} alt={film.name}/>
            </div>
            <div className='film-info'>
                <div>
                    <h2 className='shadow'>{film.name}</h2>
                </div>
                <div>
                    <h3 className='film-info__text'>Genre: <span className='film-info__span'>{film.genre}</span></h3>
                    <h3 className='film-info__text'>Release date: <span className='film-info__span'>{film.releaseDate}</span></h3>
                    <h3 className='film-info__text'>Country: <span className='film-info__span'>{film.country}</span></h3>
                    <h3 className='film-info__text'>Rating: <span className='film-info__span'>{film.assessment}</span></h3>
                    <h3 className='film-info__text'>IMDB: <span className='film-info__span'>{film.imdbFilm}</span></h3>
                    <h3 className='film-info__text'>Overview: <span className='film-info__span'>{film.overview}</span></h3>
                </div>
            </div>
        </div>

    );
}

export default FilmById;
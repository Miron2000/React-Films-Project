import React from 'react';
import './FilmById.css'
import preloader from "../../preloader/Eclipse-1s-200px.gif";
import useFetch from "./CustomHook/useFetchForFilmById";

function FilmById(props) {

    const apiUrl = `http://localhost:3000/api/film/${props.match.params.id}`;
    const userFetchResponse = useFetch(apiUrl, null);
    if (!userFetchResponse.film || userFetchResponse.loading) {
        return <img className='preloader' src={preloader}/>;
    }

    const getFilmImg = (film) => {
        let imgFilm = film.imageFilm;
        if (!film.imageFilm) {
            imgFilm = `http://via.placeholder.com/600x400?text=${encodeURIComponent(film.name)}`;
        }
        const img = <img key={film.id} src={imgFilm} alt={film.name}/>
        return img
    }


    const {name, genre, releaseDate, country, assessment, imdbFilm, overview} = userFetchResponse.film;
    return (
        <div className='film-container'>
            <div className='film-img'>
                {getFilmImg(userFetchResponse.film)}
            </div>
            <div className='film-info'>
                <div>
                    <h2 className='shadow'>{name}</h2>
                </div>
                <div>
                    <h3 className='film-info__text'>Genre: <span className='film-info__span'>{genre}</span></h3>
                    <h3 className='film-info__text'>Release date: <span
                        className='film-info__span'>{releaseDate}</span></h3>
                    <h3 className='film-info__text'>Country: <span className='film-info__span'>{country}</span>
                    </h3>
                    <h3 className='film-info__text'>Rating: <span className='film-info__span'>{assessment}</span>
                    </h3>
                    <h3 className='film-info__text'>IMDB: <span className='film-info__span'>{imdbFilm}</span></h3>
                    <h3 className='film-info__text'>Overview: <span className='film-info__span'>{overview}</span>
                    </h3>
                </div>
            </div>
        </div>
    );
}

export default FilmById;
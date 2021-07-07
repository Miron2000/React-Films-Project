import React, {useEffect, useState, useCallback} from 'react';
import './FilmById.css'
import preloader from "../../preloader/Eclipse-1s-200px.gif";

function FilmById(props) {
    function useFetch(url, defaultResponse) {
        const [film, setFilm] = useState(defaultResponse);

        async function getApiUrlFilmById(url) {
            try {
                const res = await fetch(url);
                const film = await res.json();
                setFilm({isLoading: false, film})
            } catch (err) {
                console.log(err);
            }
        }
        useEffect(() => {
            getApiUrlFilmById(url);
        }, [url]);

        return film
    }

    const apiUrl = `http://localhost:3000/api/film/${props.match.params.id}`;
    const userFetchResponse = useFetch(apiUrl, {isLoading: true, film: null});
    if(!userFetchResponse.film || userFetchResponse.isLoading) {
        return <img className='preloader' src={preloader}/>;
    }
    console.log(userFetchResponse.film, 'userFetchResponse');

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
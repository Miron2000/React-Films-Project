import React, {useEffect, useState} from 'react';
import './FilmsCards.css';
import {User} from "../../store/reducers/reducers";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

function FilmsCards({film}) {
    const user = useSelector((state) => state.User.user);

    const getFilmImg = (film) => {
        const isAuthUser = user.userId && user.userId !== null;
        let imgFilm = film.imageFilm;
        if (!film.imageFilm) {
            imgFilm = `http://via.placeholder.com/600x800?text=${encodeURIComponent(film.name)}`;
        }
        const img = <img key={film.id} src={imgFilm} alt={film.name}/>

        if (isAuthUser) {
            return <Link to={`film/${film.id}`} className='link__filmId'>
                {img}
            </Link>
        }
        return img
    }


    return (
        <div className='movie'>
            {getFilmImg(film)}
            <div className="movie-info">
                <h3 className='movie-info__name'>{film.name}</h3>
                <span className='movie-info__assessment'>{film.assessment}</span>
            </div>
            <div className="movie-over">
                <h2 className='movie-info__overview'>Overview</h2>
                <p>{film.overview}</p>
            </div>
        </div>
    );
}

export default FilmsCards;
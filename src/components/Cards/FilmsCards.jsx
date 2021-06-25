import React, {useEffect, useState} from 'react';
import './FilmsCards.css';
import {User} from "../../store/reducers/reducers";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

function FilmsCards({film}) {

    const user = useSelector((state) => state.User.user);

    const onClickFilmId = (item) => {
        const isAuthUser = user.userId && user.userId !== null;

        if (isAuthUser) {
            return <Link to={`film/${item.id}`} className='link__filmId'>
                <img key={film.id} src={film.imageFilm} alt={film.name}/>
            </Link>
        } else {
            return <img key={film.id} src={film.imageFilm} alt={film.name}/>

        }
    }


    return (
        <div className='movie'>
            {/*<img key={film.id} src={film.imageFilm} alt={film.name}/>*/}
            {onClickFilmId(film)}
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
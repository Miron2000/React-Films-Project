import React, {useEffect, useState} from 'react';
import './FilmsTile.css';

function FilmsTile({film}) {


    return (
        <div className='movie'>
            <img key={film.id} src={film.imageFilm} alt={film.name}/>
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

export default FilmsTile;
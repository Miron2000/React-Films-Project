import React from 'react';
import axios from 'axios';
import '../components/Tile/FilmsTile.css'
import FilmsTile from "../components/Tile/FilmsTile";

class FilmsPageTile extends React.Component {
    state = {
        films: [],
        isLoading: false
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        })
        fetch('http://localhost:3000/api/films')
            .then(res => res.json())
            .then(films =>
                this.setState({
                        isLoading: false,
                        films: films.sort((a, b) => a['assessment'] > b['assessment'] ? 1 : -1)
                    }
                )
            )
    }


    render() {
        return (
            <div className='movie-container'>
                {this.state.films.map((film) =>  <FilmsTile key={film.id} film={film}/>)}

            </div>
        );
    }
}

export default FilmsPageTile;

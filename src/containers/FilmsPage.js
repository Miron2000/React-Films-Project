import React from 'react';
import '../components/Table/Table.css';
import Table from '../components/Table/Table';
import fetchFilms from '../data';
import preloader from '../preloader/Eclipse-1s-200px.gif';

const column = [
    {acessor: "number", title: "Number", data: "integer"},
    {acessor: "films", title: "Films", data: "text"},
    {acessor: "genre", title: "Genre", data: "text"},
    {acessor: "releaseDate", title: "Release date", data: "date"},
    {acessor: "countries", title: "Countries", data: "text"},
    {acessor: "assessment", title: "Rating", data: "double"},
    {acessor: "imdbFilm", title: "IMDB", data: "boolean"},
];

class FilmsPage extends React.Component {

    state = {
        films: [],
        isLoading: false
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        })
        fetchFilms().then((films) => {
            this.setState({
                isLoading: false,
                    films: films.sort((a, b) => a['assessment'] > b['assessment'] ? 1 : -1)
                }
            )
        });
    }

    render() {
        return (
            <>
                {this.state.isLoading ? <img className='preloader' src={preloader} /> : null}
                <Table columns={column} data={this.state.films}/>
            </>
        );
    }
}

export default FilmsPage;
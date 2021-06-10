import React from 'react';
import '../components/Table/Table.css';
import Table from '../components/Table/Table';
import preloader from '../preloader/Eclipse-1s-200px.gif';

const column = [
    {acessor: "id", title: "Number", data: "integer"},
    {acessor: "name", title: "Films", data: "text"},
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
            <>
                {this.state.isLoading ? <img className='preloader' src={preloader}/> : null}
                <Table columns={column} data={this.state.films}/>
            </>
        );
    }
}

export default FilmsPage;
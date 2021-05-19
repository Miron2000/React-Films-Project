import React from 'react';
import Table from "../components/Table/Table";
import fetchFilms from "../data";

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
        films: []
    }

    componentDidMount() {
        fetchFilms().then((films) => {
            this.setState({
                    films: films
                }
            )
        });
    }

    render() {
        return (
            <>
                <header className="header">
                    <div className="header__item"><input className="header__search inputLinerSearch" type="search"
                                                         name="q" placeholder="Search"/></div>
                    <div className="header__item"><input className="header__search inputBinarySearch" type="number"
                                                         name="q" placeholder="Search by Rating"/></div>
                </header>

                <Table columns={column} data={this.state.films}/>
            </>
        );
    }
}

export default FilmsPage;
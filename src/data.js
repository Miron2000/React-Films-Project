const data = [
    {
        number: 3,
        films: 'Babysitting',
        genre: 'Comedy',
        releaseDate: '16.04.2014',
        countries: 'France',
        assessment: 8.7,
        imdbFilm: 'No'
    },
    {
        number: 5,
        films: 'The Shawshank Redemption',
        genre: 'Drama',
        releaseDate: '10.09.1994',
        countries: 'USA',
        assessment: 9.5,
        imdbFilm: 'Yes'
    },
    {
        number: 1,
        films: 'Papillon',
        genre: 'Drama, crime',
        releaseDate: '09.09.2017',
        countries: 'USA',
        assessment: 8.9,
        imdbFilm: 'Yes',
    },
    {
        number: 2,
        films: 'The Hangover',
        genre: 'Comedy',
        releaseDate: '30.05.2009',
        countries: 'USA',
        assessment: 9.0,
        imdbFilm: 'Yes'
    },
    {
        number: 4,
        films: 'Venom',
        genre: 'Drama, crime',
        releaseDate: '01.10.2018',
        countries: 'USA',
        assessment: 7.8,
        imdbFilm: 'No'
    },
    {
        number: 6,
        films: 'The Silence of the Lambs',
        genre: 'Horror',
        releaseDate: '30.01.1991',
        countries: 'USA',
        assessment: 7.2,
        imdbFilm: 'Yes'
    },
    {
        number: 9,
        films: 'Dumb and Dumber',
        genre: 'Comedy',
        releaseDate: '16.12.1994',
        countries: 'USA',
        assessment: 5.5,
        imdbFilm: 'No'
    },
    {
        number: 7,
        films: 'WALL-E',
        genre: 'Adventures, Fiction',
        releaseDate: '23.06.2008',
        countries: 'USA',
        assessment: 8.0,
        imdbFilm: 'Yes'
    },
    {
        number: 8,
        films: '1917 (Film)',
        genre: 'Drama',
        releaseDate: '04.12.2019',
        countries: 'Great Britain, USA',
        assessment: 6.8,
        imdbFilm: 'Yes'
    },
    {
        number: 10,
        films: 'Transformers',
        genre: 'Fiction, Thriller',
        releaseDate: '12.06.2007',
        countries: 'USA',
        assessment: 8.0,
        imdbFilm: 'No'
    },
];

// const fetchFilms = () => {
//     return data;
// };
const fetchFilms = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 100);
    });
};

export default fetchFilms;

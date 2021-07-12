import React, {useEffect, useState} from 'react';

function useFetch(url, defaultResponse) {
    const [film, setFilm] = useState(defaultResponse);
    const [loading, setLoading] = useState(true);

    async function getApiUrlFilmById(url) {
        try {
            const res = await fetch(url);
            const film = await res.json();
            setFilm(film);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getApiUrlFilmById(url);
    }, [url]);

    return {film, loading}
}

export default useFetch;
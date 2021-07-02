import React, {useEffect, useState} from 'react';
import './InputGenres.css';
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';

function InputGenres(props) {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const apiUrlGenres = `http://localhost:3000/api/genres`;
        axios.get(apiUrlGenres).then((response) => {
            const getGenres = response.data;
            setGenres(getGenres)
        });
    }, []);
    // console.log(genres, 'genres')

    let options = genres.map((g) => {
        const label = {
            label: g.name,
            value: g.id
        }
        return label
    })

    return (
        <div className="input__text">
            <TextField
                className="input__genres"
                id="select"
                label="Genres"
                name="genres"
                select
                variant="outlined"
                onChange={props.onChange}>

                {genres.map((g) => (
                        <MenuItem value={g.id}>{g.name}</MenuItem>
                    )
                )}
            </TextField>
        </div>
    );
}

export default InputGenres;
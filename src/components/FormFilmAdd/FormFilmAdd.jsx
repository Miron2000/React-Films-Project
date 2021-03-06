import React, {useEffect, useState} from 'react';
import './FormFilmAdd.css';
import ReactJsAlert from "reactjs-alert";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import InputGenres from "./InputGenres/InputGenres";
import InputCountries from "./InputCountries/InputCountries";
import preloader from "../../preloader/Eclipse-1s-200px.gif";

function FormFilmAdd(props) {

    const [inputFields, setInputFields] = useState(
        {name: '', genres: [''], releaseDate: '', countries: [], assessment: '', imdbFilm: '', overview: ''}
    )
    const [isLoading, setIsLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [statusAlert, setStatusAlert] = useState(true);
    const [activeAlert, setActiveAlert] = useState();

    const handleChangeInput = (event) => {
        const values = {...inputFields};
        values[event.target.name] = event.target.value;
        setInputFields(values)
    }

    const onFieldChangeCountries = (fieldName, value) => {
        const values = {...inputFields};
        values[fieldName] = value;
        setInputFields(values);
    }

    const onFieldChangeGenres = (fieldName, event, index) => {
        const values = {...inputFields};
        const valuesGenres = [...inputFields.genres];
        valuesGenres[index] = event;
        values[fieldName] = valuesGenres;
        setInputFields(values);
    }

    const onFieldChangeName = (fieldName, event) => {
        const values = {...inputFields};
        values[fieldName] = event.target.value;
        setInputFields(values);
    }

    useEffect(() => {
        if (inputFields.countries.length > 0 && inputFields.genres.filter(genres => genres).length > 0 && inputFields.name.length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [inputFields.countries, inputFields.genres, inputFields.name])

    const addSelectGenre = () => {
        setInputFields({...inputFields, genres: [...inputFields.genres, '']})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputFields, 'inputFields');


        fetch('http://localhost:3000/api/film', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: inputFields.name,
                releaseDate: inputFields.releaseDate.length > 0 ? inputFields.releaseDate.split("-").reverse().join('.') : '-',
                assessment: inputFields.assessment.toString().length > 0 ? inputFields.assessment : '-',
                imdbFilm: inputFields.imdbFilm.length > 0 ? inputFields.imdbFilm : '-',
                country_id: inputFields.countries.map((country) => country.value),
                genre_id: inputFields.genres.filter(genres => genres),
                overview: inputFields.overview.length > 0 ? inputFields.overview : '-'
            })
        })
            .then(res => {
                res.json()
                setActiveAlert(statusAlert)
            }).catch(err => {
            console.log(err)
        })

        setInputFields({
            name: '',
            genres: [''],
            releaseDate: '',
            countries: [],
            assessment: '',
            imdbFilm: '',
            overview: ''
        });
    }

    return (
        <div className='page__add-film'>
            {activeAlert ? <ReactJsAlert
                status={statusAlert}
                type="success"
                title='The film has been successfully added'
                Close={() => setStatusAlert(false)}
            /> : null}
            {isLoading ? <img className='preloader' src={preloader}/> : null}
            <h1 className='title__add-film'>Add new Film</h1>
            <div className="container__form" style={isLoading ? {display: 'none'} : {display: ''}}>
                <form className='form__add-film' onSubmit={handleSubmit}>
                    <div className='container__add-film'>
                        <div className='fields__first'>
                            <span className='star__required-field'>*</span>
                            <TextField className="input__name"
                                       name="name"
                                       label="Film Name"
                                       value={inputFields.name}
                                       variant="outlined"
                                       onChange={(event) => onFieldChangeName('name', event)}

                            />

                            <TextField
                                className='input__text input__releaseDate'
                                type="date"
                                name="releaseDate"
                                label="Release date"
                                variant="outlined"
                                value={inputFields.releaseDate}
                                onChange={event => handleChangeInput(event)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                        <div className='fields__second'>
                            <span className='star__required-field'>*</span>
                            <InputCountries onChange={(value) => onFieldChangeCountries('countries', value)}
                                            value={inputFields.countries} isLoading={isLoading}
                                            setIsLoading={setIsLoading}/>

                            <TextField
                                className='input__text input__assessment'
                                name="assessment"
                                label="Rating"
                                type="number"
                                value={inputFields.assessment}
                                InputProps={{
                                    inputProps: {
                                        max: 10, min: 1
                                    }
                                }}
                                variant="outlined"
                                onChange={event => handleChangeInput(event)}

                            />

                            <TextField
                                className='input__text input__imdb'
                                id="select"
                                label="IMDB"
                                name="imdbFilm"
                                select
                                variant="outlined"
                                onChange={event => handleChangeInput(event)}>
                                <MenuItem value="Yes">Yes</MenuItem>
                                <MenuItem value="No">No</MenuItem>
                            </TextField>
                        </div>
                        <div className='fields__third'>
                            <TextField
                                className="input__overview"
                                name="overview"
                                rows={10}
                                label="Overview"
                                value={inputFields.overview}
                                variant="outlined"
                                onChange={event => handleChangeInput(event)}
                            />
                        </div>

                        <div className='fields__fourth'>
                            <span className='star__required-field_fields__fourth'>*</span>
                            <div>
                                {inputFields.genres.map((genre, index) => {
                                    return (
                                        <InputGenres key={index}
                                                     onChange={(event) => onFieldChangeGenres('genres', event.target.value, index)}
                                                     value={inputFields.genres}
                                                     isLoading={isLoading}
                                                     setIsLoading={setIsLoading}/>)
                                })}
                            </div>
                            <Button
                                className="btn__genres btn__indent"
                                variant="contained"
                                onClick={addSelectGenre}>Add Genre
                            </Button>
                        </div>
                    </div>

                    <Button
                        className="btn__submit"
                        variant="contained"
                        type="submit"
                        disabled={disabled}
                        endIcon={<Icon>send</Icon>}
                        onClick={handleSubmit}>Add Film
                    </Button>

                </form>
            </div>
        </div>
    );
}

export default FormFilmAdd;
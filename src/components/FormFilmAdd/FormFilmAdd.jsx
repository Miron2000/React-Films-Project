import React, {useEffect, useState} from 'react';
import './FormFilmAdd.css';
import Container from '@material-ui/core/Container';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Icon from '@material-ui/core/Icon';
import InputGenres from "./InputGenres/InputGenres";
import InputCountries from "./InputCountries/InputCountries";

function FormFilmAdd(props) {

    const [inputFields, setInputFields] = useState([
        //сюда нужно добавить country_id и genre_id
        {name: '', releaseDate: '', assessment: '', imdbFilm: ''}
    ])
    const handleChangeInput = (index, event) => {
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        setInputFields(values)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputFields, 'inputFields')
    }

    const handleAddFields = () => {
        setInputFields([...inputFields, {name: '', releaseDate: '', assessment: '', imdbFilm: ''}]);
    }

    const handleRemoveFields = (index) => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    }

    return (
        <div>
            <h1>Add new Film</h1>
            <form className='form__add-film' onSubmit={handleSubmit}>
                {inputFields.map((inputField, index) => (
                    <div key={index} className='input__add-film'>
                        <TextField className='input__text'
                                   name="name"
                                   label="Film Name"
                                   value={inputField.name}
                                   onChange={event => handleChangeInput(index, event)}

                        />

                        <div className='input__text'>
                            <InputGenres/>
                        </div>

                        <TextField className='input__text'
                                   name="releaseDate"
                                   label="Release date"
                                   value={inputField.releaseDate}
                                   onChange={event => handleChangeInput(index, event)}

                        />

                        <div className='input__text'>
                            <InputCountries/>
                        </div>

                        <TextField className='input__text'
                                   name="assessment"
                                   label="Rating"
                                   value={inputField.assessment}
                                   onChange={event => handleChangeInput(index, event)}

                        />

                        <TextField className='input__text'
                                   name="imdbFilm"
                                   label="IMDB"
                                   value={inputField.imdbFilm}
                                   onChange={event => handleChangeInput(index, event)}

                        />
                        <IconButton onClick={() => handleRemoveFields(index)}>
                            <RemoveIcon/>
                        </IconButton>
                        <IconButton onClick={() => handleAddFields()}>
                            <AddIcon/>
                        </IconButton>
                    </div>
                ))}
                <Button variant="contained" color="primary" type="submit" endIcon={<Icon>send</Icon>}
                        onClick={handleSubmit}>Send</Button>
            </form>
        </div>
    );
}

export default FormFilmAdd;
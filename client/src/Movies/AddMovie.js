import React, { useState } from 'react';
import axios from 'axios';

const AddMovie = (props) => {
    console.log(props)

    // const [state, setState] = useState(props.items)
    // console.log(state)

    const initialState = {
        title: "",
        director: "",
        metascore: "",
        stars: []
    }
    const [newMovie, setNewMovie] = useState(initialState);

    const handleChange = e => {
        e.preventDefault();
        setNewMovie({
            ...newMovie,
            [e.target.name]: e.target.value
        })
        console.log(newMovie)
    };

    // const handleChange = ev => {
    //     ev.persist();
    //     let value = ev.target.value;
    //     setNewMovie({
    //       ...newMovie,
    //       [ev.target.name]: value
    //     });
    //   };

    const handleStars = e => {
        e.preventDefault();
    setNewMovie({
        ...newMovie,
        stars: [e.target.value]
    });
    };

    const handleSumbit = (e) => {
        e.preventDefault();
        axios
        .post("http://localhost:5001/api/movies/", newMovie)
        .then(res => {
            console.log(res)
            setNewMovie(res.data);
            props.history.push('/')
        })
        .catch(err => console.log(err))
    };

    return(
        <div>
            <form className="add-movie-form" onSubmit={handleSumbit}>
                <label>Title:
                    <input 
                    type="text"
                    name="title"
                    value={newMovie.title}
                    onChange={handleChange}
                    />
                </label>
                <label>Director:
                    <input 
                    type="text"
                    name="director"
                    value={newMovie.director}
                    onChange={handleChange}
                    />
                </label>
                <label>MetaScore:
                    <input 
                    type="number"
                    name="metascore"
                    value={newMovie.metascore}
                    onChange={handleChange}
                    />
                </label>
                <label>Stars:
                    <input 
                    type="text"
                    name="actors"
                    value={newMovie.stars}
                    onChange={handleStars}
                    />
                    <button type="submit">Add Movie</button>
                </label>
            </form>
        </div>
    )
}

export default AddMovie;
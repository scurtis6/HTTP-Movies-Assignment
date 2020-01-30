import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateMovie = (props) => {
    console.log(props);
    const initialItem = {
        title: "",
        director: "",
        metascore: "",
        stars: []
    }
    const [movie, setMovie] = useState(initialItem);
    const { id } = props.match.params;

    useEffect(() => {
        axios
        .get(`http://localhost:5001/api/movies/${id}`)
        .then(res => {
            console.log(res)
            setMovie(res.data);
        })
        .catch(err => console.log(err))
    }, [id])

    const handleChange = e => {
        e.preventDefault();
        setMovie({
          ...movie,
          [e.target.name]: e.target.value
        })
        console.log(movie)
      };

    // const changeHandler = ev => {
    //     ev.persist();
    //     let value = ev.target.value;
    //     if (ev.target.name === 'price') {
    //       value = parseInt(value, 10);
    //     }
    
    //     setMovie({
    //       ...movie,
    //       [ev.target.name]: value
    //     });
    //   };
    
    const handleSumbit = (e) => {
        e.preventDefault();
        console.log(movie);
        axios
        .put(`http://localhost:5001/api/movies/${id}`, movie)
        .then(res => {
            console.log(res)
            setMovie(res.data);
            props.history.push('/')
        })
        .catch(err => console.log(err))
    }
    return (
        <div>
            <form onSubmit={handleSumbit}>
                <label htmlFor="title">Title: </label>
                    <input 
                    type="text"
                    name="title"
                    placeholder="title"
                    onChange={handleChange}
                    value={movie.title}
                    />
                <label htmlFor="director">Director: </label>
                    <input 
                    type="text"
                    name="director"
                    placeholder="director"
                    onChange={handleChange}
                    value={movie.director}
                    />
                <label>Metascore: 
                    <input 
                    type="text"
                    name="metascore"
                    placeholder="metascore"
                    onChange={handleChange}
                    value={movie.metascore}
                    />
                </label>
                <label>Stars: 
                    <input 
                    type="text"
                    name="stars"
                    placeholder="stars"
                    onChange={handleChange}
                    value={movie.stars}
                    />
                </label>
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default UpdateMovie;
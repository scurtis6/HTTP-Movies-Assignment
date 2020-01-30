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

    // const handleChange = e => {
    //     e.preventDefault();
    //     setMovie({
    //       ...movie,
    //       [e.target.name]: e.target.value
    //     })
    //     console.log(movie)
    //   };

    const handleChange = ev => {
        ev.persist();
        let value = ev.target.value;
        setMovie({
          ...movie,
          [ev.target.name]: value
        });
      };

    const handleStars = event => {
    setMovie({
        ...movie,
        stars: [event.target.value]
    });
    };
    
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
        <div className="update-movie">
            <h2>Edit Movie</h2>
            <form className="update-form" onSubmit={handleSumbit}>
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
                <label htmlFor="metascore">Metascore: </label>
                    <input 
                    type="text"
                    name="metascore"
                    placeholder="metascore"
                    onChange={handleChange}
                    value={movie.metascore}
                    />
                <label className="stars">Actors: 
                    <input 
                    type="text"
                    name="actors"
                    placeholder="actors"
                    onChange={handleStars}
                    value={movie.stars}
                    />
                </label>
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default UpdateMovie;
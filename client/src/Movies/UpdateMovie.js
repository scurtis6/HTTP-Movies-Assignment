import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const initialItem = {
    title: "",
    director: "",
    metascore: "",
    stars: ""
}

const UpdateMovie = (props) => {
    const [item, setItem] = useState(initialItem);
    console.log(props)
    return (
        <div>
            <form>
                <label htmlFor="title">Title: </label>
                    <input 
                    type="text"
                    name="title"
                    placeholder="title"
                    />
                <label htmlFor="director">Director: </label>
                    <input 
                    type="text"
                    name="director"
                    placeholder="director"
                    />
                <label htmlFor="director">Metascore: </label>
                    <input 
                    type="text"
                    name="metascore"
                    placeholder="metascore"
                    />
                <label>Metascore: 
                    <input 
                    type="text"
                    name="metascore"
                    placeholder="metascore"
                    />
                </label>
            </form>
        </div>
    )
}

export default UpdateMovie;
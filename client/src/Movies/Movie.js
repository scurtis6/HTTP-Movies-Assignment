import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

export default class Movie extends React.Component {
  constructor(props) {
    console.log(props)
    super(props);
    this.state = {
      movie: null
    };
  }

  // item = this.props.items.find(
  //   thing => `${thing.id}` === this.props.match.params.id
  // );

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5001/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  handleDelete = (e) => {
    e.preventDefault();
    axios
    .delete(`http://localhost:5001/api/movies/${this.state.movie.id}`)
    .then(res => {
      console.log(res.data);
      this.props.history.push("/")
    })
    .catch(err => console.log(err))
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <Link to={`/update-movie/${this.props.match.params.id}`}><button className="edit">Edit</button></Link>
    
        <button className="delete" onClick={this.handleDelete}>Delete</button>
      </div>
    );
  }
}
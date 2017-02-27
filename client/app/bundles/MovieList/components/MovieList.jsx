import React from 'react';
import axios from 'axios';

export default class MovieList extends React.Component {

  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  constructor(props, _railsContext) {
    super(props);
    this.getTheMovies = this.getTheMovies.bind(this);
    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = {};
  }

  componentDidMount() {
    this.getTheMovies();
  }

//this is the method that "syncs" the neighborhood object, which has all neighborhoods and dests with firebase

  getTheMovies() {
    this.title.value = '';
    this.synopsis.value = '';
    this.director.value = '';
    this.year.value = '';
    this.rating.value = '';
    axios.get('/api/posts')
      .then((res) => {
        this.setState({movies: res.data})
    })
      .catch((error) => {
        console.log(error);
    });
  }

  createMovie(e) {
    e.preventDefault();
    const newMovie = {
      title: this.title.value,
      synopsis: this.synopsis.value,
      director: this.director.value,
      year: this.year.value,
      rating: this.rating.value,
    }
    axios.post('/api/posts', {post: newMovie}).then((res) => {
      console.log(res.data);
      let movies = this.state.movies;
      movies.push(res.data)
      this.setState({movies: movies})
      this.getTheMovies();
    })
  }

  renderMovies() {
    const movies = this.state.movies;
    if (movies) {
      // const movieList = Object.keys(movies).map(key => { return movies[key]});
      console.log(movies);
      // console.log(movieList)
      return (movies.map(key => <div className='movie-container' key={key.id}><h1 className='movie-title'>{key.title}</h1><div>{key.synopsis}</div><div>director: {key.director}</div><div>year: {key.year}</div><div>scariness: {key.rating}/100</div></div>))
    }
  }

  render() {

    return (
      <div>
      <div className='form-container'>
        <form className='add-form' onSubmit={(e) => {this.createMovie(e)}}>
          <input type="hidden" name="authenticity_token" value="<%= form_authenticity_token %>" />
          <div>
          <label>title </label>
          <input
            type="text"
            name="post[title]"
            ref={(input) => {
              this.title = input;
              }
            } />
          </div>
          <div>
          <label>synopsis </label>
          <input
            type="text"
            name="post[synopsis]"
            ref={(input) => {
              this.synopsis = input;
              }
            } />
          </div>
          <div>
          <label>director </label>
          <input
            type="text"
            name="post[director]"
            ref={(input) => {
              this.director = input;
              }
            } />
          </div>
          <div>
          <label>year </label>
          <input
            type="integer"
            name="post[year]"
            ref={(input) => {
              this.year = input;
              }
            } />
          </div>
          <div>
          <label>rating (100 is scariest) </label>
          <input
            type="integer"
            name="post[rating]"
            ref={(input) => {
              this.rating = input;
              }
            } />
          </div>
          <input className='submit-button' type='submit' value='ok' />
        </form>
        </div>
        <div className='big-container'>
          {this.renderMovies()}
        </div>
      </div>
    );
  }
}

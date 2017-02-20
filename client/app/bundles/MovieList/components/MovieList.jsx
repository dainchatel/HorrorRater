import React from 'react';
import axios from 'axios';

export default class MovieList extends React.Component {

  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  constructor(props, _railsContext) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = {};
  }

  componentDidMount() {
    this.getTheMovies();
  }

//this is the method that "syncs" the neighborhood object, which has all neighborhoods and dests with firebase

  getTheMovies() {
    axios.get('/api/posts')
      .then((res) => {
        this.setState({movies: res.data})
    })
      .catch((error) => {
        console.log(error);
    });
  }

  renderMovies() {
    const movies = this.state.movies;
    if (movies) {
      // const movieList = Object.keys(movies).map(key => { return movies[key]});
      console.log(movies);
      // console.log(movieList)
      return (movies.map(key => <div key={key.title}>{key.title}<div>{key.synopsis}</div><div>{key.director}</div><div>{key.year}</div><div>{key.rating}</div></div>))
    }
  }

  render() {

    return (
      <div>
        <form method='POST' action="/api/posts">
          <input type="hidden" name="authenticity_token" value="<%= form_authenticity_token %>" />
          <input type="text" placeholder= 'title' name="post[title]" />
          <input type="text" placeholder= 'synopsis' name="post[synopsis]" />
          <input type="text" placeholder= 'director' name="post[director]" />
          <input type="integer" placeholder= 'year' name="post[year]" />
          <input type="integer" placeholder= 'rating' name="post[rating]" />
          <input type='submit' value='ok' />
        </form>
        <div>
          {this.renderMovies()}
        </div>
      </div>
    );
  }
}

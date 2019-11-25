import React from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

import MovieInfo from './MovieInfo'
import {showMovieDetails, getMoreResults} from '../redux/actions'

class SearchResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDetails: false,
      detailedMovieId: null,
    }
  }

  render() {
    //go to details page
    if (this.state.showDetails === true) {
      return <Redirect to= { '/MovieDetails/'+this.state.detailedMovieId }/>
    }
    //alert on error
    if (this.props.error.isError === true) {
      return <div class="error"> {this.props.error.message} </div>
    }
    //show loading
    if (this.props.isLoading === true) {
      const Loading = require('react-loading-animation');
      return ( <Loading /> )
    }
    //show results in table
    return (
      <div>
        <table id="moviesTable">
          <tbody>
          {this.props.moviesList.map(
            movie => (
              <MovieInfo movie={movie} key={movie.imdbID} onClick={() => this.movieClicked(movie.imdbID)}/>
            )
          )}
          </tbody>
        </table>
      </div>
    )
  }

  //set state to show details when movie is clicked
  movieClicked(imdbId) {
    //go to details screen
    this.setState({
      showDetails: true,
      detailedMovieId: imdbId,
    })
  }

  //when scroll down get more results
  //from https://stackoverflow.com/a/45586395
  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  componentDidMount() {
    document.addEventListener('scroll', this.trackScrolling);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }

  trackScrolling = () => {
    const wrappedElement = document.getElementById('moviesTable');
    //if reached bottom - get more results
    if (this.isBottom(wrappedElement)) {
      console.log('moviesTable bottom reached');
      this.props.getMoreResults(this.props.searchString, this.props.remainingResults, this.props.page)
    }
  };
}

const mapStateToProps = state => ({
    moviesList: state.moviesList.results,
    remainingResults: state.moviesList.remainingResults,
    page: state.moviesList.page,
    searchString: state.moviesList.searchString,
    isLoading: state.moviesList.isLoading,
    error: state.error,
})

const mapDispatchToProps = {
  showMovieDetails: showMovieDetails,
  getMoreResults: getMoreResults,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)

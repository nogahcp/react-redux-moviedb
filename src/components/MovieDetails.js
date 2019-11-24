import React from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

import {showMovieDetails} from '../redux/actions'

class MovieDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      backToSearch: false,
    }
    //fetch movie data
    this.props.showMovieDetails(this.props.match.params.movieId)
  }

  render() {
    if (this.state.backToSearch === true) {
      return <Redirect to= '/'/>
    }
    //alert on error
    if (this.props.error.isError === true) {
      return <h1 align="center"> {this.props.error.message} </h1>
    }
    //loading
    if (this.props.isLoading === true) {
      const Loading = require('react-loading-animation');
      return <Loading align="center"/>
    }
     return (
      <div align="center">
      <table>
        <tr>
          <td> <img src= {this.props.movieDetails.Poster} /> </td>
          <td> {Object.keys(this.props.movieDetails).map(
            property => this.showMovieInfo(property, this.props.movieDetails[property])
          )} </td>
        </tr>
      </table>
      <button onClick={() => this.goBackToSearchScreen()}> Back To Search </button>
      </div>
    )
  }

  goBackToSearchScreen() {
    this.setState({backToSearch: true,})
  }

  showMovieInfo(property, value) {
    // if no value return nothing
    if (value === 'N/A') {
      return
    }
    switch (property) {
      case 'Poster':
        return
        break;
      case 'Ratings':
        return <div>{property + ': ' + value.map(v => v.Source + ' ' + v.Value)} </div>
      default:
        return <div>{property + ': ' + value} </div>
    }
  }
}

const mapStateToProps = state => ({
    movieDetails: state.movieDetails.details,
    isLoading: state.movieDetails.isLoading,
    error: state.error,
})

const mapDispatchToProps = {
  showMovieDetails: showMovieDetails,
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails)

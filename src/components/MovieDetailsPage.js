import React from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

import {showMovieDetails} from '../redux/actions'

class MovieDetailsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      backToSearch: false,
    }
    //fetch movie data
    this.props.showMovieDetails(this.props.match.params.movieId)
  }

  render() {
    var contentHTML
    //redirect back to search
    if (this.state.backToSearch === true) {
      return <Redirect to= '/'/>
    }
    //alert on error
    if (this.props.error.isError === true) {
      contentHTML = <div class="error" align="center"> {this.props.error.message} </div>
    }
    //loading
    else if (this.props.isLoading === true) {
      const Loading = require('react-loading-animation');
      contentHTML = <Loading align="center"/>
    }
    //show details
    else {
      contentHTML = (
        <table>
          <tr style={{padding: 18}}>
            <td> <img src= {this.props.movieDetails.Poster} /> </td>
            <td> {Object.keys(this.props.movieDetails).map(
              property => this.showMovieInfo(property, this.props.movieDetails[property]))}
            </td>
          </tr>
        </table>)
    }

     return (
      <div align="center" class="padding">
      {contentHTML}
      <button onClick={() => this.goBackToSearchScreen()}> Back To Search </button>
      </div>
    )
  }

  //change state to route back to search
  goBackToSearchScreen() {
    this.setState({backToSearch: true,})
  }

  //return property as a key: value
  showMovieInfo(property, value) {
    // if no value return nothing
    if (value === 'N/A') {
      return
    }
    switch (property) {
      //poster is taken care of seperately
      case 'Poster':
      case 'Response':
        return
        break;
      case 'Ratings':
        return <div class="padding">{property + ':' + value.map(v => ' ' + v.Source + ' ' + v.Value)} </div>
      default:
        return <div class="padding">{property + ': ' + value} </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailsPage)

import React from 'react'


class MovieInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movie: this.props.movie,
    }
  }

  render() {
    // if (this.state.showDetails === true) {
    //   return <Redirect to= { '/movieDetails/:'+this.state.movie.imdbID }/>
    // }

    return (
      <tr onClick={this.props.onClick}>
        <td>
          <img src={this.state.movie.Poster} height="200"/>
        </td>
        <td>
          <h2> {this.state.movie.Title} </h2>
          <div> {this.state.movie.Year} </div>
        </td>
      </tr>
    )
  }
}

// const mapStateToProps = state => ({
// })
//
// const mapDispatchToProps = {
//   showMovieDetails: showMovieDetails,
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(MovieInfo)

export default MovieInfo

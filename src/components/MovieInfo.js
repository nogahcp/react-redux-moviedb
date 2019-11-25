import React from 'react'


class MovieInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movie: this.props.movie,
    }
  }

  render() {
    //show movie poster, title and year
    return (
      <tr onClick={this.props.onClick} class="grayHoverRow" class="grayHoverRow">
        <td>
          <img src={this.state.movie.Poster} height="200"/>
        </td>
        <td>
          <div class="movieTitle"> {this.state.movie.Title} </div>
          <div> {this.state.movie.Year} </div>
        </td>
      </tr>
    )
  }
}

export default MovieInfo

import React from 'react'
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';

import {useStyles} from './styles/cardStyle'

class MovieInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movie: this.props.movie,
    }
  }

  render() {
    return (
      <Card style={{width: "345px", margin: "8px"}}>
        <CardActionArea onClick={this.props.onClick}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {this.state.movie.Title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {this.state.movie.Year}
            </Typography>
            <CardMedia
              style={{height: "400px"}}
              image={this.state.movie.Poster}
              title="Poster"
            />
          </CardContent>

        </CardActionArea>
      </Card>
    );
  }
}

export default MovieInfo

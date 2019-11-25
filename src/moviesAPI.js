// import {recieveMovies} from './redux/actions'
// import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

//fetch data from server
const apiKey = 'b3db097d'
const searchURL = 'https://www.omdbapi.com/?s='
const detailsURL = 'https://www.omdbapi.com/?i='

//fetch movies from server using search string and page
const fetchMovies = (searchString, page) => {
  return fetch(searchURL + searchString + '&apikey=' + apiKey + '&page=' + page)
    .then(res => res.json())
      .then(
        (result) => {
          return result
        },
        (error) => {
          return error
        }
      )
}

//fetch movie details from server using movieId
const fetchMovieDetails = (movieId) => {
  console.log("fetchMovieDetails");
  return fetch(detailsURL + movieId + '&apikey=' + apiKey)
    .then(res => res.json())
      .then(
        (result) => {
          return result
        },
        (error) => {
          return error
        }
      )
}

export { fetchMovies, fetchMovieDetails }

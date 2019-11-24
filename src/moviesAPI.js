// import {recieveMovies} from './redux/actions'
// import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

//fetch data from server
const apiKey = 'b3db097d'
const searchURL = 'https://www.omdbapi.com/?s='
const detailsURL = 'https://www.omdbapi.com/?i='

const fetchMovies = (searchString, page) => {
  return fetch(searchURL + searchString + '&apikey=' + apiKey + '&page=' + page)
    .then(res => res.json())
      .then(
        (result) => {
          return result
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          return error
        }
      )
}



const fetchMovieDetails = (movieId) => {
  console.log("fetchMovieDetails");
  return fetch(detailsURL + movieId + '&apikey=' + apiKey)
    .then(res => res.json())
      .then(
        (result) => {
          return result
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          return error
        }
      )
}

export { fetchMovies, fetchMovieDetails }

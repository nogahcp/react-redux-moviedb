// action types
export const SEARCH_MOVIES = 'SEARCH_MOVIES'
export const SHOW_MOVIE_DETAILS = 'SHOW_MOVIE_DETAILS'
export const MOVIES_FETCH_SUCCEEDED = 'MOVIES_FETCH_SUCCEEDED'
export const DETAILS_FETCH_SUCCEEDED = 'DETAILS_FETCH_SUCCEEDED'
export const GET_MORE_RESULTS = 'GET_MORE_RESULTS'
export const ERROR = 'ERROR'

// action creators
export const searchMovies = searchString => ({
  type: SEARCH_MOVIES,
  payload: searchString,
})

export const getMoreResults = (searchString, remainingResults, page) => ({
  type: GET_MORE_RESULTS,
  payload: { searchString, remainingResults, page }
})

export const showMovieDetails = movieId => ({
  type: SHOW_MOVIE_DETAILS,
  payload: movieId,
})

export const moviesFetchSucceeded = moviesResults => ({
  type: MOVIES_FETCH_SUCCEEDED,
  payload: moviesResults
})

export const detailsFetchSucceeded = movieDetails => ({
  type: DETAILS_FETCH_SUCCEEDED,
  payload: movieDetails,
})

export const error = errorMessage => ({
  type: ERROR,
  payload: errorMessage,
})

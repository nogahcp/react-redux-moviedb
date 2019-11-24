import { combineReducers } from 'redux'

//import { fetchMovies, getMovieDetails } from '../moviesAPI'
import { SEARCH_MOVIES, MOVIES_FETCH_SUCCEEDED, RECEIVE_MOVIES, SHOW_MOVIE_DETAILS, DETAILS_FETCH_SUCCEEDED, GET_MORE_RESULTS, ERROR } from './actions'

const searchReducerDefaultState = {results: [], remainingResults: 0, searchString: '', isLoading: false}

const searchReducer = (state = searchReducerDefaultState, action) => {
  console.log("searchReducer " + action.type);
  switch (action.type) {
    case MOVIES_FETCH_SUCCEEDED:
      //on first page - return new results
      if (action.payload.page === 1) {
        return action.payload
      }
      //else - add results to existing
      else {
        let newState = { ...state, ...action.payload , isLoading: false}
        newState.results = [...(state.results), ...(action.payload.results)]
        return newState
      }
      break;
    case SEARCH_MOVIES:
      return { ...state, isLoading: true }
    default:
      return state
  }
}

const detailsReducer = (state = {}, action) => {
  if (action.type == DETAILS_FETCH_SUCCEEDED) {
    return { details: action.payload, isLoading: false }
  }
  return { details: {}, isLoading: true }
}

const errorReducer = (state = {isError: false}, action) => {
  if (action.type === ERROR) {
    return {isError: true, message: action.payload}
  }
  return {isError: false}
}

const reducer = combineReducers({
  moviesList: searchReducer,
  movieDetails: detailsReducer,
  error: errorReducer,
})

export default reducer




// const searchReducer = (state = [], action) => {
//   switch (action.type) {
//     case SEARCH_MOVIES:
//       const searchString = action.payload
//       //fetchMovies(searchString)
//       fetch(searchURL + searchString + '&apikey=' + apiKey)
//         .then(res => res.json())
//           .then(
//             (result) => {
//               //alert problem
//               if (result.Response == false) {
//                 const error = result.Error
//                 return []
//               }
//               //if no problem - return new moviesResults
//               else {
//                 return result.Search
//               }
//             },
//             // Note: it's important to handle errors here
//             // instead of a catch() block so that we don't swallow
//             // exceptions from actual bugs in components.
//             (error) => {
//               //// TODO: HANDLE ERROR
//             }
//           )
//     default:
//       return state
//   }
// }

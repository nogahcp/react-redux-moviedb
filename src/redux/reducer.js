import { combineReducers } from 'redux'

import { SEARCH_MOVIES, MOVIES_FETCH_SUCCEEDED, DETAILS_FETCH_SUCCEEDED, ERROR, ROUTE } from './actions'

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
    //on search change to loading
    case SEARCH_MOVIES:
      return { ...state, isLoading: true }
    default:
      return state
  }
}

const detailsReducer = (state = {}, action) => {
  //if fetch succeeded return detalse, else return loading
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

// const routeReducer = (state = {}, action) => {
//   if (action.type === ROUTE) {
//     const routeTo = action.payload
//     //// TODO: route to given url
//     console.log("rout");
//     this.props.history.push(routeTo)
//
//     return state
//   }
//   return state
// }

const reducer = combineReducers({
  moviesList: searchReducer,
  movieDetails: detailsReducer,
  error: errorReducer,
  // routeTo: routeReducer,
})



export default reducer

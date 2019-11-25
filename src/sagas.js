import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { push } from 'connected-react-router'

import {fetchMovies, fetchMovieDetails} from './moviesAPI'
import { MOVIES_FETCH_SUCCEEDED, GET_MOVIE_DETAILS, DETAILS_FETCH_SUCCEEDED, GET_MORE_RESULTS, ERROR, ROUTE } from './redux/actions'

//get movies for search
function* getMovies(action) {
   try {
      const moviesResults = yield call(fetchMovies, action.payload, 1)
      //chack if not error
      if (moviesResults.Response === 'True') {
        //calculate remaining results
        const remainingResults = moviesResults.totalResults - moviesResults.Search.length
        //start moviesFetchSucceeded action where page is 1
        yield put({type: MOVIES_FETCH_SUCCEEDED,
          payload: {
            results: moviesResults.Search, searchString: action.payload, remainingResults: remainingResults , page: 1,
        }
        });
      }
      else {
        yield put({type: ERROR, payload: moviesResults.Error});
      }
   } catch (e) {
      yield put({type: ERROR, payload: e.message});
   }
}

//get more results for prev search string
function* getMoreResults(action) {
  try {
    let remainingResults = action.payload.remainingResults
    //fetch data only if more results exist
    if (remainingResults > 0) {
      //update page number and fetch movies from moviesAPI
      const page = action.payload.page + 1
      const moviesResults = yield call(fetchMovies, action.payload.searchString, page)
      //chack if not error
      if (moviesResults.Response === 'True') {
        console.log("MOVIES_FETCH_SUCCEEDED");
        //calculate remaining results and start moviesFetchSucceeded action
        remainingResults = remainingResults - moviesResults.Search.length
        yield put({type: MOVIES_FETCH_SUCCEEDED,
          payload: {
            results: moviesResults.Search, searchString: action.payload.searchString, remainingResults: remainingResults , page: page,
        }
       });
      }
      else {
        yield put({type: ERROR, payload: moviesResults.Error});
      }
    }
  } catch (e) {
     yield put({type: ERROR, payload: e.message});
  }
}

//fetch movie details from moviesAPI
function* getMovieDetails(action) {
  try {
     const movieDetails = yield call(fetchMovieDetails, action.payload)
     if (movieDetails.Response === 'True') {
       yield put({type: DETAILS_FETCH_SUCCEEDED, payload: movieDetails});
     }
     else {
       yield put({type: ERROR, payload: movieDetails.Error});
     }
  } catch (e) {
     yield put({type: ERROR, payload: e.message});
  }
}

function* route(action) {
  console.log(action.payload);
  // yield browserHistory.push(action.payload)
}

function* mySaga() {
  yield takeLatest("SEARCH_MOVIES", getMovies);
  yield takeEvery("GET_MOVIE_DETAILS", getMovieDetails);
  yield takeEvery("GET_MORE_RESULTS", getMoreResults);
  yield takeEvery("ROUTE", route);

}

export default mySaga

import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {fetchMovies, fetchMovieDetails} from './moviesAPI'
import { MOVIES_FETCH_SUCCEEDED, SHOW_MOVIE_DETAILS, DETAILS_FETCH_SUCCEEDED, GET_MORE_RESULTS, ERROR } from './redux/actions'


function* getMovies(action) {
   try {
      const moviesResults = yield call(fetchMovies, action.payload, 1)
      //chack if not error
      yield console.log(moviesResults);
      if (moviesResults.Response === 'True') {
        const remainingResults = moviesResults.totalResults - moviesResults.Search.length
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

function* getMoreResults(action) {
  try {
    console.log("get more results");
    let remainingResults = action.payload.remainingResults
    //fetch data only if more movies exist
    if (remainingResults > 0) {
      const page = action.payload.page + 1
      const moviesResults = yield call(fetchMovies, action.payload.searchString, page)
      //chack if not error
      yield console.log(moviesResults);
      if (moviesResults.Response === 'True') {
        console.log("MOVIES_FETCH_SUCCEEDED");
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

function* getMovieDetails(action) {
  try {
     const movieDetails = yield call(fetchMovieDetails, action.payload)
     yield console.log(movieDetails)
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

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
// function* mySaga() {
//   yield takeEvery("SHOW_MOVIE_DETAILS", getMovieDetails);
// }

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* mySaga() {
  yield takeLatest("SEARCH_MOVIES", getMovies);
  yield takeEvery("SHOW_MOVIE_DETAILS", getMovieDetails);
  yield takeEvery("GET_MORE_RESULTS", getMoreResults);
}

export default mySaga

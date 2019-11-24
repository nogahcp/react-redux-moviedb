import React from 'react'
import { Provider } from 'react-redux'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import store from './redux/store'

import logo from './logo.svg'
import './App.css'
import SearchScreen from './components/SearchScreen'
import MovieDetails from './components/MovieDetails'

function App() {
  return (
    <Provider store={store} >
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SearchScreen} />
          <Route exact path="/movieDetails/:movieId" component={MovieDetails} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

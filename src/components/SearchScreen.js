import React from 'react'
import {connect} from 'react-redux'

import SearchResults from './SearchResults'
import {searchMovies} from '../redux/actions'

class SearchScreen extends React.Component {

  render() {
    const style = {
      fontSize: 30
    }
    return (
      <div align="center">
        <input type="search" onChange={this.handleInputChange} placeholder='Search Movies' style={style} text={this.props.searchString}/>
        <br />
        <SearchResults />
      </div>
    )
  }

  handleInputChange = (event) => {
    const searchString = event.target.value
    //continue to search only if at least 2 letters
    if (searchString.length >= 2 || searchString.length === 0) {
      this.props.searchMovies(searchString)
    }
  }
}

const mapStateToProps = state => ({
  searchString: state.searchString,
})

const mapDispatchToProps = {
  searchMovies: searchMovies,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)

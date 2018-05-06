import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './SearchBar.css';
import { doNewSearch, doUpdateReplace, doReplace } from '../actions/search'

class SearchBar extends Component {
  componentDidMount() {
    // if (this.input) {
    //   this.input.focus();
    // }
  }

  render() {
    const { 
      search,
      replace,
      onChangeSearch,
      onChangeReplace,
      onReplace 
    } = this.props;

    return (
      <div className={style.bar}>
        <input
          className={style.input}
          type="text"
          placeholder="Search"
          value={search}
          onChange={onChangeSearch}
          // ref={node => {
          //   this.input = node;
          // }}
        />
        <input
          className={style.input}
          type="text"
          placeholder="Replace"
          value={replace}
          onChange={onChangeReplace}
          // ref={node => {
          //   this.input = node;
          // }}
        />
        <button onClick={onReplace}>Replace</button>
      </div>
    );
  }
}

const mapStateToProps = ({ searchState }) => ({
  search: searchState.search,
  replace: searchState.replace
});

const mapDispatchToProps = dispatch => ({
  onChangeSearch: ({target}) => dispatch(doNewSearch(target.value)),
  onChangeReplace: ({target}) => dispatch(doUpdateReplace(target.value)),
  onReplace: () => dispatch(doReplace())
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

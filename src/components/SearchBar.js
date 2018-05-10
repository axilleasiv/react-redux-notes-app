import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './SearchBar.css';
import {
  doNewSearch,
  doUpdateReplace,
  doReplace,
  doToggleReplace
} from '../actions/tools';

class SearchBar extends Component {
  componentDidMount() {
    if (this.inputSearch) {
      this.inputSearch.focus();
    }
  }

  render() {
    const { 
      search,
      replace,
      replaceEnabled,
      onChangeSearch,
      onChangeReplace,
      onReplace ,
      toggleReplace,
    } = this.props;

    return (
      <div className={style.bar}>
        <input
          className={style.input}
          type="text"
          placeholder="Search"
          value={search}
          onChange={onChangeSearch}
          ref={node => {
            this.inputSearch = node;
          }}
        />
        <button>Done</button>
        <div className={style.replace}>
          <input 
            type="checkbox"
            id="replace"
            checked={replaceEnabled}
            onClick={toggleReplace} 
          />
          <label htmlFor="replace">Replace</label>
        </div>
        <div className={replaceEnabled ? style.visible : style.hidden}>
          <input
            className={style.input}
            type="text"
            placeholder="Replace"
            value={replace}
            onChange={onChangeReplace}
          />
          <button onClick={onReplace}>Replace</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ toolsState }) => ({
  search: toolsState.searchDoc.search,
  replace: toolsState.searchDoc.replace,
  replaceEnabled: toolsState.searchDoc.replaceEnabled
});

const mapDispatchToProps = dispatch => ({
  onChangeSearch: ({target}) => dispatch(doNewSearch(target.value)),
  onChangeReplace: ({target}) => dispatch(doUpdateReplace(target.value)),
  toggleReplace: () => dispatch(doToggleReplace()),
  onReplace: () => dispatch(doReplace())
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

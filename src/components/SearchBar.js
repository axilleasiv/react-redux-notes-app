import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './SearchBar.css';

class SearchBar extends Component {
  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }

  render() {
    const { value, onChange, onSubmit } = this.props;

    return (
      <div className={style.bar}>
        <form onSubmit={onSubmit}>
          <input
            className={style.input}
            type="text"
            placeholder="Search"
            value={value}
            onChange={onChange}
            ref={node => {
              this.input = node;
            }}
          />
          {/* <button type="submit">{children}</button> */}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

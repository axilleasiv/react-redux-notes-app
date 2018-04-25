import React, { Component } from 'react';
import style from './DateWidget.css';

const getDate = timestamp => {
  const date = new Date(timestamp);
  return `${date.toDateString()} at ${date.toLocaleTimeString()}`;
};

class DateWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'default'
    };

    this.showMode = this.showMode.bind(this);
  }

  showMode() {
    let { mode } = this.state;

    if (mode === 'default') {
      mode = 'createdAt';
    } else {
      if (mode === 'createdAt') {
        mode = 'editedAt';
      } else {
        mode = 'createdAt';
      }
    }

    this.setState({ mode });
  }

  render() {
    const { mode } = this.state;
    let labelDate = '';
    if (mode !== 'default') {
      labelDate = mode === 'createdAt' ? 'Created: ' : 'Edited: ';
    }

    labelDate = labelDate + getDate(this.props[mode]);

    return (
      <div onClick={this.showMode} className={`${style.date} no-select`}>
        {labelDate}
      </div>
    );
  }
}


export default DateWidget;

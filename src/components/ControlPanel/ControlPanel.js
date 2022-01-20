import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { chunksType, publicationMatchType } from '../../lib/types';

import styles from './ControlPanel.module.css';

const min = (a, b) => (a < b ? a : b);
const max = (a, b) => (a > b ? a : b);

const getFbcnlFromNumbers = (chunk, numbers) => {
  const index = numbers.indexOf(chunk);

  return [
    numbers[0],
    numbers[max(0, index - 1)],
    chunk,
    numbers[min(numbers.length - 1, index + 1)],
    numbers[numbers.length - 1],
  ];
};

const renderBack = (first, back, current) => {
  const visibility = current === String(first) ? ' invisible' : '';

  return (
    <>
      <li className={`nav-item${visibility}`}>
        <Link className={`nav-link text-light ${styles.link}`} to={`./${first}`}>
          &laquo; First
        </Link>
      </li>
      <li className={`nav-item${visibility}`}>
        <Link className={`nav-link text-light ${styles.link}`} to={`./${back}`}>
          &#8249; Back
        </Link>
      </li>
    </>
  );
};

const renderNext = (current, next, last) => {
  const visibility = current === String(last) ? ' invisible' : '';

  return (
    <>
      <li className={`nav-item${visibility}`}>
        <Link className={`nav-link text-light ${styles.link}`} to={`./${next}`}>
          Next &#8250;
        </Link>
      </li>
      <li className={`nav-item${visibility}`}>
        <Link className={`nav-link text-light ${styles.link}`} to={`./${last}`}>
          Last &raquo;
        </Link>
      </li>
    </>
  );
};

class ControlPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refIsOpen: false,
    };

    this.getLines = this.getLines.bind(this);
    this.getFbcnl = this.getFbcnl.bind(this);
    this.toggleRefOpen = this.toggleRefOpen.bind(this);
  }

  getLines() {
    const { chunks: { start, end, numbers } } = this.props;

    if (numbers) {
      return numbers;
    }

    const lines = [];
    for (let ii = start; ii <= end; ii += 1) {
      lines.push(ii);
    }

    return lines;
  }

  getFbcnl() {
    const { chunks: { start, end, numbers }, match } = this.props;
    const { params: { chunk } } = match;
    const index = Number(chunk);

    if (numbers) {
      return getFbcnlFromNumbers(chunk, numbers);
    }

    return [
      start,
      max(start, index - 1),
      chunk,
      min(end, index + 1),
      end,
    ];
  }

  toggleRefOpen() {
    this.setState(({ refIsOpen }) => ({ refIsOpen: !refIsOpen }));
  }

  render() {
    const { refIsOpen } = this.state;
    const [first, back, current, next, last] = this.getFbcnl();
    const lines = this.getLines();

    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="controlPanel">
          <ul className="navbar-nav mx-auto">
            {renderBack(first, back, current)}
            <li className="nav-item dropdown">
              <button className={`btn btn-link nav-link text-light dropdown-toggle ${styles.dropdownButton}`} type="button" aria-haspopup="true" aria-expanded={refIsOpen} onClick={this.toggleRefOpen}>
                {current}
              </button>
              <div className={`dropdown-menu ${styles.dropdownScroll} ${refIsOpen ? 'show' : ''}`}>
                {
                  lines.map((n) => (
                    <Link className="dropdown-item" key={n} to={`./${n}`} onClick={this.toggleRefOpen}>
                      {n}
                    </Link>
                  ))
                }
              </div>
            </li>
            {renderNext(current, next, last)}
          </ul>
        </div>
      </nav>
    );
  }
}

ControlPanel.propTypes = {
  chunks: chunksType.isRequired,
  match: publicationMatchType.isRequired,
};

export default ControlPanel;

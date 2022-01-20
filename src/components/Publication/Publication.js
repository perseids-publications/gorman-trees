import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { chunksType, publicationMatchType, locationType } from '../../lib/types';

import styles from './Publication.module.css';

import Header from '../Header';
import Treebank from '../Treebank';
import Markdown from '../Markdown';

const renderText = (text) => {
  if (Array.isArray(text)) {
    return (
      <div>
        {text.map((t) => (
          <span key={t}>
            {t}
            <br />
          </span>
        ))}
      </div>
    );
  }

  return text;
};

const renderRow = (title, text) => (
  <tr>
    <th scope="col">{title}</th>
    <td className={styles.publicationRow}>
      {renderText(text)}
    </td>
  </tr>
);

const renderLinkRow = (title, link) => (
  <tr>
    <th scope="col">{title}</th>
    <td>
      <a href={link}>{link}</a>
    </td>
  </tr>
);

const renderMarkdownRow = (title, markdown) => (
  <tr>
    <th scope="col">{title}</th>
    <td className={styles.publicationRow}>
      <Markdown source={markdown} />
    </td>
  </tr>
);

const renderLocusRow = (title, text, publicationPath) => (
  <tr>
    <th scope="col">{title}</th>
    <td className={styles.publicationRow}>
      {text}
      {' '}
      <Link to={`../${publicationPath}`}>
        (See all)
      </Link>
    </td>
  </tr>
);

class Publication extends Component {
  constructor(props) {
    super(props);

    this.state = { subDoc: '' };
  }

  render() {
    const {
      logo,
      link,
      publicationPath,
      author,
      work,
      editors,
      locus,
      publicationLink,
      license,
      notes,
      xml,
      chunks,
      match,
      location,
    } = this.props;

    const { subDoc } = this.state;

    return (
      <>
        <Header logo={logo} link={link}>
          <span>
            <i>{work}</i>
          </span>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
          </ul>
        </Header>
        <div className="container pt-3">
          <h2>
            <span>
              {author}
              ,
              <i>
                {' '}
                {work}
                {' '}
              </i>
              {locus}
            </span>
          </h2>
          <table className="table">
            <tbody>
              {!!author && renderRow('Author', author)}
              {!!work && renderRow('Work', work)}
              {!!locus && renderLocusRow('Locus', locus, publicationPath)}
              {!!subDoc && renderRow('Reference', subDoc)}
              {!!editors && renderRow('Editors', editors)}
              {!!publicationLink && renderLinkRow('Link', publicationLink)}
              {!!license && renderRow('License', license)}
              {!!notes && renderMarkdownRow('Notes', notes)}
            </tbody>
          </table>
          <div className={styles.treebankWrapper}>
            <Treebank
              xml={xml}
              chunks={chunks}
              location={location}
              match={match}
              setSubdoc={(s) => this.setState({ subDoc: s })}
            />
          </div>
          <div className="pt-1 pb-4 text-right">
            <a href={`${process.env.PUBLIC_URL}/xml/${xml}`} target="_blank" rel="noopener noreferrer">
              View full XML
            </a>
          </div>
        </div>
      </>
    );
  }
}

Publication.propTypes = {
  logo: PropTypes.string,
  link: PropTypes.string,
  publicationPath: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  work: PropTypes.string.isRequired,
  editors: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  locus: PropTypes.string.isRequired,
  publicationLink: PropTypes.string,
  license: PropTypes.string,
  notes: PropTypes.string,
  xml: PropTypes.string.isRequired,
  chunks: chunksType.isRequired,
  match: publicationMatchType.isRequired,
  location: locationType.isRequired,
};

Publication.defaultProps = {
  logo: undefined,
  link: undefined,
  publicationLink: undefined,
  license: undefined,
  notes: undefined,
};

export default Publication;

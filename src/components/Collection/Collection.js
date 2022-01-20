import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  arrayOf,
  bool,
  element,
  oneOfType,
  string,
} from 'prop-types';

import { publicationType } from '../../lib/types';

import styles from './Collection.module.css';

import Markdown from '../Markdown';

const getStart = (chunks) => {
  const { start, numbers } = chunks;

  if (start) {
    return start;
  }

  return numbers[0];
};

const renderSection = (section) => {
  const { locus, path, chunks } = section;
  const start = getStart(chunks);

  return (
    <Fragment key={path}>
      <Link to={`${path}/${start}`}>
        {locus}
      </Link>
      <br />
    </Fragment>
  );
};

const renderEditors = (editors) => {
  if (Array.isArray(editors)) {
    return (
      <ul className="pl-1">
        {editors.map((e) => <li key={e}>{e}</li>)}
      </ul>
    );
  }

  return editors;
};

const renderSections = (path, collapsed, sections) => {
  if (collapsed) {
    return (
      <Fragment key={path}>
        <Link to={path}>
          View
        </Link>
        <br />
      </Fragment>
    );
  }

  return sections.map((s) => renderSection(s));
};

const renderRow = (publication, expanded) => {
  const {
    path,
    author,
    work,
    editors,
    hidden,
    collapsed,
    sections,
  } = publication;

  if (hidden) {
    return false;
  }

  return (
    <tr className="d-flex" key={path}>
      <th className="col-md-3 d-none d-md-block" scope="row">{author}</th>
      <td className="col-md-4 d-none d-md-block">{work}</td>
      <td className="col-8 col-sm-7 d-block d-md-none">
        <strong>{author}</strong>
        ,
        {' '}
        <em>{work}</em>
      </td>
      <td className="col-md-3 col-lg-3 d-none d-md-block">
        {renderEditors(editors)}
      </td>
      <td className={`col-4 col-sm-5 col-md-2 col-lg-2 text-right ${styles.locus}`}>
        {renderSections(path, !expanded && collapsed, sections)}
      </td>
    </tr>
  );
};

const Collection = ({
  title, publications, text, expanded,
}) => (
  <div className={`container ${styles.collection}`}>
    <div className="row pb-3">
      <div className="col-12">
        {title && <h2>{title}</h2>}
        {text && <Markdown source={text} />}
        <table className="table">
          {publications && (
            <>
              <thead className="thead-light">
                <tr className="d-flex">
                  <th className="col-md-3 d-none d-md-block" scope="col">Author</th>
                  <th className="col-8 col-sm-7 col-md-4" scope="col">Work</th>
                  <th className="col-md-3 col-lg-3 d-none d-md-block" scope="col">Editors</th>
                  <th className="col-4 col-sm-5 col-md-2 col-lg-2" scope="col">Locus</th>
                </tr>
              </thead>
              <tbody>
                {publications.map((p) => renderRow(p, expanded))}
              </tbody>
            </>
          )}
        </table>
      </div>
    </div>
  </div>
);

Collection.propTypes = {
  title: oneOfType([string, element]).isRequired,
  publications: arrayOf(publicationType),
  text: string,
  expanded: bool,
};

Collection.defaultProps = {
  publications: undefined,
  text: undefined,
  expanded: false,
};

export default Collection;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Treebank as TB,
  Sentence,
  Text,
  Graph,
  Information,
  Xml,
  Collapse,
} from 'treebank-react';
import fetch from 'cross-fetch';

import { chunksType, publicationMatchType, locationType } from '../../lib/types';

import styles from './Treebank.module.css';
import 'treebank-react/build/index.css';

import ArethusaWrapper from '../ArethusaWrapper';
import ControlPanel from '../ControlPanel';
import TreebankStyles from '../TreebankStyles';

import { parse, linkParams } from '../../lib/params';

class Treebank extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadedXml: false,
    };

    this.additionalArgs = this.additionalArgs.bind(this);
    this.linkQuery = this.linkQuery.bind(this);
    this.renderArethusa = this.renderArethusa.bind(this);
  }

  componentDidMount() {
    const { xml } = this.props;

    if (this.isExperimental()) {
      fetch(`${process.env.PUBLIC_URL}/xml/${xml}`)
        .then((response) => response.text())
        .then((loadedXml) => {
          this.setState({ loadedXml });
        });
    } else {
      this.renderArethusa();
    }
  }

  componentDidUpdate() {
    if (!this.isExperimental()) {
      this.renderArethusa();
    }
  }

  additionalArgs() {
    const { location: { search } } = this.props;

    return parse(search);
  }

  linkQuery() {
    const { location: { search } } = this.props;

    return linkParams(search);
  }

  isExperimental() {
    return this.additionalArgs().experimental === 'true';
  }

  renderArethusa() {
    const {
      xml,
      match: { params: { chunk } },
      arethusa: { render },
    } = this.props;
    const additionalArgs = this.additionalArgs();

    render(xml, chunk, additionalArgs);
  }

  render() {
    const { chunks, match } = this.props;
    const { params: { chunk } } = match;
    const linkQuery = this.linkQuery();
    const fullQuery = this.additionalArgs();

    if (this.isExperimental()) {
      const { loadedXml } = this.state;

      if (!loadedXml) {
        return (
          <div>
            Loading...
          </div>
        );
      }

      return (
        <>
          <ControlPanel
            match={match}
            chunks={chunks}
            fullQuery={fullQuery}
            linkQuery={linkQuery}
          />
          <div className="mb-4">
            <TB treebank={loadedXml}>
              <Sentence id={chunk}>
                <div className={styles.text}>
                  <Text />
                </div>
                <div style={{ display: 'flex', minHeight: '500px', height: '60vh' }}>
                  <Graph />
                </div>
                <Information />
                <Collapse title="XML">
                  <Xml />
                </Collapse>
              </Sentence>
            </TB>
          </div>
        </>
      );
    }

    return (
      <>
        <ControlPanel
          match={match}
          chunks={chunks}
          fullQuery={fullQuery}
          linkQuery={linkQuery}
        />
        <div className="__artsa">
          <div id="treebank_container" className={styles.treebankContainer} />
        </div>
        <TreebankStyles />
      </>
    );
  }
}

Treebank.propTypes = {
  arethusa: PropTypes.instanceOf(ArethusaWrapper).isRequired,
  chunks: chunksType.isRequired,
  match: publicationMatchType.isRequired,
  location: locationType.isRequired,
  xml: PropTypes.string.isRequired,
};

export default Treebank;

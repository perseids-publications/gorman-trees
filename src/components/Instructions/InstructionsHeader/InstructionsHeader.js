import React from 'react';
import { NavLink } from 'react-router-dom';
import { string } from 'prop-types';

import { configType } from '../../../lib/types';

import Header from '../../Header';

const InstructionsHeader = ({ config: { logo, link }, title }) => (
  <Header logo={logo} link={link}>
    <span>
      {title}
    </span>
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <NavLink exact className="nav-link" to="/">
          Home
        </NavLink>
      </li>
    </ul>
  </Header>
);

InstructionsHeader.propTypes = {
  config: configType.isRequired,
  title: string.isRequired,
};

export default InstructionsHeader;

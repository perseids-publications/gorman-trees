import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import Page from './Page';
import config from './config.test.json';

it('renders the main page', () => {
  const component = (
    <MemoryRouter initialEntries={['/']}>
      <Page config={config} />
    </MemoryRouter>
  );
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders the main page with markdown in the subtitle', () => {
  const { subtitle } = config;
  config.subtitle = 'Lorem ipsum [dolor sit amet](https://www.perseids.org), consectetur adipiscing elit';

  const component = (
    <MemoryRouter initialEntries={['/']}>
      <Page config={config} />
    </MemoryRouter>
  );
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();

  config.subtitle = subtitle;
});

it('renders the footer with a doi', () => {
  config.doi = 'https://www.example.com/doi';

  const component = (
    <MemoryRouter initialEntries={['/']}>
      <Page config={config} />
    </MemoryRouter>
  );
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();

  delete config.doi;
});

it('renders a publication', () => {
  const component = (
    <MemoryRouter initialEntries={['/on-the-murder-of-eratosthenes-1-50/1']}>
      <Page config={config} />
    </MemoryRouter>
  );
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders a publication with additional arguments to Arethusa', () => {
  const component = (
    <MemoryRouter initialEntries={['/on-the-murder-of-eratosthenes-1-50/1?w=2']}>
      <Page config={config} />
    </MemoryRouter>
  );
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders a publication with a template that shows the morphology', () => {
  const component = (
    <MemoryRouter initialEntries={['/on-the-murder-of-eratosthenes-1-50/1?config=sidepanel']}>
      <Page config={config} />
    </MemoryRouter>
  );
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders a publication with markdown', () => {
  const component = (
    <MemoryRouter initialEntries={['/on-the-crown-1-50/1']}>
      <Page config={config} />
    </MemoryRouter>
  );
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders a publication with a subdoc', () => {
  const component = (
    <MemoryRouter initialEntries={['/on-the-crown-1-50/1']}>
      <Page config={config} />
    </MemoryRouter>
  );
  const renderedComponent = renderer.create(component);
  const originalArethusaApiGetSubdocFun = window.arethusaApiGetSubdocFun;

  window.arethusaApiGetSubdocFun = () => '1.1';
  window.document.body.dispatchEvent(new window.Event('ArethusaLoaded'));

  const tree = renderedComponent.toJSON();

  expect(tree).toMatchSnapshot();

  window.arethusaApiGetSubdocFun = originalArethusaApiGetSubdocFun;
});

it('renders a publication with a numbers array', () => {
  const component = (
    <MemoryRouter initialEntries={['/philippic-1-51/1']}>
      <Page config={config} />
    </MemoryRouter>
  );
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders a publication group', () => {
  const component = (
    <MemoryRouter initialEntries={['/on-the-murder-of-eratosthenes']}>
      <Page config={config} />
    </MemoryRouter>
  );
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders 404 when publication not found', () => {
  const component = (
    <MemoryRouter initialEntries={['/unknown']}>
      <Page config={config} />
    </MemoryRouter>
  );
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders 404 when publication and chunk not found', () => {
  const component = (
    <MemoryRouter initialEntries={['/unknown/1']}>
      <Page config={config} />
    </MemoryRouter>
  );
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders 404 when route does not match known route', () => {
  const component = (
    <MemoryRouter initialEntries={['/a/b/c/d']}>
      <Page config={config} />
    </MemoryRouter>
  );
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders no logo when logo set to ""', () => {
  config.logo = '';

  const component = (
    <MemoryRouter initialEntries={['/unknown/1']}>
      <Page config={config} />
    </MemoryRouter>
  );
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();

  delete config.logo;
});

it('renders a custom link', () => {
  config.link = 'https://www.google.com';

  const component = (
    <MemoryRouter initialEntries={['/unknown/1']}>
      <Page config={config} />
    </MemoryRouter>
  );
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();

  delete config.link;
});

it('renders the getting started page', () => {
  const component = (
    <MemoryRouter initialEntries={['/instructions/getting-started']}>
      <Page config={config} />
    </MemoryRouter>
  );
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders the doi page', () => {
  const component = (
    <MemoryRouter initialEntries={['/instructions/doi']}>
      <Page config={config} />
    </MemoryRouter>
  );
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders the update page', () => {
  const component = (
    <MemoryRouter initialEntries={['/instructions/updating']}>
      <Page config={config} />
    </MemoryRouter>
  );
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders 404 when no instruction route matches', () => {
  const component = (
    <MemoryRouter initialEntries={['/instructions/a/b/c']}>
      <Page config={config} />
    </MemoryRouter>
  );
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders differently when treebankReact is set', () => {
  config.treebankReact = true;

  const component = (
    <MemoryRouter initialEntries={['/on-the-murder-of-eratosthenes-1-50/1']}>
      <Page config={config} />
    </MemoryRouter>
  );
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();

  delete config.treebankReact;
});

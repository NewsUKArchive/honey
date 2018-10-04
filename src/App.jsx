import React from 'react';
import GithubRelease from './components/GithubRelease';
import GithubPreRelease from './components/GithubPreRelease'

const App = () => (
  <div className="app">
    <GithubPreRelease />
    <GithubRelease />
  </div>
);

export default App;

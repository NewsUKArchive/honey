import React from 'react';
// import GithubIssues from './components/GithubIssues';
import GithubReleases from './components/GithubReleases';

const App = () => (
  <div className="app" style={backgroundStyle}>
    <h1 style={headingStyle}>HONEY</h1>
    <GithubReleases />
  </div>
);

const headingStyle = {
  display: 'flex',
  justifyContent: 'center',
  color: "#ffa500",
  background: "#000000"
};

const backgroundStyle = {
  background: "#ffa500"
};

export default App;

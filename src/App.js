import React, { Component } from 'react';
import GithubIssues from './components/GithubIssues';

class App extends Component {
    render() {
        return (
            <div className="app">
                <GithubIssues />
            </div>
        );
    }
}

export default App;
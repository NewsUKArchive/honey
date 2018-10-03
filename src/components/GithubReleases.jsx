import {connect} from 'react-redux';
import React from 'react';
import {bindActionCreators} from 'redux';
import { fetchReleases } from '../actions/githubActions';
import LoadingComponent from './LoadingComponent';
import Markdown from 'react-remarkable';

const preReleaseData = projects => 
    Object.values(projects.totalReleases).map((repoDetails) => {
        const preRelease = Object.values(repoDetails.releases).find(release => {
            return release.isPrerelease === true
        });

        if(preRelease) {
            const header = `Upcoming release for ${repoDetails.name}`;
            return <div><h2>{repoDetails.name}</h2><Markdown key={repoDetails.name}>{preRelease.description}</Markdown></div>
        } else {
            return  <div><h2>No upcoming relases planned for {repoDetails.name}</h2></div>
        }
    })

const latestReleaseData = projects => 
    Object.values(projects.totalReleases).map((repoDetails) => {
        const latestRelease = Object.values(repoDetails.releases).find(release => {
            return release.isPrerelease === false
        });

        if(latestRelease) {
            const header = `Latest release for ${repoDetails.name}`;
            return <div><h2>{repoDetails.name}</h2><Markdown key={repoDetails.name}>{latestRelease.description}</Markdown></div>
        } else {
            return  <div><h2>No Latest relases planned for {repoDetails.name}</h2></div>
        }
})

class GithubReleases extends React.Component {
  componentWillMount() {
    this.props.fetchReleases();
  }

  render() {
    if (!this.props.projects.totalReleases) return <LoadingComponent/>;

    return(
        <div>
            <h1>Upcoming releases</h1>
            {preReleaseData(this.props.projects)}
            <h1>Latest releases</h1>
            {latestReleaseData(this.props.projects)}
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {projects: state.github};
}

function mapDispatchToProps(dispatch) {
  return {
    fetchReleases: bindActionCreators(fetchReleases, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps,)(GithubReleases);

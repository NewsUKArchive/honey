import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import { fetchReleases } from '../actions/githubActions';
import { isCollapsed } from '../actions/collapsedActions';
import Markdown from 'react-remarkable';
import { CollapsibleComponent, CollapsibleHead, CollapsibleContent } from 'react-collapsible-component';

const releaseComponent = (repoName, releaseDescription, className, collapsed) => {
    return <div className={className}>
        <div onClick={() => isCollapsed(className, !collapsed)}>
            <CollapsibleComponent>
                <CollapsibleHead>{repoName}</CollapsibleHead>
                <CollapsibleContent isExpanded={collapsed || false}>
                    <Markdown key={repoName}>{releaseDescription}</Markdown>
                </CollapsibleContent>
            </CollapsibleComponent>
        </div>
    </div>
}

const preReleaseData = projects => 
    Object.values(projects.totalReleases).map((repoDetails) => {
        const preRelease = Object.values(repoDetails.releases).find(release => release.isPrerelease === true);
        const className = `pre-${repoDetails.name}`;

        if(preRelease) {
            return releaseComponent(repoDetails.name, preRelease.description, className, projects[className]);
        } else {
            return  <div><CollapsibleHead>No upcoming relases planned for {repoDetails.name}</CollapsibleHead></div>
        }
    })

const latestReleaseData = projects => 
    Object.values(projects.totalReleases).map((repoDetails) => {
        const latestRelease = Object.values(repoDetails.releases).find(release => release.isPrerelease === false);
        const className = `latest-${repoDetails.name}`;

        if(latestRelease) {
            return releaseComponent(repoDetails.name, latestRelease.description, className, projects[className]);
        } else {
            return  <div><CollapsibleHead>No latest relase documented for {repoDetails.name}</CollapsibleHead></div>
        }
    })
    

class GithubRelease extends React.Component {
  componentWillMount() {
    this.props.fetchReleases();
  }

  render() {
    if (!this.props.projects.totalReleases) return <div/>;
    
    return(
        <div>
            <h1>Upcoming releases</h1>
            {preReleaseData(this.props.projects, this.props.isCollapsed)}
            <h1>Latest releases</h1>
            {latestReleaseData(this.props.projects, this.props.isCollapsed)}
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
      projects: state.github,
      collapsed: state.collapsed,
    };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchReleases: bindActionCreators(fetchReleases, dispatch),
    isCollapsed: bindActionCreators(isCollapsed, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps,)(GithubRelease);

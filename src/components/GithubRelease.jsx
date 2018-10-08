import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import LatestReleaseComponent from './LatestReleaseComponent';
import PreReleaseComponent from './PreReleaseComponent';
import { fetchReleases } from '../actions/githubActions';
import { isCollapsed } from '../actions/collapsedActions';
class GithubRelease extends React.Component {
  componentWillMount() {
    this.props.fetchReleases();
  }

  render() {
    if (!this.props.projects.totalReleases) return <div/>;
    
    return(
        <div>
            <h1>Upcoming releases</h1>
            {PreReleaseComponent(this.props.projects, this.props.isCollapsed)}
            <h1>Latest releases</h1>
            {LatestReleaseComponent(this.props.projects, this.props.isCollapsed)}
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

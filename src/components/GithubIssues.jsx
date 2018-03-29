import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as githubActions from '../actions/githubActions';
import TextComponent from './TextComponent';
import LoadingComponent from './LoadingComponent';

const renderData = projects =>
  projects.map(project => <TextComponent text={project.name} key={project.name} size={project.issues.totalCount} />);

class GithubIssues extends React.Component {
  componentWillMount() {
    this.props.github.fetchIssues();
  }

  render() {
    if (this.props.projects.length === 0) return <LoadingComponent/>;
    
    return (
      <div>
        {
          renderData(this.props.projects)
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    projects: state.github,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    github: bindActionCreators(githubActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GithubIssues);

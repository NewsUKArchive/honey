import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as githubActions from '../actions/githubActions';

const renderData = item => Object.keys(item).map((value) => {
  const row = `${value} has ${item[value].issueCount} thing or things`;
  return <div key={item}>{row}</div>;
});

class GithubIssues extends React.Component {
  componentWillMount() {
    this.props.github.fetchGithubIssues();
  }

  render() {
    if (!this.props.issues) {
      return (
        <div>
                    Loading Issues...
        </div>
      );
    }
    return (
      <div>
        { renderData(this.props.issues) }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    issues: state.github,
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

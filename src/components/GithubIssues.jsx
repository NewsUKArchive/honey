import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as githubActions from '../actions/githubActions';
import TextComponent from './TextComponent';

const renderData = item =>
  Object.keys(item).map(value => <TextComponent text={value} size={item[value].issueCount} key={item} />);

class GithubIssues extends React.Component {
  componentWillMount() {
    this.props.github.fetchIssues();
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
        {
          renderData(this.props.issues)
        }
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

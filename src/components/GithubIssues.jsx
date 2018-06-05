import {connect} from 'react-redux';
import React from 'react';
import {bindActionCreators} from 'redux';
import {fetchOpenIssues} from '../actions/githubActions';
import LoadingComponent from './LoadingComponent';
import BubbleChart from './BubbleChart';

const RenderData = projects => {
  const variables = projects.openIssues.map(({name, issues}) => ({key: name, label: name, v: issues.totalCount, issues: issues.edges}));
  return variables
};

class GithubIssues extends React.Component {
  componentWillMount() {
    this.props.fetchOpenIssues();
  }

  render() {
    if (!this.props.projects.openIssues) return <LoadingComponent/>;
    return (
      <div style={myStyle}>
        <BubbleChart useLabels display='flex' data={RenderData(this.props.projects)} />
      </div>
    );
  }
}

const myStyle = {
  display: 'flex',
  justifyContent: 'center',
  background: "radial-gradient(circle, white, #ffa500, #ffa500, #ffa500)"
};

function mapStateToProps(state) {
  return {projects: state.github};
}

function mapDispatchToProps(dispatch) {
  return {
    fetchOpenIssues: bindActionCreators(fetchOpenIssues, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps,)(GithubIssues);

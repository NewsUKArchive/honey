import {connect} from 'react-redux';
import React from 'react';
import {bindActionCreators} from 'redux';
import {fetchOpenIssues} from '../actions/githubActions';
import LoadingComponent from './LoadingComponent';
import RadarComponent from 'react-d3-radar';

const renderData = projects => {
  const variables = projects.openIssues.map(({name}) => ({key: name, label: name}));
  const values = projects.openIssues.reduce((result, {name, issues}) => ({
    ...result, 
    [name]: issues.totalCount
  }), {});

  return {
    variables,
    sets: [
      {
        key: 'Open Issues',
        label: 'Open Issues',
        values
      }
    ]
  };
};

class GithubIssues extends React.Component {
  componentWillMount() {
    this.props.fetchOpenIssues();
  }

  render() {
    if (!this.props.projects.openIssues) return <LoadingComponent/>;
    
    return (
      <div style={myStyle}>
        <RadarComponent
          width={600}
          height={600}
          padding={70}
          domainMax={Math.max(...this.props.projects.openIssues.map((project) => project.issues.totalCount))}
          highlighted={null}
          data={renderData(this.props.projects)}/>
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

import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as githubActions from '../actions/githubActions';
import LoadingComponent from './LoadingComponent';
import RadarComponent from 'react-d3-radar';

const renderData = projects => {
  const variables = [];
  const values = {};

  projects.openIssues.forEach(project => {
    variables.push({key: project.name, label: project.name});
    Object.assign(values, {[project.name]: project.issues.totalCount});
  });

  return {
    variables,
    sets: [
      {
        key: 'Open Issues',
        label: 'Open Issues',
        values,
      },
    ],
  };
}

class GithubIssues extends React.Component {
  componentWillMount() {
    this.props.github.fetchOpenIssues();    
  }

  render() {
    if (!this.props.projects.openIssues) return <LoadingComponent/>;
    
    var radar = <div style={myStyle}>
        <RadarComponent
          width={600}
          height={600}
          padding={70}
          domainMax={
            Math.max.apply(
              Math,this.props.projects.openIssues.map((project) => project.issues.totalCount)
            )
          }
          highlighted={null}
          data={renderData(this.props.projects)}     
        />
      </div>
    return (
      radar
    );
  }
}

const myStyle = {
  display: 'flex',
  justifyContent: 'center',
  background: "radial-gradient(circle, white, #ffa500, #ffa500, #ffa500)"
};

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

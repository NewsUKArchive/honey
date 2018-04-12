import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as githubActions from '../actions/githubActions';
import LoadingComponent from './LoadingComponent';
import RadarComponent from 'react-d3-radar';

let data = {
  variables: [],
  sets: [
    {
      key: 'Projects',
      label: 'Total Issues',
      values: {},
    },
  ],
};

const renderData = projects => {
  projects.map(project => {
    data.variables.push({key: project.name, label: project.name});
    data.sets[0].values[project.name] = project.issues.totalCount;
    return data}
  );
  console.log(data); 
  return data;   
}

class GithubIssues extends React.Component {
  componentWillMount() {
    this.props.github.fetchIssues();
  }

  render() {
    if (this.props.projects.length === 0) return <LoadingComponent/>;
  
    var radar = <div style={myStyle}>
        <RadarComponent 
        width={600}
        height={600}
        padding={70}
        domainMax={
          Math.max.apply(
            Math,this.props.projects.map(function(project) {
              return project.issues.totalCount;
            })
          )
        }
        highlighted={null}
        onHover={(point) => {
          if (point) {
            console.log('hovered over a data point');
          } else {
            console.log('not over anything');
          }
        }}
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
  justifyContent: 'center'
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

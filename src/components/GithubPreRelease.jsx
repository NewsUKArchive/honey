import {connect} from 'react-redux';
import React from 'react';
import {bindActionCreators} from 'redux';
import { fetchReleases, isCollapsed } from '../actions/githubActions';
import LoadingComponent from './LoadingComponent';
import Markdown from 'react-remarkable';
import { CollapsibleComponent, CollapsibleHead, CollapsibleContent } from 'react-collapsible-component';
 

const preReleaseData = projects => 
    Object.values(projects.totalReleases).map((repoDetails) => {
        const preRelease = Object.values(repoDetails.releases).find(release => {
            return release.isPrerelease === true
        });

        const className = `pre.${repoDetails.name}`;

        if(preRelease) {
            return <div className={className}>

                <div onClick={() => isCollapsed(className, !projects[className])}>
                    <CollapsibleComponent>
                        <CollapsibleHead>{repoDetails.name}</CollapsibleHead>
                        <CollapsibleContent isExpanded={projects[className] || false}>
                            <Markdown key={repoDetails.name}>{preRelease.description}</Markdown>
                        </CollapsibleContent>
                    </CollapsibleComponent>
                </div>
            </div>
        } else {
            return  <div><CollapsibleHead>No upcoming relases planned for {repoDetails.name}</CollapsibleHead></div>
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
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {projects: state.github};
}

function mapDispatchToProps(dispatch) {
  return {
    fetchReleases: bindActionCreators(fetchReleases, dispatch),
    isCollapsed: bindActionCreators(isCollapsed, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps,)(GithubRelease);

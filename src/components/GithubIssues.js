import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as githubActions from '../actions/githubActions';
import PropTypes from 'prop-types';
import React from 'react';
import TextComponent from './TextComponent';

const renderData = (item) => {
    return Object.keys(item).map(value => {
        return <TextComponent children={value} size={item[value].issueCount} key={item} />;
    });
}

class GithubIssues extends React.Component {
    componentWillMount() {
        this.props.github.fetchIssues();
    }

    render() {
        if (!this.props.issues){
            return (
                <div>
                    Loading Issues...
                </div>
            )
        } else {
            return (
                <div>
                    {
                      renderData(this.props.issues)
                    }
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        issues: state.github
    };
}

function mapDispatchToProps(dispatch) {
    return {
        github: bindActionCreators(githubActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GithubIssues);
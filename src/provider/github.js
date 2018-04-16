import {createApolloFetch} from 'apollo-fetch';

const uri = 'https://api.github.com/graphql';

const apolloFetch = createApolloFetch({uri});

const parseIssues = (project) => (project && project.data && project.data.repository && project.data.repository.issues)
  ? project.data.repository.issues
  : { totalCount: 0 };

apolloFetch.use(({
  options
}, next) => {
  if (!options.headers) {
    // eslint-disable-next-line no-param-reassign
    options.headers = {
      authorization: `bearer ${process.env.REACT_APP_GITHUB_KEY}`
    };
  }
  next();
});

const totalIssuesGetRequest = project => new Promise((resolve) => {
  apolloFetch({
    query: `query IssueCount($owner: String!, $repositoryName: String!) {
        repository(owner: $owner, name:$repositoryName) {
          issues() {
            totalCount
          }
        }
      }`,
    variables: {
      repositoryName: project.repository,
      owner: project.owner
    }
  }).then((response) => {
    resolve({
      name: project.name,
      repository: project.repository,
      issues: parseIssues(response),
    });
  }).catch(err => {
    console.error(`Failed to get the total issues for ${project.name}. Error: `, err);
    resolve({
      name: project.name,
      repository: project.repository,
      issues:  0,
    });
  });
});

const openIssuesGetRequest = project => new Promise((resolve) => {
  apolloFetch({
    query: `query IssueCount($owner: String!, $repositoryName: String!) {
        repository(owner: $owner, name:$repositoryName) {
          issues(states:OPEN) {
            totalCount
          }
        }
      }`,
    variables: {
      repositoryName: project.repository,
      owner: project.owner
    }
  }).then((response) => {
    resolve({
      name: project.name,
      repository: project.repository,
      issues:  parseIssues(response),
    });
  }).catch(err => {
    console.error(`Failed to get the open issues for ${project.name}. Error: `, err);
    resolve({
      name: project.name,
      repository: project.repository,
      issues:  0,
    });
  });
});

const getTotalIssueCountFor = projects => projects.map(project => totalIssuesGetRequest(project));
const getOpenIssueCountFor = projects => projects.map(project => openIssuesGetRequest(project));

export default {
  getTotalIssueCountFor,
  getOpenIssueCountFor
};

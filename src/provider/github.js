import {createApolloFetch} from 'apollo-fetch';

const uri = 'https://api.github.com/graphql';

const apolloFetch = createApolloFetch({uri});

const parseIssues = (project) => (project && project.data && project.data.repository && project.data.repository.issues)
  ? project.data.repository.issues : {totalCount: 0};

const parseReleases = (project) => (project && project.data && project.data.repository && project.data.repository.releases)
  ? project.data.repository.releases.nodes : {isPrerelease: 0};

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

const totalIssuesGetRequest = project => apolloFetch({
  query: `query IssueCount($owner: String!, $repositoryName: String!) {
        repository(owner: $owner, name: $repositoryName) {
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
  if (response.errors) 
    throw response;
  return response;
}).catch(badResponse => {
  console.error(`Failed to get the open issues for ${project.name}. Error: `, badResponse.errors);
  return badResponse;
}).then(response => ({
  name: project.name,
  repository: project.repository,
  issues: parseIssues(response),
}));

const openIssuesGetRequest = project => apolloFetch({
  query: `query IssueCount($owner: String!, $repositoryName: String!) {
        repository(owner: $owner, name: $repositoryName) {
          issues(states: OPEN) {
            totalCount
          }
        }
      }`,
  variables: {
    repositoryName: project.repository,
    owner: project.owner
  }
}).then((response) => {
  if (response.errors) 
    throw response;
  return response;
}).catch(badResponse => {
  console.error(`Failed to get the open issues for ${project.name}. Error: `, badResponse.errors);
  return badResponse;
}).then(response => ({
  name: project.name,
  repository: project.repository,
  issues: parseIssues(response),
}));

const latestPreReleaseGetRequest = project => apolloFetch({
  query: `query ($owner: String!, $repositoryName: String!) {
    repository(owner: $owner, name: $repositoryName) {
      releases(last: 4) {
        nodes() {
          isPrerelease
          description
        }
      }
    }
  }`,
  variables: {
    repositoryName: project.repository,
    owner: project.owner
  }
}).then((response) => {
  if (response.errors)
    throw response;
  return response;
}).catch(badResponse => {
  console.error(`Failed to get the open issues for ${project.name}. Error: `, badResponse.errors);
  return badResponse;
}).then(response => ({
  name: project.name,
  repository: project.repository,
  releases: parseReleases(response),
}));

const getTotalIssueCountFor = projects => projects.map(project => totalIssuesGetRequest(project));
const getOpenIssueCountFor = projects => projects.map(project => openIssuesGetRequest(project));
const getLatestPreReleaseCountFor = projects => projects.map(project => latestPreReleaseGetRequest(project));

export default {
  getTotalIssueCountFor,
  getOpenIssueCountFor,
  getLatestPreReleaseCountFor
};

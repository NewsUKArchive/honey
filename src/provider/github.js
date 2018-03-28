import { createApolloFetch } from 'apollo-fetch';

const uri = 'https://api.github.com/graphql';

const apolloFetch = createApolloFetch({ uri });

apolloFetch.use(({ options }, next) => {
  if (!options.headers) {
    // eslint-disable-next-line no-param-reassign
    options.headers = {
      authorization: `bearer ${process.env.REACT_APP_GITHUB_KEY}`,
    };
  }
  next();
});

const getRequest = project =>
  new Promise((resolve) => {
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
        owner: project.owner,
      },
    })
      .then((response) => {
        resolve({ name: project.repository, issues: response.data.repository.issues });
      })
      .catch(err => resolve(err));
  });

const getIssueCountForProjects = projects =>
  Object.values(projects).map(project => (getRequest(project)));

export default getIssueCountForProjects;

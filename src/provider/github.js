import { createApolloFetch } from 'apollo-fetch';

const uri = 'https://api.github.com/graphql';

const apolloFetch = createApolloFetch({ uri });

apolloFetch.use(({request, options }, next) => {
  if (!options.headers) {
    options.headers = {
      authorization: 'bearer ebfe12b0eb6a2bffd50a1bcc24309ba2b48dbaf7',
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
        resolve({ project: project.repository, issues: response.data.repository.issues });
      })
      .catch(err => resolve(err));
  });


const getIssueCountForProjects = (projects) => {
  const graphqlRequests = [];
  Object.values(projects).forEach(project => graphqlRequests.push(getRequest(project)));
  return graphqlRequests;
}

export default getIssueCountForProjects;

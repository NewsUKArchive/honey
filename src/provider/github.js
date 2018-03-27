import { createApolloFetch } from 'apollo-fetch';

const uri = 'https://api.github.com/graphql';

const apolloFetch = createApolloFetch({ uri });

apolloFetch.use(({ request, options }, next) => {
  if (!options.headers) {
    options.headers = {
      authorization: 'bearer ebfe12b0eb6a2bffd50a1bcc24309ba2b48dbaf7',
    };
  }
  next();
});


const getIssueCountForProjects = projects =>
  new Promise((resolve, reject) => {
    const issueObject = Object.values(projects).reduce((accum, repoToSearch) => {
      const owner = repoToSearch.split('/')[0];
      const repo = repoToSearch.split('/')[1];

      apolloFetch({
        query: `query IssueCount($owner: String!, $repositoryName: String!) {
          repository(owner: $owner, name:$repositoryName) {
            issues() {
              totalCount
            }
          }
        }`,
        variables: {
          repositoryName: repo,
          owner,
        },
      })
        .then((response) => {
          const { repository } = response.data;
          accum[repo] = repository;
        })
        .catch(err => reject(err));
      return accum;
    }, {});
    resolve(issueObject);
  });


export default getIssueCountForProjects;

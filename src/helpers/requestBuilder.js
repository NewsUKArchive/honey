import axios from 'axios';

const buildIssueRequest = (project, repository) => new Promise((resolve) => {
  axios
    .get(`https://api.github.com/repos/${repository}/issues?state=all`)
    .then((result) => {
      resolve({ project, issues: result.data });
    })
    .catch(() => {
      resolve({ project, issues: [] });
    });
});

const buildIssueRequests = (repositories) => {
  const requests = [];

  Object
    .keys(repositories)
    .forEach(key => requests.push(buildIssueRequest(key, repositories[key])));

  return requests;
};

export default {
  buildIssueRequest,
  buildIssueRequests,
};

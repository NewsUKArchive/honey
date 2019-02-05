# Honey 🍯

### Brought to you by The Times Tooling team  🛠

### Concept
Honey aims to display Github releases for multiple projects on a single dashboard.

Provide intelligence to all stakeholders with the transparency they need to determine a project’s overall health at every stage

Encourage project leaders to view different applications and services in their full context. 
You can view what is being released, what is being worked on and make sure that what has been released has passed particular checkpoints.

## Configuration
To display different projects on the dashboard update `config/repositories` json file.

The structure of a config entry consists of the following:

```
"times-components": { // Friendly name to display on the dashboard.
    "owner": "newsuk", // Repository owner.
    "repository": "times-components" // Repository name.
}
```

## Getting Started
1. Run `yarn` to install dependencies.
2. Export the following environment variable `REACT_APP_GITHUB_KEY` containing your Github authentication key.
3. Run `yarn start` to start the dashboard application.

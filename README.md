# Honey
Honey aims to display Github issues for multiple projects on a single dashboard.

## Configuration
To display more / different projects on the dashboard you can update the `config/repositories` json file.

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
]# Honey
Honey aims to display Github releases for multiple projects on a single dashboard.

<img width="1153" alt="screen shot 2018-10-08 at 10 45 30" src="https://user-images.githubusercontent.com/12137814/46602374-e56a3880-cae7-11e8-9d2f-e5289cbfc0b8.png">


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

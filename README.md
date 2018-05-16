# Honey
Honey aims to display Github issues for multiple projects on a single dashboard.

![image](https://user-images.githubusercontent.com/23698167/40119286-2d7b44de-5914-11e8-8b03-8b01a0853dbd.png)

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

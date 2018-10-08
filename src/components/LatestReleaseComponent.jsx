import React from 'react';
import { CollapsibleHead } from 'react-collapsible-component';
import ReleaseComponent from './ReleaseComponent';

const LatestReleaseComponent = projects => 
    Object.values(projects.totalReleases).map((repoDetails) => {
        const latestRelease = Object.values(repoDetails.releases).find(release => release.isPrerelease === false);
        const className = `latest-${repoDetails.name}`;

        if(latestRelease) {
            return ReleaseComponent(repoDetails.name, latestRelease.description, className, projects[className]);
        } else {
            return  <div><CollapsibleHead>No latest relase documented for {repoDetails.name}</CollapsibleHead></div>
        }
    })
    

export default LatestReleaseComponent;

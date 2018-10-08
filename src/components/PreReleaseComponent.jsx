import React from 'react';
import { CollapsibleHead } from 'react-collapsible-component';
import ReleaseComponent from './ReleaseComponent';

const PreReleaseComponent = projects => 
    Object.values(projects.totalReleases).map((repoDetails) => {
        const preRelease = Object.values(repoDetails.releases).find(release => release.isPrerelease === true);
        const className = `pre-${repoDetails.name}`;

        if(preRelease) {
            return ReleaseComponent(repoDetails.name, preRelease.description, className, projects[className]);
        } else {
            return  <div><CollapsibleHead>No upcoming relases planned for {repoDetails.name}</CollapsibleHead></div>
        }
    })

export default PreReleaseComponent;

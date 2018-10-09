import React from 'react';
import Markdown from 'react-remarkable';
import { CollapsibleComponent, CollapsibleHead, CollapsibleContent } from 'react-collapsible-component';
import { isCollapsed } from '../actions/collapsedActions';

const ReleaseComponent = (repoName, releaseDescription, className, collapsed) => {
    return <div className={className}>
        <div onClick={() => isCollapsed(className, !collapsed)}>
            <CollapsibleComponent>
                <CollapsibleHead>{repoName}</CollapsibleHead>
                <CollapsibleContent isExpanded={collapsed || false}>
                    <Markdown key={repoName}>{releaseDescription}</Markdown>
                </CollapsibleContent>
            </CollapsibleComponent>
        </div>
    </div>
}

export default ReleaseComponent;

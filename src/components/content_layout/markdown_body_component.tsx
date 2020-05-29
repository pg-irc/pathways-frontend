import React from 'react';
import { MarkdownComponent } from '../markdown/markdown_component';
import { ExpandableContentComponent } from '../expandable_content/expandable_content_component';

interface Props {
    readonly body: string;
    readonly shouldBeExpandable: boolean;
    readonly topicId?: string;
    readonly onExpand?: () => void;
    readonly onCollapse?: () => void;
}

export const MarkdownBodyComponent = (props: Props): JSX.Element => {
    const body = (
        <MarkdownComponent
            showLinkAlerts={false}
            hideLinkeAlerts={(): void => console.log('Todo set up markdown body component')}>
            {props.body}
        </MarkdownComponent>
    );
    if (props.shouldBeExpandable) {
        return (
            <ExpandableContentComponent
                content={body}
                contentId={props.topicId}
                onExpand={props.onExpand}
                onCollapse={props.onCollapse}
            />
        );
    }
    return body;
};
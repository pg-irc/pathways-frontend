import React from 'react';
import { MarkdownComponent } from '../markdown/markdown_component';
import { ExpandableContentComponent } from '../expandable_content/expandable_content_component';
import { ExpandDetailAction } from '../../stores/topics';

interface Props {
    readonly body: string;
    readonly shouldBeExpandable: boolean;
    readonly topicId?: string;
    readonly expandDetail?: () => ExpandDetailAction;
}

export const MarkdownBodyComponent = (props: Props): JSX.Element => {
    const body = (
        <MarkdownComponent>
            {props.body}
        </MarkdownComponent>
    );
    const contentId = 'Topic id: ' + props.topicId;
    if (props.shouldBeExpandable) {
        return (
            <ExpandableContentComponent
                content={body}
                contentId={contentId}
                expandDetail={props.expandDetail}
            />
        );
    }
    return body;
};
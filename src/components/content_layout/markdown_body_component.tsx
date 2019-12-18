import React from 'react';
import { MarkdownComponent } from '../markdown/markdown_component';
import { ExpandableContentComponent } from '../expandable_content/expandable_content_component';
import { ExpandDetailAction, CollapseDetailAction } from '../../stores/topics';

interface Props {
    readonly body: string;
    readonly shouldBeExpandable: boolean;
    readonly topicId?: string;
    readonly expandDetail?: () => ExpandDetailAction;
    readonly collapseDeail?: () => CollapseDetailAction;
}

export const MarkdownBodyComponent = (props: Props): JSX.Element => {
    const body = (
        <MarkdownComponent>
            {props.body}
        </MarkdownComponent>
    );
    if (props.shouldBeExpandable) {
        return (
            <ExpandableContentComponent
                content={body}
                contentId={props.topicId}
                expandDetail={props.expandDetail}
                collapseDeail={props.collapseDeail}
            />
        );
    }
    return body;
};
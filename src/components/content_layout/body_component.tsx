import React from 'react';
import { MarkdownComponent } from '../markdown/markdown_component';
import { ExpandableContentComponent } from '../expandable_content/expandable_content_component';

interface Props {
    readonly body: string;
    readonly shouldBeExpandable: boolean;
}

export const BodyComponent = (props: Props): JSX.Element => {
    const body = (
        <MarkdownComponent>
            {props.body}
        </MarkdownComponent>
    );
    if (props.shouldBeExpandable) {
        return (
            <ExpandableContentComponent
                content={body}
            />
        );
    }
    return body;
};
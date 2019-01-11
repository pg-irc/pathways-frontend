import React from 'react';
import { Button, Icon } from 'native-base';
import { AddToSavedListAction, RemoveFromSavedListAction } from '../../stores/tasks';
import { values } from '../../application/styles';

export interface BookmarkButtonProps {
    readonly isBookmarked: boolean;
    readonly textColor: string;
}

export interface BookmarkButtonActions {
    readonly addBookmark: () => AddToSavedListAction;
    readonly removeBookmark: () => RemoveFromSavedListAction;
}

type Props = BookmarkButtonProps & BookmarkButtonActions;

export const BookmarkButtonComponent = (props: Props): JSX.Element => {
    return (
        <Button
            icon
            transparent
            onPress={props.isBookmarked ? props.removeBookmark : props.addBookmark}
        >
            <Icon
                name={props.isBookmarked ? 'bookmark' : 'bookmark-o'}
                type='FontAwesome'
                style={{
                    color: props.textColor,
                    fontSize: values.mediumIconSize,
                }} />
        </Button>
    );
};

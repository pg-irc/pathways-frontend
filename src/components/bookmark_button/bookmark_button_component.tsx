import React from 'react';
import { Icon, Button } from 'native-base';
import { AddToSavedListAction, RemoveFromSavedListAction } from '../../stores/topics';
import { values } from '../../application/styles';
import { AddServiceToSavedListAction, RemoveServiceFromSavedListAction } from '../../stores/services/actions';

export interface BookmarkButtonProps {
    readonly isBookmarked: boolean;
    readonly textColor: string;
}
export type AddBookmarkAction = AddToSavedListAction | AddServiceToSavedListAction;
export type RemoveBookmarkAction = RemoveFromSavedListAction | RemoveServiceFromSavedListAction;

export interface BookmarkButtonActions {
    readonly addBookmark: () => AddBookmarkAction;
    readonly removeBookmark: () => RemoveBookmarkAction;
}

type Props = BookmarkButtonProps & BookmarkButtonActions;

export const BookmarkButtonComponent = (props: Props): JSX.Element => (
    <Button onPress={getButtonOnPress(props)} transparent icon>
        <BookmarkIcon {...props} />
    </Button>
);

const BookmarkIcon = (props: Props): JSX.Element => (
    <Icon
        name={props.isBookmarked ? 'bookmark' : 'bookmark-o'}
        type='FontAwesome'
        style={{
            color: props.textColor,
            fontSize: values.mediumIconSize,
        }} />
);

const getButtonOnPress = (props: Props): () => AddBookmarkAction | RemoveBookmarkAction => (
    props.isBookmarked ? props.removeBookmark : props.addBookmark
);

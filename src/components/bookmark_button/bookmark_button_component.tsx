import React from 'react';
import { Icon, Button } from 'native-base';
import { BookmarkTopicAction, UnbookmarkTopicAction } from '../../stores/topics';
import { values } from '../../application/styles';
import { BookmarkServiceAction, UnbookmarkServiceAction } from '../../stores/services/actions';

export interface BookmarkButtonProps {
    readonly isBookmarked: boolean;
    readonly textColor: string;
}

export type AddBookmarkAction = BookmarkTopicAction | BookmarkServiceAction;
export type RemoveBookmarkAction = UnbookmarkTopicAction | UnbookmarkServiceAction;

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
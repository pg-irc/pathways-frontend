import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon, Button } from 'native-base';
import { AddToSavedListAction, RemoveFromSavedListAction } from '../../stores/tasks';
import { values } from '../../application/styles';

export enum BookmarkButtonDisplay {
    Default,
    ListItem,
}

export interface BookmarkButtonProps {
    readonly isBookmarked: boolean;
    readonly textColor: string;
    readonly display: BookmarkButtonDisplay;
}

export interface BookmarkButtonActions {
    readonly addBookmark: () => AddToSavedListAction;
    readonly removeBookmark: () => RemoveFromSavedListAction;
}

type Props = BookmarkButtonProps & BookmarkButtonActions;

export const BookmarkButtonComponent = (props: Props): JSX.Element => (
    props.display === BookmarkButtonDisplay.Default ?
        <DefaultButton {...props} /> : <ListItemButton {...props} />
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

const DefaultButton = (props: Props): JSX.Element => (
    <Button onPress={getButtonOnPress(props)} transparent icon>
        <BookmarkIcon {...props} />
    </Button>
);

const ListItemButton = (props: Props): JSX.Element => (
    <TouchableOpacity onPress={getButtonOnPress(props)} >
        <BookmarkIcon {...props} />
    </TouchableOpacity>
);

const getButtonOnPress = (props: Props): () => AddToSavedListAction | RemoveFromSavedListAction => (
    props.isBookmarked ? props.removeBookmark : props.addBookmark
);

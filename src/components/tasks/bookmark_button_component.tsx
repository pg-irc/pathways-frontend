import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { Id as TaskId, AddToSavedListAction, RemoveFromSavedListAction } from '../../stores/tasks';
import { Icon, View, Button } from 'native-base';
import { colors, applicationStyles } from '../../application/styles';

export interface BookmarkButtonProps {
    readonly taskId: TaskId;
}

export interface BookmarkButtonActions {
    readonly addBookmark: (taskId: TaskId) => AddToSavedListAction;
    readonly removeBookmark: (taskId: TaskId) => RemoveFromSavedListAction;
}

type Props = BookmarkButtonProps & BookmarkButtonActions;

export const ListItemAddBookmarkComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    buildBookmarkForListItem((): AddToSavedListAction => props.addBookmark(props.taskId), addBookmarkIcon)
);

export const ListItemRemoveBookmarkComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    buildBookmarkForListItem((): RemoveFromSavedListAction => props.removeBookmark(props.taskId), removeBookmarkIcon)
);

export const DetailAddBookmarkComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    buildBookmarkForDetail((): AddToSavedListAction => props.addBookmark(props.taskId), addBookmarkIcon)
);

export const DetailRemoveBookmarkComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    buildBookmarkForDetail((): RemoveFromSavedListAction => props.removeBookmark(props.taskId), removeBookmarkIcon)
);

const addBookmarkIcon = <Icon type='FontAwesome' style={{ color: colors.topaz }} name={'bookmark-o'} />;

const removeBookmarkIcon = <Icon type='FontAwesome' style={{ color: colors.topaz }} name={'bookmark'} />;

const buildBookmarkForListItem = (onPress: () => void, content: JSX.Element): JSX.Element => (
    <TouchableOpacity onPress={onPress}>
        {content}
    </TouchableOpacity>
);

const buildBookmarkForDetail = (onPress: () => void, content: JSX.Element): JSX.Element => {
    const height = Dimensions.get('screen').height;
    const position = Math.round(height / 25);
    return (
        <View style={{
            flex: 1,
            alignItems: 'flex-end',
            position: 'absolute',
            right: position,
            bottom: position,
        }}>
            <Button
                onPress={onPress}
                style={[
                    applicationStyles.boxShadowBelow,
                    {
                        backgroundColor: colors.white,
                        alignSelf: 'flex-end',
                        marginTop: 20,
                    },
                ]}
            >
                {content}
            </Button>
        </View>
    );
};

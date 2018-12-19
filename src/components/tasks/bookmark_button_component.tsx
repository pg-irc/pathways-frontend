import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import * as R from 'ramda';
import { Id as TaskId, AddToSavedListAction, RemoveFromSavedListAction } from '../../stores/tasks';
import { Icon, View, Button } from 'native-base';
import { colors, applicationStyles } from '../../application/styles';

export interface BookmarkButtonProps {
    readonly taskId: TaskId;
    readonly savedTasksIdList: ReadonlyArray<TaskId>;
}

export interface BookmarkButtonActions {
    readonly addBookmark: (taskId: TaskId) => AddToSavedListAction;
    readonly removeBookmark: (taskId: TaskId) => RemoveFromSavedListAction;
}

type Props = BookmarkButtonProps & BookmarkButtonActions;

export const ListItemBookmarkComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const configuration = getButtonConfiguration(props);
    return (
        <TouchableOpacity onPress={configuration.onPress}>
            <Icon
                type='FontAwesome'
                style={{ color: colors.topaz }}
                name={configuration.icon}
            />
        </TouchableOpacity>
    );
};

export const DetailBookmarkComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const configuration = getButtonConfiguration(props);
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
                onPress={configuration.onPress}
                style={[
                    applicationStyles.boxShadowBelow,
                    {
                        backgroundColor: colors.white,
                        alignSelf: 'flex-end',
                        marginTop: 20,
                    },
                ]}
            >
                <Icon
                    type='FontAwesome'
                    style={{ color: colors.topaz, fontSize: 30 }}
                    name={configuration.icon}
                />
            </Button>
        </View>
    );
};

type ButtonConfiguration = {
    readonly onPress: () => void;
    readonly icon: string;
};

const getButtonConfiguration = (props: Props): ButtonConfiguration => {
    const isBookmarked = R.contains(props.taskId, props.savedTasksIdList);
    return {
        onPress: isBookmarked ? getRemoveBookmarkOnPress(props) : getAddBookmarkOnPress(props),
        icon: isBookmarked ? 'bookmark' : 'bookmark-o',
    };
};

const getAddBookmarkOnPress = (props: Props): () => AddToSavedListAction => (
    (): AddToSavedListAction => props.addBookmark(props.taskId)
);

const getRemoveBookmarkOnPress = (props: Props): () => RemoveFromSavedListAction => (
    (): RemoveFromSavedListAction => props.removeBookmark(props.taskId)
);

import React from 'react';
import { View, Text, Icon } from 'native-base';
import { values, colors, textStyles } from '../../application/styles';
import { TaskListItem } from '../../selectors/topics/task_list_item';
import { AddToSavedListAction, RemoveFromSavedListAction, Id } from '../../stores/topics';
import { I18nManager, TouchableOpacity } from 'react-native';
import { EmptyComponent } from '../empty_component/empty_component';
import { stripMarkdown } from '../strip_markdown/strip_markdown';
import { BookmarkButtonComponent } from '../bookmark_button/bookmark_button_component';
import { RecommendedIconComponent } from '../recommended_topics/recommended_icon_component';

export interface TaskListItemProps {
    readonly task: TaskListItem;
    readonly taskIsBookmarked: boolean;
}

export interface TaskListItemActions {
    readonly addToSavedList: (taskId: Id) => AddToSavedListAction;
    readonly removeFromSavedList: (taskId: Id) => RemoveFromSavedListAction;
    readonly goToTaskDetail: () => void;
}

type Props = TaskListItemProps & TaskListItemActions;

export const TaskListItemComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const taskDescription = stripMarkdown(props.task.description);
    return (
        <TouchableOpacity
            onPress={props.goToTaskDetail}
            style={{
                backgroundColor: colors.white,
                borderRadius: values.lessRoundedBorderRadius,
                paddingVertical: 10,
                paddingRight: 10,
                paddingLeft: 0,
                marginVertical: 3,
                marginHorizontal: 10,
            }}
        >
            <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <BookmarkButtonComponent
                        isBookmarked={props.taskIsBookmarked}
                        addBookmark={(): AddToSavedListAction => props.addToSavedList(props.task.id)}
                        removeBookmark={(): RemoveFromSavedListAction => props.removeFromSavedList(props.task.id)}
                        textColor={colors.teal}
                    />
                    <View>
                        <Text numberOfLines={2} style={textStyles.headlineH4StyleBlackLeft}>
                            {props.task.title}
                        </Text>
                        <Text note numberOfLines={1} style={{ textAlign: 'left' }}>
                            {taskDescription}
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                    {props.task.isRecommended ?
                        <RecommendedIconComponent additionalStyles={{ marginRight: 5 }} />
                        :
                        <EmptyComponent />}
                    <Icon style={{ fontSize: 15 }} name={I18nManager.isRTL ? 'arrow-back' : 'arrow-forward'} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

import React from 'react';
import { Trans } from '@lingui/react';
import { View, Text } from 'native-base';
import { ExploreSection } from '../../selectors/explore/types';
import { RouterProps } from '../../application/routing';
import { Id as TaskId, BookmarkTopicAction, UnbookmarkTopicAction } from '../../stores/topics';
import { ExploreDetailContentComponent } from './explore_detail_content_component';
import { TopicListItem } from '../../selectors/topics/types';
import { textStyles, values, colors } from '../../application/styles';
import { TaskListComponent } from '../topics/task_list_component';
import { EmptyTopicListComponent } from '../empty_component/empty_topic_list_component';
import { BackButtonComponent } from '../header_button/back_button_component';
import { MenuButtonComponent } from '../header_button/menu_button_component';
import { HeaderComponent } from '../main/header_component';
import { OpenHeaderMenuAction } from '../../stores/user_experience/actions';

export interface ExploreDetailProps {
    readonly section: ExploreSection;
    readonly topics: ReadonlyArray<TopicListItem>;
    readonly bookmarkedTopics: ReadonlyArray<TaskId>;
}

export interface ExploreDetailActions {
    readonly bookmarkTopic: (topicId: TaskId) => BookmarkTopicAction;
    readonly unbookmarkTopic: (topicId: TaskId) => UnbookmarkTopicAction;
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
}

type Props = ExploreDetailProps & ExploreDetailActions & RouterProps;

export const ExploreDetailComponent = (props: Props): JSX.Element => (
    <View style={{ flex: 1}}>
        <Header {...props} />
        <TaskListComponent
            tasks={props.topics}
            savedTasksIdList={props.bookmarkedTopics}
            bookmarkTopic={props.bookmarkTopic}
            unbookmarkTopic={props.unbookmarkTopic}
            history={props.history}
            emptyTaskListContent={<EmptyTopicListComponent message={<Trans>No topics to show</Trans>}/>}
            headerContent={<TaskListHeaderComponent {...props} />}
        />
    </View>
);

const TaskListHeaderComponent = (props: Props): JSX.Element => (
    <View padder>
        <ExploreDetailContentComponent
            section={props.section}
            sectionHasTopics={props.topics.length > 0}
        />
        <Text
            style={[
                textStyles.headlineH5StyleBlackLeft,
                {
                    paddingHorizontal: values.backgroundTextPadding,
                    paddingTop: 18,
                },
            ]}
        >
            <Trans>EXPLORE TOPICS</Trans>
        </Text>
    </View>
);

const Header = (props: Props): JSX.Element => {
    const textColor = colors.black;
    const backgroundColor = colors.lightGrey;
    const leftButton = <BackButtonComponent history={props.history} textColor={textColor} />;
    const rightButton =
        <MenuButtonComponent
            onPress={props.openHeaderMenu}
            textColor={textColor}
        />;

    return (
        <HeaderComponent
            backgroundColor={backgroundColor}
            leftButton={leftButton}
            rightButtons={[rightButton]}
        />
    );
};

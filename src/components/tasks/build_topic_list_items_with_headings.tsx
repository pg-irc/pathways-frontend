import * as R from 'ramda';
import { TaskListItem } from '../../selectors/tasks/task_list_item';
import { TopicListHeading } from './topic_list_heading_component';
import { ExploreSection } from '../../selectors/explore/types';
import { rightAwaySectionId } from '../../fixtures/hard_coded/explore';

export type ListItem = TaskListItem | TopicListHeading;

export const buildTopicsListItemsWithHeadings = (topics: ReadonlyArray<TaskListItem>): ReadonlyArray<ListItem> => (
    flattenGroupedTopics(moveRightAwayTopicsToTheTop(R.groupBy(exploreSectionName, topics)))
);

type GroupedTaskListItems = {
    readonly [heading: string]: ReadonlyArray<TaskListItem>,
};

const exploreSectionName = (topic: TaskListItem): string => (
    topic.exploreSection.name
);

const moveRightAwayTopicsToTheTop = (groupedTopics: GroupedTaskListItems): ReadonlyArray<ReadonlyArray<TaskListItem>> => (
    R.reduce(
        (accumulator: ReadonlyArray<ReadonlyArray<TaskListItem>>, sectionName: string) => {
            const topicsGroup = groupedTopics[sectionName];
            const groupId = topicsGroup[0].exploreSection.id;
            return groupId === rightAwaySectionId ? [topicsGroup, ...accumulator] : [...accumulator, topicsGroup];
        },
        [],
        R.keys(groupedTopics),
    )
);

const flattenGroupedTopics = (groupedTopics: ReadonlyArray<ReadonlyArray<TaskListItem>>): ReadonlyArray<ListItem> => (
    R.reduce(
        (accumulator: ReadonlyArray<ListItem>, topicsGroup: ReadonlyArray<TaskListItem>) => {
            const topicListHeading = buildTopicListHeading(topicsGroup[0].exploreSection);
            return [
                ...accumulator,
                topicListHeading,
                ...topicsGroup,
            ];
        },
        [],
        groupedTopics,
    )
);

const buildTopicListHeading = (exploreSection: ExploreSection): TopicListHeading => ({
    id: exploreSection.name,
    heading: exploreSection.name,
    icon: exploreSection.icon,
});

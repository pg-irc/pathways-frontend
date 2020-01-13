import * as R from 'ramda';
import { TopicListItem } from '../../selectors/topics/types';
import { TopicListHeading } from './topic_list_heading_component';
import { ExploreSection } from '../../selectors/explore/types';
import { rightAwaySectionId } from '../../fixtures/hard_coded/explore';

export type ListItem = TopicListItem | TopicListHeading;

export const buildTopicsListItemsWithHeadings = (topics: ReadonlyArray<TopicListItem>): ReadonlyArray<ListItem> => (
    flattenGroupedTopics(moveRightAwayTopicsToTheTop(R.groupBy(exploreSectionName, topics)))
);

type GroupedTaskListItems = {
    readonly [heading: string]: ReadonlyArray<TopicListItem>,
};

const exploreSectionName = (topic: TopicListItem): string => (
    topic.exploreSection.name
);

const moveRightAwayTopicsToTheTop = (groupedTopics: GroupedTaskListItems): ReadonlyArray<ReadonlyArray<TopicListItem>> => (
    R.reduce(
        (accumulator: ReadonlyArray<ReadonlyArray<TopicListItem>>, sectionName: string) => {
            const topicsGroup = groupedTopics[sectionName];
            const groupId = topicsGroup[0].exploreSection.id;
            return groupId === rightAwaySectionId ? [topicsGroup, ...accumulator] : [...accumulator, topicsGroup];
        },
        [],
        R.keys(groupedTopics),
    )
);

const flattenGroupedTopics = (groupedTopics: ReadonlyArray<ReadonlyArray<TopicListItem>>): ReadonlyArray<ListItem> => (
    R.reduce(
        (accumulator: ReadonlyArray<ListItem>, topicsGroup: ReadonlyArray<TopicListItem>) => {
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

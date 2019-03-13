import * as R from 'ramda';
import { TaskListItem } from '../../selectors/tasks/task_list_item';
import { TopicListHeading } from './topic_list_heading_component';

export type ListItem = TaskListItem | TopicListHeading;

export const buildTopicsListItemsWithHeadings = (topics: ReadonlyArray<TaskListItem>): ReadonlyArray<ListItem> => (
    flattenGroupedTopics(groupTopicsByExploreSection(topics))
);

type GroupedTaskListItems  = { readonly [heading: string]: ReadonlyArray<TaskListItem> };

const groupTopicsByExploreSection = (topics: ReadonlyArray<TaskListItem>): GroupedTaskListItems => (
    R.groupBy((topic: TaskListItem) => topic.exploreSection.name, topics)
);

const flattenGroupedTopics = (groupedTopics: GroupedTaskListItems): ReadonlyArray<ListItem> => (
    R.reduce(
        (accumulator: ReadonlyArray<ListItem>, heading: string) =>
        [
            ...accumulator,
            {
                id: heading,
                heading: heading,
                icon: groupedTopics[heading][0].exploreSection.icon,
            },
            ...groupedTopics[heading],
        ],
        [],
        R.keys(groupedTopics),
    )
);

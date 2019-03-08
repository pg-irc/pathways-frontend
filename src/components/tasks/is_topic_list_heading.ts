import { TopicListItemOrHeading } from './build_topic_list_items_with_headings';
import { TopicListHeading } from './topic_list_heading_component';

export const isTopicListHeading = (listItem: TopicListItemOrHeading): listItem is TopicListHeading => (
    (<TopicListHeading>listItem).heading !== undefined
);
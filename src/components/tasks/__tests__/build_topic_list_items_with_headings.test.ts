// tslint:disable:no-expression-statement
import { ExploreSectionBuilder } from '../../../selectors/__tests__/helpers/explore_section_helpers';
import { TaskListItemBuilder } from '../../../selectors/__tests__/helpers/task_list_item_builder';
import { buildTopicsListItemsWithHeadings } from '../build_topic_list_items_with_headings';
import { TopicListHeading } from '../topic_list_heading_component';

describe('Group topics by section', () => {
    describe('tasks with the same section', () => {
        const section = new ExploreSectionBuilder().build();
        const firstTask = new TaskListItemBuilder(section).build();
        const secondTask = new TaskListItemBuilder(section).build();
        const result = buildTopicsListItemsWithHeadings([firstTask, secondTask]);

        it('inserts a heading before the group', () => {
            const topicListHeading = result[0] as TopicListHeading;
            expect(topicListHeading.heading).toBe(section.name);
        });

        it('sets the icon on the heading', () => {
            const topicListHeading = result[0] as TopicListHeading;
            expect(topicListHeading.icon).toBe(section.icon);
        });

        it('groups topics with the same explore section together', () => {
            expect(result[1]).toBe(firstTask);
            expect(result[2]).toBe(secondTask);
        });
    });

    describe('tasks with the different section', () => {
        const firstSection = new ExploreSectionBuilder().build();
        const firstTask = new TaskListItemBuilder(firstSection).build();
        const secondSection = new ExploreSectionBuilder().build();
        const secondTask = new TaskListItemBuilder(secondSection).build();
        const result = buildTopicsListItemsWithHeadings([firstTask, secondTask]);

        it('groups topics with the different explore section after each heading', () => {
            const firstTopicListHeading = result[0] as TopicListHeading;
            expect(firstTopicListHeading.heading).toBe(firstSection.name);

            expect(result[1]).toBe(firstTask);

            const secondTopicListHeading = result[2] as TopicListHeading;
            expect(secondTopicListHeading.heading).toBe(secondSection.name);

            expect(result[3]).toBe(secondTask);
        });
    });

    describe('puts the rightaway section first', () => {
        const firstSection = new ExploreSectionBuilder().build();
        const firstTask = new TaskListItemBuilder(firstSection).build();
        const rightAwaySection = new ExploreSectionBuilder().withId('rightaway').build();
        const rightAwayTask = new TaskListItemBuilder(rightAwaySection).build();
        const result = buildTopicsListItemsWithHeadings([firstTask, rightAwayTask]);

        it('groups topics with the different explore section after each heading', () => {
            const firstTopicListHeading = result[0] as TopicListHeading;
            expect(firstTopicListHeading.heading).toBe(rightAwaySection.name);

            expect(result[1]).toBe(rightAwayTask);

            const secondTopicListHeading = result[2] as TopicListHeading;
            expect(secondTopicListHeading.heading).toBe(firstSection.name);

            expect(result[3]).toBe(firstTask);
        });
    });
});

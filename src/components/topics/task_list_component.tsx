// tslint:disable:no-class no-this no-expression-statement readonly-keyword
import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import R from 'ramda';
import { History } from 'history';
import { Trans } from '@lingui/react';
import { TaskListItemComponent } from './task_list_item_component';
import { Routes, goToRouteWithParameter } from '../../application/routing';
import { Id, AddToSavedListAction, RemoveFromSavedListAction } from '../../stores/topics';
import { EmptyListComponent } from '../empty_component/empty_list_component';
import { colors } from '../../application/styles';
import { isTopicListHeading } from './is_topic_list_heading';
import { ListItem } from './build_topic_list_items_with_headings';
import { TopicListHeadingComponent } from './topic_list_heading_component';

export interface TaskListProps {
    readonly history: History;
    readonly tasks: ReadonlyArray<ListItem>;
    readonly savedTasksIdList: ReadonlyArray<Id>;
    readonly emptyTaskListContent: JSX.Element;
    readonly headerContent: JSX.Element;
    readonly headerContentIdentifier?: string;
}

export interface TaskListActions {
    readonly addToSavedList: (topicId: Id) => AddToSavedListAction;
    readonly removeFromSavedList: (topicId: Id) => RemoveFromSavedListAction;
}

type Props = TaskListProps & TaskListActions;

type State = {
    readonly sections: ReadonlyArray<ReadonlyArray<ListItem>>;
    readonly sectionCount: number;
    readonly data: ReadonlyArray<ListItem>;
};

type TaskListItemInfo = ListRenderItemInfo<ListItem>;

export class TaskListComponent extends React.PureComponent<Props, State> {
    private flatListRef: FlatListRef;
    private readonly numberOfItemsPerSection: number = 10;

    constructor(props: Props) {
        super(props);
        this.state = this.getFreshState();
        this.setFlatListRef = this.setFlatListRef.bind(this);
        this.loadMoreData = this.loadMoreData.bind(this);
    }

    componentDidUpdate(previousProps: Props): void {
        if (previousProps.headerContentIdentifier !== this.props.headerContentIdentifier) {
            this.flatListRef.scrollToOffset({ animated: false, offset: 0 });
        }
        if (this.tasksHaveChanged(previousProps)) {
            this.setState(this.getFreshState());
        }
    }

    tasksHaveChanged(previousProps: Props): boolean {
        const getIds = R.pluck('id');

        const currentIds = getIds(this.props.tasks);
        const previousIds = getIds(previousProps.tasks);

        return R.not(R.equals(previousIds, currentIds));
    }

    render(): JSX.Element {
        return (
            <FlatList
                ref={this.setFlatListRef}
                style={{ backgroundColor: colors.lightGrey }}
                data={this.state.data}
                renderItem={({ item }: TaskListItemInfo): JSX.Element => this.renderTaskListItem(item, this.props)}
                keyExtractor={(item: ListItem): string => item.id}
                onEndReached={this.loadMoreData}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={this.props.emptyTaskListContent}
                ListHeaderComponent={this.props.headerContent}
                initialNumToRender={this.numberOfItemsPerSection}
            />
        );
    }

    private getFreshState(): State {
        return this.state ? this.getStateWithAllTasksLoaded() : this.getStateWithFirstTaskSectionLoaded();
    }

    private getStateWithAllTasksLoaded(): State {
        const sections = this.getTaskSections();
        return {
            sections: sections,
            sectionCount: sections.length,
            data: this.props.tasks,
        };
    }

    private getStateWithFirstTaskSectionLoaded(): State {
        const sections = this.getTaskSections();
        return {
            sections: sections,
            sectionCount: 1,
            data: sections[0],
        };
    }

    private loadMoreData(): void {
        this.setSectionState(this.state.sectionCount + 1);
    }

    private setSectionState(sectionCount: number): void {
        this.setState({
            ...this.state,
            sectionCount: sectionCount,
            data: this.getSections(sectionCount),
        });
    }

    private getSections(sectionCount: number): ReadonlyArray<ListItem> {
        const sections = R.take(sectionCount, this.state.sections);
        type Items = ReadonlyArray<ListItem>;
        const concat = (acc: Items, elem: Items): Items => [...acc, ...elem];
        return R.reduce(concat, [], sections);
    }

    private getTaskSections(): ReadonlyArray<ReadonlyArray<ListItem>> {
        return R.splitEvery(this.numberOfItemsPerSection, this.props.tasks);
    }

    private setFlatListRef(component: object): void {
        this.flatListRef = component as FlatListRef;
    }

    private renderTaskListItem(item: ListItem, props: Props): JSX.Element {
        if (isTopicListHeading(item)) {
            return <TopicListHeadingComponent heading={item.heading} icon={item.icon} />;
        }
        return (
            <TaskListItemComponent
                topic={item}
                taskIsBookmarked={R.contains(item.id, props.savedTasksIdList)}
                addToSavedList={props.addToSavedList}
                removeFromSavedList={props.removeFromSavedList}
                goToTaskDetail={goToRouteWithParameter(Routes.TaskDetail, item.id, props.history)}
            />
        );
    }
}

export const NoTasksAddedComponent = (): JSX.Element => (
    <EmptyListComponent message={<Trans>No topics to show</Trans>} />
);

export const NoTasksRecommendedComponent = (): JSX.Element => (
    <EmptyListComponent message={<Trans>No topics to recommend</Trans>} />
);

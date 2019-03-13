// tslint:disable:no-class no-this no-expression-statement readonly-keyword
import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import * as R from 'ramda';
import { History } from 'history';
import { Trans } from '@lingui/react';
import { TaskListItemComponent } from './task_list_item_component';
import { Routes, goToRouteWithParameter } from '../../application/routing';
import { Id, AddToSavedListAction, RemoveFromSavedListAction } from '../../stores/tasks';
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
    readonly addToSavedList: (taskId: Id) => AddToSavedListAction;
    readonly removeFromSavedList: (taskId: Id) => RemoveFromSavedListAction;
}

type Props = TaskListProps & TaskListActions;

type State = {
    readonly sections: ReadonlyArray<ReadonlyArray<ListItem>>;
    readonly sectionIndex: number;
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
        if (previousProps.tasks.length !== this.props.tasks.length) {
            this.setState(this.getFreshState());
        }
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
            sectionIndex: sections.length - 1,
            data: this.props.tasks,
        };
    }

    private getStateWithFirstTaskSectionLoaded(): State {
        const sections = this.getTaskSections();
        return {
            sections: sections,
            sectionIndex: 0,
            data: sections[0],
        };
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
                task={item}
                taskIsBookmarked={R.contains(item.id, props.savedTasksIdList)}
                addToSavedList={props.addToSavedList}
                removeFromSavedList={props.removeFromSavedList}
                goToTaskDetail={goToRouteWithParameter(Routes.TaskDetail, item.id, props.history)}
            />
        );
    }

    private loadMoreData(): void {
        const nextsectionIndex = this.getNextSectionIndex();
        const nextSection = this.state.sections[nextsectionIndex];
        if (nextSection) {
            this.setState({
                sectionIndex: nextsectionIndex,
                data: R.concat(this.state.data, nextSection),
            });
        }
    }

    private getNextSectionIndex(): number {
        return this.state.sectionIndex + 1;
    }
}

export const NoTasksAddedComponent = (): JSX.Element => (
    <EmptyListComponent message={<Trans>No topics to show</Trans>} />
);

export const NoTasksRecommendedComponent = (): JSX.Element => (
    <EmptyListComponent message={<Trans>No topics to recommend</Trans>} />
);

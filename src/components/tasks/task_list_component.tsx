// tslint:disable:no-class no-this no-expression-statement readonly-keyword
import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import * as R from 'ramda';
import { History } from 'history';
import { Trans } from '@lingui/react';
import { TaskListItem } from '../../selectors/tasks/task_list_item';
import { TaskListItemComponent } from './task_list_item_component';
import { Routes, goToRouteWithParameter } from '../../application/routing';
import { Id, AddToSavedListAction, RemoveFromSavedListAction } from '../../stores/tasks';
import { EmptyListComponent } from '../empty_component/empty_list_component';
import { colors } from '../../application/styles';

export interface TaskListProps {
    readonly history: History;
    readonly tasks: ReadonlyArray<TaskListItem>;
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
    readonly sectionNumber: number;
    readonly sections: ReadonlyArray<ReadonlyArray<TaskListItem>>;
    readonly data: ReadonlyArray<TaskListItem>;
};

type TaskItemInfo = ListRenderItemInfo<TaskListItem>;

export class TaskListComponent extends React.PureComponent<Props, State> {
    private flatListRef: FlatListRef;
    private readonly numberOfItemsPerSection: number = 10;

    constructor(props: Props) {
        super(props);
        const sectionNumber = 0;
        const sections = R.splitEvery(this.numberOfItemsPerSection, this.props.tasks);
        const data = sections[sectionNumber];
        this.state = {
            sectionNumber,
            sections,
            data,
        };
        this.setFlatListRef = this.setFlatListRef.bind(this);
        this.loadMoreData = this.loadMoreData.bind(this);
    }

    componentDidUpdate(previousProps: Props): void {
        if (previousProps.headerContentIdentifier !== this.props.headerContentIdentifier) {
            this.flatListRef.scrollToOffset({ animated: false, offset: 0 });
        }
    }

    render(): JSX.Element {
        return (
            <FlatList
                ref={this.setFlatListRef}
                style={{ backgroundColor: colors.lightGrey }}
                data={this.state.data}
                renderItem={({ item }: TaskItemInfo): JSX.Element => this.renderTaskListItem(item, this.props)}
                keyExtractor={(task: TaskListItem): string => task.id}
                extraData={[this.props.tasks, this.props.headerContentIdentifier]}
                onEndReached={this.loadMoreData}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={this.props.emptyTaskListContent}
                ListHeaderComponent={this.props.headerContent}
                initialNumToRender={this.numberOfItemsPerSection}
            />
        );
    }

    private setFlatListRef(component: object): void {
        this.flatListRef = component as FlatListRef;
    }

    private renderTaskListItem(item: TaskListItem, props: Props): JSX.Element {
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
        const nextSectionNumber = this.getNextSectionNumber();
        const nextSection = this.state.sections[nextSectionNumber];
        if (nextSection) {
            this.setState({
                sectionNumber: nextSectionNumber,
                data: R.concat(this.state.data, nextSection),
            });
        }
    }

    private getNextSectionNumber(): number {
        return this.state.sectionNumber + 1;
    }
}

export const NoTasksAddedComponent = (): JSX.Element => (
    <EmptyListComponent message={<Trans>No topics bookmarked yet</Trans>} />
);

export const NoTasksRecommendedComponent = (): JSX.Element => (
    <EmptyListComponent message={<Trans>No topics to recommend</Trans>} />
);
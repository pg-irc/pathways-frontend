// tslint:disable:no-class no-this no-expression-statement readonly-keyword
import React from 'react';
import { FlatList, ListRenderItemInfo, NativeSyntheticEvent, ScrollViewProperties } from 'react-native';
import { History } from 'history';
import { TaskListItemComponent } from './task_list_item_component';
import { Routes, goToRouteWithParameter } from '../../application/routing';
import { Id, BookmarkTopicAction, UnbookmarkTopicAction } from '../../stores/topics';
import { colors } from '../../application/styles';
import { isTopicListHeading } from './is_topic_list_heading';
import { ListItem } from './build_topic_list_items_with_headings';
import { TopicListHeadingComponent } from './topic_list_heading_component';
import { SaveHomePageScrollOffsetAction, SaveTopicDetailScrollOffsetAction, SaveBookmarkedTopicsScrollOffsetAction,
    SaveTopicServicesScrollOffsetAction } from '../../stores/user_experience/actions';

// tslint:disable-next-line:no-var-requires
const R = require('ramda');

export interface TaskListProps {
    readonly history: History;
    readonly tasks: ReadonlyArray<ListItem>;
    readonly bookmarkedTopicsIdList: ReadonlyArray<Id>;
    readonly emptyTaskListContent: JSX.Element;
    readonly headerContent: JSX.Element;
    readonly headerContentIdentifier?: string;
    readonly scrollOffset: number;
}

export type SaveTaskListScrollOffsetActions =
    SaveBookmarkedTopicsScrollOffsetAction |
    SaveHomePageScrollOffsetAction |
    SaveTopicServicesScrollOffsetAction |
    SaveTopicDetailScrollOffsetAction;

export interface TaskListActions {
    readonly bookmarkTopic: (topicId: Id) => BookmarkTopicAction;
    readonly unbookmarkTopic: (topicId: Id) => UnbookmarkTopicAction;
    readonly saveScrollOffset: (offset: number) => SaveTaskListScrollOffsetActions;
}

type Props = TaskListProps & TaskListActions;

type State = {
    readonly sections: ReadonlyArray<ReadonlyArray<ListItem>>;
    readonly sectionCount: number;
    readonly data: ReadonlyArray<ListItem>;
    readonly scrollOffset: number;
};

type TaskListItemInfo = ListRenderItemInfo<ListItem>;

export class TaskListComponent extends React.PureComponent<Props, State> {
    private flatListRef: FlatListRef;
    private readonly numberOfItemsPerSection: number = 10;

    constructor(props: Props) {
        super(props);
        this.state = this.initialState(props.scrollOffset);
        this.setFlatListRef = this.setFlatListRef.bind(this);
        this.loadMoreData = this.loadMoreData.bind(this);
    }

    componentDidUpdate(previousProps: Props): void {
        const computeScrollOffset = (): number => {
            if (previousProps.headerContentIdentifier !== this.props.headerContentIdentifier) {
                return 0;
            }
            if (this.tasksHaveChanged(previousProps)) {
                return 0;
            }
            return this.state.scrollOffset;
        };
        if (this.flatListRef) {
            const offset = computeScrollOffset();
            this.flatListRef.scrollToOffset({ animated: false, offset });
        }
    }

    render(): JSX.Element {
        const onScrollEnd = (e: NativeSyntheticEvent<ScrollViewProperties>): void => {
            this.setState({
                ...this.state,
                scrollOffset: e.nativeEvent.contentOffset.y,
            });
        };
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
                onScrollEndDrag={onScrollEnd}
            />
        );
    }

    private tasksHaveChanged(previousProps: Props): boolean {
        const currentIds = R.pluck('id', this.props.tasks);
        const previousIds = R.pluck('id', previousProps.tasks);

        return R.not(R.equals(previousIds, currentIds));
    }

    private initialState(scrollOffset: number): State {
        const sections = this.taskSections();
        return {
            sections: sections,
            sectionCount: 1,
            data: sections[0],
            scrollOffset,
        };
    }

    private taskSections(): ReadonlyArray<ReadonlyArray<ListItem>> {
        return R.splitEvery(this.numberOfItemsPerSection, this.props.tasks);
    }

    private loadMoreData(): void {
        this.setStateForSectionCount(this.state.sectionCount + 1);
    }

    private setStateForSectionCount(sectionCount: number): void {
        this.setState({
            ...this.state,
            sectionCount,
            data: this.tasksForSectionCount(sectionCount),
        });
    }

    private tasksForSectionCount(sectionCount: number): ReadonlyArray<ListItem> {
        const sections = R.take(sectionCount, this.state.sections);
        return R.reduce(R.concat, [], sections);
    }

    private setFlatListRef(component: object): void {
        this.flatListRef = component as FlatListRef;
    }

    private saveScrollOffsetToReduxAndGoToTopicDetail(item: ListItem): void {
        this.props.saveScrollOffset(this.state.scrollOffset);
        goToRouteWithParameter(Routes.TopicDetail, item.id, this.props.history)();
    }

    private renderTaskListItem(item: ListItem, props: Props): JSX.Element {
        if (isTopicListHeading(item)) {
            return <TopicListHeadingComponent heading={item.heading} icon={item.icon} />;
        }
        return (
            <TaskListItemComponent
                topic={item}
                taskIsBookmarked={R.contains(item.id, props.bookmarkedTopicsIdList)}
                bookmarkTopic={props.bookmarkTopic}
                unbookmarkTopic={props.unbookmarkTopic}
                goToTaskDetail={(): void => this.saveScrollOffsetToReduxAndGoToTopicDetail(item)}
            />
        );
    }
}

// tslint:disable:no-class no-this no-expression-statement readonly-keyword
import React, { createRef, RefObject } from 'react';
import { FlatList, ListRenderItemInfo, NativeSyntheticEvent, ScrollViewProps } from 'react-native';
import { History } from 'history';
import { TaskListItemComponent } from './task_list_item_component';
import { Routes, goToRouteWithParameter } from '../../application/routing';
import { Id, BookmarkTopicAction, UnbookmarkTopicAction } from '../../stores/topics';
import { colors } from '../../application/styles';
import { isTopicListHeading } from './is_topic_list_heading';
import { ListItem } from './build_topic_list_items_with_headings';
import { TopicListHeadingComponent } from './topic_list_heading_component';
import { SaveHomePageScrollOffsetAction, SaveTopicDetailScrollOffsetAction, SaveBookmarkedTopicsScrollOffsetAction,
    SaveTopicServicesScrollOffsetAction, SaveExploreDetailScrollOffsetAction } from '../../stores/user_experience/actions';
import throttle from 'lodash.throttle';

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
    SaveTopicDetailScrollOffsetAction |
    SaveExploreDetailScrollOffsetAction;

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
    readonly isScrolling: boolean;
};

type TaskListItemInfo = ListRenderItemInfo<ListItem>;

export class TaskListComponent extends React.PureComponent<Props, State> {
    private readonly flatListRef: RefObject<FlatList>;
    private readonly numberOfItemsPerSection: number = 1000;

    constructor(props: Props) {
        super(props);
        this.state = this.initialState(props.scrollOffset);
        this.flatListRef = createRef();
        this.loadMoreData = this.loadMoreData.bind(this);
        // throttle does not work without binding it here.
        this.onScrollThrottled = throttle(this.onScrollThrottled.bind(this), 1000, { trailing: false });
        this.onScrollEndDrag = this.onScrollEndDrag.bind(this);
        this.scrollToOffsetWithTimeout = this.scrollToOffsetWithTimeout.bind(this);
    }

    componentDidMount(): void {
        if (this.flatListRef) {
           this.scrollToOffsetWithTimeout(this.props.scrollOffset);
        }
    }

    componentDidUpdate(previousProps: Props, previousState: State): void {
        if (this.state.isScrolling) {
            return;
        }

        if (previousState.scrollOffset === this.state.scrollOffset) {
            return;
        }

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
            this.scrollToOffsetWithTimeout(offset);
        }
    }

    render(): JSX.Element {
        return (
            <FlatList
                bounces={false}
                ref={this.flatListRef}
                style={{ backgroundColor: colors.lightGrey }}
                data={this.state.data}
                renderItem={({ item }: TaskListItemInfo): JSX.Element => this.renderTaskListItem(item, this.props)}
                keyExtractor={(item: ListItem): string => item.id}
                onEndReached={this.loadMoreData}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={this.props.emptyTaskListContent}
                ListHeaderComponent={this.props.headerContent}
                initialNumToRender={this.numberOfItemsPerSection}
                onScroll={this.onScrollThrottled}
                onScrollEndDrag={this.onScrollEndDrag}
            />
        );
    }

    private scrollToOffsetWithTimeout(offset: number): void {
        // tslint:disable-next-line: max-line-length
        // https://stackoverflow.com/questions/48061234/how-to-keep-scroll-position-using-flatlist-when-navigating-back-in-react-native?answertab=votes#tab-top
        setTimeout((): void => {
            this.flatListRef.current.scrollToOffset({ animated: false, offset });
        }, 10);
    }

    private onScrollThrottled(e: NativeSyntheticEvent<ScrollViewProps>): void {
        this.setState({
            ...this.state,
            scrollOffset: e.nativeEvent.contentOffset.y,
            isScrolling: true,
        });
        this.props.saveScrollOffset(e.nativeEvent.contentOffset.y);
    }

    private onScrollEndDrag(): void {
        this.setState({
            ...this.state,
            isScrolling: false,
        });
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
            isScrolling: false,
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

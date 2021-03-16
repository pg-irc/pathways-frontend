// tslint:disable:no-class no-this no-expression-statement readonly-keyword
import React from 'react';
import { FlatList, ListRenderItemInfo, NativeSyntheticEvent, ScrollViewProps } from 'react-native';
import { History } from 'history';
import { TaskListItemComponent } from './task_list_item_component';
import { Routes, goToRouteWithParameter } from '../../application/routing';
import { Id, BookmarkTopicAction, UnbookmarkTopicAction } from '../../stores/topics';
import { colors } from '../../application/styles';
import { isTopicListHeading } from './is_topic_list_heading';
import { ListItem } from './build_topic_list_items_with_headings';
import { TopicListHeadingComponent } from './topic_list_heading_component';
import throttle from 'lodash.throttle';

// tslint:disable-next-line:no-var-requires
const R = require('ramda');

export interface TaskListProps {
    readonly isRTL: boolean;
    readonly history: History;
    readonly tasks: ReadonlyArray<ListItem>;
    readonly bookmarkedTopicsIdList: ReadonlyArray<Id>;
    readonly emptyTaskListContent: JSX.Element;
    readonly headerContent: JSX.Element;
    readonly headerContentIdentifier?: string;
    readonly scrollOffset: number;
}
export interface TaskListActions {
    readonly bookmarkTopic: (topicId: Id) => BookmarkTopicAction;
    readonly unbookmarkTopic: (topicId: Id) => UnbookmarkTopicAction;
}

type Props = TaskListProps & TaskListActions;

type State = {
    readonly data: ReadonlyArray<ListItem>;
    readonly scrollOffset: number;
    readonly isScrolling: boolean;
};

type TaskListItemInfo = ListRenderItemInfo<ListItem>;

export class TaskListComponent extends React.PureComponent<Props, State> {
    private flatListRef: FlatListRef;
    private readonly numberOfItemsPerSection: number = 1000;
    private readonly throttleWaitTime: number = 300;

    constructor(props: Props) {
        super(props);
        this.state = this.initialState(this.props.scrollOffset);
        this.setFlatListRef = this.setFlatListRef.bind(this);
        // throttle does not work without binding it here.
        this.onScrollThrottled = throttle(this.onScrollThrottled.bind(this), this.throttleWaitTime, { trailing: false });
        this.onScrollEndDrag = this.onScrollEndDrag.bind(this);
    }

    componentDidMount(): void {
        if (this.flatListRef) {
            scrollToOffset(this.flatListRef, this.state.scrollOffset);
        }
    }

    componentDidUpdate(previousProps: Props): void {
        if (!this.flatListRef) {
            return;
        }

        if (hasTopicDetailPageChanged(previousProps, this.props)) {
            return this.setState({
                ...this.state,
                scrollOffset: this.props.scrollOffset,
                data: this.props.tasks,
                }, (): void => scrollToOffset(this.flatListRef, this.state.scrollOffset));
        }

        if (hasTasksChanged(previousProps, this.props)) {
            return this.setState({
                ...this.state,
                data: this.props.tasks,
            }, (): void => scrollToOffset(this.flatListRef, this.state.scrollOffset));
        }
    }

    render(): JSX.Element {
        return (
            <FlatList
                ref={this.setFlatListRef}
                style={{ backgroundColor: colors.lightGrey }}
                data={this.state.data}
                renderItem={({ item }: TaskListItemInfo): JSX.Element => renderTaskListItem(item, this.props, this.state.scrollOffset)}
                keyExtractor={(item: ListItem): string => item.id}
                ListEmptyComponent={this.props.emptyTaskListContent}
                ListHeaderComponent={this.props.headerContent}
                initialNumToRender={this.numberOfItemsPerSection}
                onScroll={this.onScrollThrottled}
                onScrollEndDrag={this.onScrollEndDrag}
            />
        );
    }

    private setFlatListRef(component: object): void {
        this.flatListRef = component as FlatListRef;
    }

    private onScrollThrottled(e: NativeSyntheticEvent<ScrollViewProps>): void {
        this.setState({
            ...this.state,
            scrollOffset: e.nativeEvent.contentOffset.y,
            isScrolling: true,
        });
    }

    private onScrollEndDrag(): void {
        this.setState({
            ...this.state,
            isScrolling: false,
        });
    }

    private initialState(scrollOffset: number): State {
        return {
            data: this.props.tasks,
            scrollOffset,
            isScrolling: false,
        };
    }
}

const scrollToOffset = (flatListRef: FlatListRef, offset: number): void => {
    // tslint:disable-next-line: max-line-length
    // https://stackoverflow.com/questions/48061234/how-to-keep-scroll-position-using-flatlist-when-navigating-back-in-react-native?answertab=votes#tab-top
    setTimeout((): void => {
        flatListRef.scrollToOffset({ animated: false, offset });
    }, 10);
};

const hasTopicDetailPageChanged = (previousProps: Props, props: Props): boolean => (
    previousProps.headerContentIdentifier !== props.headerContentIdentifier
);

const hasTasksChanged = (previousProps: Props, props: Props): boolean => {
    const currentIds = R.pluck('id', props.tasks);
    const previousIds = R.pluck('id', previousProps.tasks);

    return R.not(R.equals(previousIds, currentIds));
};

const renderTaskListItem = (item: ListItem, props: Props, scrollOffset: number): JSX.Element => {
    if (isTopicListHeading(item)) {
        return <TopicListHeadingComponent heading={item.heading} icon={item.icon} />;
    }
    return (
        <TaskListItemComponent
            isRTL={props.isRTL}
            topic={item}
            taskIsBookmarked={R.contains(item.id, props.bookmarkedTopicsIdList)}
            bookmarkTopic={props.bookmarkTopic}
            unbookmarkTopic={props.unbookmarkTopic}
            goToTaskDetail={(): void => goToRouteWithParameter(Routes.TopicDetail, item.id, props.history, scrollOffset)}
        />
    );
};
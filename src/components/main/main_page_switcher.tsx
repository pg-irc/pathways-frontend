import React from 'react';
import { Content, Text } from 'native-base';
import * as store from '../../stores/page_switcher';
import { ExploreAllConnectedComponent } from '../explore/explore_all_connected_component';
import { ExploreSectionConnectedComponent } from '../explore/explore_section_connected_component';
import { ArticleDetailConnectedComponent } from '../articles/article_detail_connected_component';
import { TaskDetailConnectedComponent } from '../tasks/task_detail_connected_component';
import * as questionnaire from '../questionnaire';
import { MyPlan } from '../my_plan/my_plan';
import { Store as TasksStore } from '../../stores/tasks';
import { Locale } from '../../locale/types';

export interface Props {
    readonly routeInProps: store.Store;
    readonly tasksStore: TasksStore; // TODO remove, have the selector pull it from the app store
    readonly locale: Locale;
}

export interface Actions {
}

export const Component: React.StatelessComponent<Props & Actions> = (props: Props & Actions): JSX.Element => {
    switch (props.routeInProps.pageType) {
        case store.Page.Questionnaire:
            return <questionnaire.ConnectedComponent />;

        case store.Page.MyPlan:
            return <MyPlan />;

        case store.Page.ExploreAll:
            return <ExploreAllConnectedComponent />;

        case store.Page.ExploreSection:
            return <ExploreSectionConnectedComponent />;

        case store.Page.TaskDetail:
            return <TaskDetailConnectedComponent />;

        case store.Page.ArticleDetail:
            return <ArticleDetailConnectedComponent />;

        default:
            return <Content><Text>Error</Text></Content>;
    }
};

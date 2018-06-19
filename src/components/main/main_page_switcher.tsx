import React from 'react';
import { Content, Text } from 'native-base';
import * as store from '../../stores/page_switcher';
import { ExploreAllConnectedComponent } from '../explore/explore_all_connected_component';
import { ExploreSectionComponent } from '../explore/explore_section';
import * as questionnaire from '../questionnaire';
import { MyPlan } from '../my_plan/my_plan';
import { Store as TasksStore } from '../../stores/tasks';
import { Store as AppStore } from '../../application/store';
import { TaskDetail } from '../tasks/task_detail';
import { selectTaskById } from '../../selectors/tasks';
import { selectCurrentExploreSection } from '../../selectors/explore';
import { Locale } from '../../locale/types';

export interface Props {
    readonly currentPageInProps: store.Page;
    readonly currentPageParameters: store.PageParameters;
    readonly tasksStore: TasksStore;
    readonly appStore: AppStore; // TODO remove
    readonly locale: Locale;
}

export interface Actions {
}

export const Component: React.StatelessComponent<Props & Actions> = (props: Props & Actions): JSX.Element => {
    switch (props.currentPageInProps) {
        case store.Page.Questionnaire:
            return <questionnaire.ConnectedComponent />;

        case store.Page.MyPlan:
            return <MyPlan />;

        case store.Page.ExploreAll:
            return <ExploreAllConnectedComponent />;

        case store.Page.ExploreSection:
            // TODO use the connected component and have the selector pull
            // the currently selected section out from routing info in the store
            return <ExploreSectionComponent
                section={selectCurrentExploreSection(props.appStore)}
            />;

        case store.Page.TaskDetail:
            return <TaskDetail
                task={selectTaskById(props.locale, props.tasksStore, props.currentPageParameters)}
            />;

        default:
            return <Content><Text>Error</Text></Content>;
    }
};

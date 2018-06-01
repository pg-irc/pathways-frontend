import React from 'react';
import { Content, Text } from 'native-base';
import * as store from '../../stores/page_switcher';
import * as exploreAll from '../explore_all/explore_all';
import * as questionnaire from '../questionnaire';
import * as myPlan from '../my_plan/my_plan';
import * as taskStore from '../../stores/tasks';
import * as taskDetail from '../tasks/task_detail';
import { selectTaskById } from '../../selectors/tasks';

export interface Props {
    readonly mainPageInProps: store.Page;
    readonly pageParameters: store.PageParameters;
    readonly tasksInStore: taskStore.Store;
}

export interface Actions {
}

export const Component: React.StatelessComponent<Props & Actions> = (props: Props & Actions): JSX.Element => {
    const errorMessage = (<Content><Text>Error</Text></Content>);

    switch (props.mainPageInProps) {
        case store.Page.Questionnaire:
            return <questionnaire.ConnectedComponent />;

        case store.Page.MyPlan:
            return <myPlan.Component />;

        case store.Page.ExploreAll:
            return <exploreAll.Component />;

        case store.Page.TaskDetail:
            if (!props.pageParameters.taskId) {
                return errorMessage;
            }
            const task = selectTaskById(props.tasksInStore, props.pageParameters.taskId);
            return <taskDetail.Component task={task} />;

        default:
            return errorMessage;
    }
};

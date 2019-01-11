import React from 'react';
import { Switch, Route } from 'react-router-native';
import { WelcomeConnectedComponent } from '../welcome/welcome_connected_component';
import { HomeComponent } from '../home/home_component';
import { HelpConnectedComponent } from '../help/help_connected_component';
import { ExploreAllConnectedComponent } from '../explore/explore_all_connected_component';
import { ExploreDetailConnectedComponent } from '../explore/explore_detail_connected_component';
import { TaskDetailConnectedComponent } from '../tasks/task_detail_connected_component';
import { ServicesConnectedComponent } from '../services/service_list_connected_component';
import { QuestionnaireConnectedComponent } from '../questionnaire/questionnaire_connected_component';
import { AboutComponent } from '../about/about_component';
import { RecommendedTopicsConnectedComponent } from '../recommended_topics/recommended_topics_connected_component';
import { BookmarkedTopicsConnectedComponent } from '../bookmarked_topics/bookmarked_topics_connected_component';
import { Routes, routePathDefinition } from '../../application/routing';

export const MainPageSwitcherComponent: React.StatelessComponent = (): JSX.Element => (
    <Switch>
        <Route exact path={routePathDefinition(Routes.Welcome)} component={WelcomeConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.Home)} component={HomeComponent} />
        <Route exact path={routePathDefinition(Routes.Help)} component={HelpConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.Questionnaire)} component={QuestionnaireConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.Learn)} component={ExploreAllConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.LearnDetail)} component={ExploreDetailConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.TaskDetail)} component={TaskDetailConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.Services)} component={ServicesConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.About)} component={AboutComponent} />
        <Route exact path={routePathDefinition(Routes.RecommendedTopics)} component={RecommendedTopicsConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.BookmarkedTopics)} component={BookmarkedTopicsConnectedComponent} />
    </Switch>
);

type ScrollViewRef = {
    readonly _root: {
        readonly scrollIntoView: (element: JSX.Element) => void,
    };
};

export const scrollToComponent = (scrollViewRef: ScrollViewRef, targetComponent: JSX.Element): void => (
    scrollViewRef._root.scrollIntoView(targetComponent)
);

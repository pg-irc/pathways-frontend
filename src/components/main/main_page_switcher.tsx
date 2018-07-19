import React from 'react';
import { Switch, Route } from 'react-router-native';
import { WelcomeConnectedComponent } from '../welcome/welcome_connected_component';
import { HomePageConnectedComponent } from '../home_page/home_page_connected_component';
import { HelpConnectedComponent } from '../help/help_connected_component';
import { ExploreAllConnectedComponent } from '../explore/explore_all_connected_component';
import { ExploreSectionConnectedComponent } from '../explore/explore_section_connected_component';
import { ArticleDetailConnectedComponent } from '../articles/article_detail_connected_component';
import { TaskDetailConnectedComponent } from '../tasks/task_detail_connected_component';
import { QuestionnaireConnectedComponent } from '../questionnaire';
import { MyPlanConnectedComponent } from '../my_plan/my_plan_connected_component';
import { Routes, routePathDefinition } from '../../application/routing';

export const MainPageSwitcherComponent: React.StatelessComponent = (): JSX.Element => (
    <Switch>
        <Route exact path={routePathDefinition(Routes.Welcome)} component={WelcomeConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.Home)} component={HomePageConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.Help)} component={HelpConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.Questionnaire)} component={QuestionnaireConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.MyPlan)} component={MyPlanConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.Learn)} component={ExploreAllConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.LearnDetail)} component={ExploreSectionConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.TaskDetail)} component={TaskDetailConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.ArticleDetail)} component={ArticleDetailConnectedComponent} />
    </Switch>
);

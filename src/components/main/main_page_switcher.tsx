import React from 'react';
import { Switch, Route } from 'react-router-native';
import { WelcomeConnectedComponent } from '../welcome/welcome_connected_component';
import { HomePageConnectedComponent } from '../home_page/home_page_connected_component';
import { ExploreAllConnectedComponent } from '../explore/explore_all_connected_component';
import { ExploreSectionConnectedComponent } from '../explore/explore_section_connected_component';
import { ArticleDetailConnectedComponent } from '../articles/article_detail_connected_component';
import { TaskDetailConnectedComponent } from '../tasks/task_detail_connected_component';
import { QuestionnaireConnectedComponent } from '../questionnaire';
import { MyPlanConnectedComponent } from '../my_plan/my_plan_connected_component';
import { Routes, routePath } from '../../application/routing';

export const MainPageSwitcherComponent: React.StatelessComponent = (): JSX.Element => (
    <Switch>
        <Route exact path={routePath(Routes.Welcome)} component={WelcomeConnectedComponent} />
        <Route exact path={routePath(Routes.Home)} component={HomePageConnectedComponent} />
        <Route exact path={routePath(Routes.Questionnaire)} component={QuestionnaireConnectedComponent} />
        <Route exact path={routePath(Routes.MyPlan)} component={MyPlanConnectedComponent} />
        <Route exact path={routePath(Routes.Learn)} component={ExploreAllConnectedComponent} />
        <Route exact path={routePath(Routes.LearnDetail)} component={ExploreSectionConnectedComponent} />
        <Route exact path={routePath(Routes.TaskDetail)} component={TaskDetailConnectedComponent} />
        <Route exact path={routePath(Routes.ArticleDetail)} component={ArticleDetailConnectedComponent} />
    </Switch>
);

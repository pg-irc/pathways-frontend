import React from 'react';
import { Switch, Route } from 'react-router-native';
import { WelcomeConnectedComponent } from '../welcome/welcome_connected_component';
import { HomePageComponent } from '../home_page/home_page_component';
import { HelpComponent } from '../help/help_component';
import { ExploreAllConnectedComponent } from '../explore/explore_all_connected_component';
import { ExploreDetailConnectedComponent } from '../explore/explore_detail_connected_component';
import { TaskDetailConnectedComponent } from '../tasks/task_detail_connected_component';
import { TaskDetailServicesConnectedComponent } from '../tasks/task_detail_services_connected_component';
import { QuestionnaireConnectedComponent } from '../questionnaire/questionnaire_connected_component';
import { MyPlanConnectedComponent } from '../my_plan/my_plan_connected_component';
import { AboutComponent } from '../about/about_component';
import { Routes, routePathDefinition } from '../../application/routing';

export const MainPageSwitcherComponent: React.StatelessComponent = (): JSX.Element => (
    <Switch>
        <Route exact path={routePathDefinition(Routes.Welcome)} component={WelcomeConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.Home)} component={HomePageComponent} />
        <Route exact path={routePathDefinition(Routes.Help)} component={HelpComponent} />
        <Route exact path={routePathDefinition(Routes.Questionnaire)} component={QuestionnaireConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.MyPlan)} component={MyPlanConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.Learn)} component={ExploreAllConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.LearnDetail)} component={ExploreDetailConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.TaskDetail)} component={TaskDetailConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.TaskDetailServices)} component={TaskDetailServicesConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.About)} component={AboutComponent} />
    </Switch>
);

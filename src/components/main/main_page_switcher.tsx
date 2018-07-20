import React from 'react';
import { Switch, Route } from 'react-router-native';
import { WelcomeConnectedComponent } from '../welcome/welcome_connected_component';
import { HomePageConnectedComponent } from '../home_page/home_page_connected_component';
import { ExploreAllConnectedComponent } from '../explore/explore_all_connected_component';
import { ExploreSectionConnectedComponent } from '../explore/explore_section_connected_component';
import { ArticleDetailConnectedComponent } from '../articles/article_detail_connected_component';
import { TaskDetailConnectedComponent } from '../tasks/task_detail_connected_component';
import { QuestionnaireConnectedComponent } from '../questionnaire';
import { MyPlan } from '../my_plan/my_plan';
import { Routes } from '../../application/routing';

export const MainPageSwitcherComponent: React.StatelessComponent = (): JSX.Element => {
    // TODO Use this as a guide for what we remove....
    // switch (props.routeInProps.pageType) {
    //     case store.Page.Welcome:
    //         return <WelcomeConnectedComponent />;

    //     case store.Page.Home:
    //         return <HomePageConnectedComponent />;

    //     case store.Page.Questionnaire:
    //         return <questionnaire.ConnectedComponent />;

    //     case store.Page.MyPlan:
    //         return <MyPlan />;

    //     case store.Page.ExploreAll:
    //         return <ExploreAllConnectedComponent />;

    //     case store.Page.ExploreSection:
    //         return <ExploreSectionConnectedComponent />;

    //     case store.Page.TaskDetail:
    //         return <TaskDetailConnectedComponent />;

    //     case store.Page.ArticleDetail:
    //         return <ArticleDetailConnectedComponent />;

    //     default:
    //         return <Content><Text>Error</Text></Content>;
    // }
    return (
        <Switch>
            <Route exact path={Routes.welcome} component={WelcomeConnectedComponent} />
            <Route exact path={Routes.home} component={HomePageConnectedComponent} />
            <Route exact path={Routes.questionnaire} component={QuestionnaireConnectedComponent} />
            <Route exact path={Routes.myPlan} component={MyPlan} />
            <Route exact path={Routes.exploreSections} component={ExploreAllConnectedComponent} />
            <Route exact path={Routes.exploreSectionDetail} component={ExploreSectionConnectedComponent} />
            <Route exact path={Routes.taskDetail} component={TaskDetailConnectedComponent} />
            <Route exact path={Routes.articleDetail} component={ArticleDetailConnectedComponent} />
        </Switch>
    );
};

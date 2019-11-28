import React from 'react';
import { Switch, Route, Redirect } from 'react-router-native';
import { OnboardingConnectedComponent } from '../onboarding/onboarding_connected_component';
import { WelcomeConnectedComponent } from '../welcome/welcome_connected_component';
import { HelpConnectedComponent } from '../help/help_connected_component';
import { ExploreAllConnectedComponent } from '../explore/explore_all_connected_component';
import { ExploreDetailConnectedComponent } from '../explore/explore_detail_connected_component';
import { TaskDetailConnectedComponent } from '../topics/task_detail_connected_component';
import { ServiceListConnectedComponent } from '../services/service_list_connected_component';
import { QuestionnaireConnectedComponent } from '../questionnaire/questionnaire_connected_component';
import { RecommendedTopicsConnectedComponent } from '../recommended_topics/recommended_topics_connected_component';
import { BookmarkedTopicsConnectedComponent } from '../bookmarked_topics/bookmarked_topics_connected_component';
import { SearchConnectedComponent } from '../search/search_connected_component';
import { OrganizationDetailComponent } from '../organizations/organization_detail_component';
import { ServiceDetailConnectedComponent } from '../services/service_detail_connected_component';
import { Routes, routePathDefinition, routePathWithoutParameter } from '../../application/routing';
import { Locale } from '../../locale';

interface Props {
    readonly locale: Locale;
    readonly localeIsSet: boolean;
    readonly showOnboarding: boolean;
}

export const MainPageSwitcherComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <Switch>
        <Route exact path={routePathDefinition(Routes.Welcome)} component={WelcomeConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.Onboarding)} component={OnboardingConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.Help)} component={HelpConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.Questionnaire)} component={QuestionnaireConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.Learn)} component={ExploreAllConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.LearnDetail)} component={ExploreDetailConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.TopicDetail)} component={TaskDetailConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.Services)} component={ServiceListConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.RecommendedTopics)} component={RecommendedTopicsConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.BookmarkedTopics)} component={BookmarkedTopicsConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.Search)} component={SearchConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.OrganizationDetail)} component={OrganizationDetailComponent} />
        <Route exact path={routePathDefinition(Routes.ServiceDetail)} component={ServiceDetailConnectedComponent} />
        <Redirect to={defaultPath(props)} />
    </Switch>
);

const defaultPath = (props: Props): string => {
    if (!props.localeIsSet) {
        return routePathWithoutParameter(Routes.Welcome);
    }
    if (props.showOnboarding) {
        return routePathWithoutParameter(Routes.Onboarding);
    }
    return routePathWithoutParameter(Routes.RecommendedTopics);
};

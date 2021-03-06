import React from 'react';
import { Switch, Route, Redirect } from 'react-router-native';
import { OnboardingConnectedComponent } from '../onboarding/onboarding_connected_component';
import { WelcomeConnectedComponent } from '../welcome/welcome_connected_component';
import { HelpConnectedComponent } from '../help/help_connected_component';
import { ExploreAllConnectedComponent } from '../explore/explore_all_connected_component';
import { ExploreDetailConnectedComponent } from '../explore/explore_detail_connected_component';
import { TopicDetailConnectedComponent } from '../topics/topic_detail_connected_component';
import { ServiceListConnectedComponent } from '../services/service_list_connected_component';
import { QuestionnaireConnectedComponent } from '../questionnaire/questionnaire_connected_component';
import { RecommendedTopicsConnectedComponent } from '../recommended_topics/recommended_topics_connected_component';
import { BookmarksConnectedComponent } from '../bookmarks/bookmarks_connected_component';
import { SearchConnectedComponent } from '../search/search_connected_component';
import { ServiceDetailConnectedComponent } from '../services/service_detail_connected_component';
import { OtherRemoveServiceConnectedComponent } from '../feedback/other_remove_service_connected_component';
import { ExplainFeedbackConnectedComponent } from '../feedback/explain_feedback_connected_component';
import { Routes, routePathDefinition, routePathWithoutParameter } from '../../application/routing';
import {  LocaleCode } from '../../application/locales';
import { ContactInformationConnectedComponent } from '../feedback/contact_information_connected_component';
import { OrganizationConnectedComponent } from '../organizations/organization_connected_component';
import { ServiceReviewConnectedComponent } from '../reviews/service_review_connected_component';
import { RegionCode } from '../../validation/region/types';

interface Props {
    readonly region: RegionCode;
    readonly locale: LocaleCode;
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
        <Route exact path={routePathDefinition(Routes.TopicDetail)} component={TopicDetailConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.Services)} component={ServiceListConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.RecommendedTopics)} component={RecommendedTopicsConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.Bookmarks)} component={BookmarksConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.Search)} component={SearchConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.Organization)} component={OrganizationConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.ServiceDetail)} component={ServiceDetailConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.OtherFeedback)} component={OtherRemoveServiceConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.ExplainFeedback)} component={ExplainFeedbackConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.ContactInformation)} component={ContactInformationConnectedComponent} />
        <Route exact path={routePathDefinition(Routes.ServiceReview)} component={ServiceReviewConnectedComponent} />
        <Redirect to={defaultPath(props)} />
    </Switch>
);

const defaultPath = (props: Props): string => {
    if (!props.localeIsSet || !props.region) {
        return routePathWithoutParameter(Routes.Welcome);
    }
    if (props.showOnboarding) {
        return routePathWithoutParameter(Routes.Onboarding);
    }
    return routePathWithoutParameter(Routes.RecommendedTopics);
};

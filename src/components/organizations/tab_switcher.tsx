import React from 'react';
import { TabView, TabBar, SceneRendererProps, NavigationState, Route } from 'react-native-tab-view';
import { Dimensions } from 'react-native';
import { t } from '@lingui/macro';
import { colors, textStyles } from '../../application/styles';
import { EmptyComponent } from '../empty_component/empty_component';
import { History } from 'history';
import { OrganizationDetailComponent } from './organization_detail_component';
import { OrganizationServiceListComponent } from './organization_service_list_component';
import { OrganizationActions, OrganizationProps } from './organization_component';
import { RouterProps } from '../../application/routing';
import { HumanOrganizationData } from '../../validation/organizations/types';
import { SearchServiceData } from '../../validation/search/types';

// tslint:disable-next-line: readonly-array
export type TabRoutes = Array<Route>;

export enum OrganizationTab {
    AboutOrganization,
    Services,
}

interface TabSwitcherProps {
    readonly i18n: I18n;
    readonly history: History;
    readonly organization: HumanOrganizationData;
    readonly services: ReadonlyArray<SearchServiceData>;
    readonly organizationTab: OrganizationTab;
    readonly setOrganizationTab: (tab: OrganizationTab)=> void;
}

type Props = TabSwitcherProps & OrganizationProps & OrganizationActions & RouterProps;

export const TabSwitcher = (props: Props): JSX.Element => {
    const routes: TabRoutes = [
        { key: 'about', title: props.i18n._(t`About`) },
        { key: 'services', title: props.i18n._(t`Services`) },
    ];

    const renderScene = ({ route }: { readonly route: Route}): JSX.Element => {
        switch (route.key) {
          case 'about':
            return (
                <OrganizationDetailComponent
                organization={props.organization}
                analyticsLinkPressed={props.analyticsLinkPressed}
                currentPathForAnalytics={props.location.pathname}
            />
            );
          case 'services':
            return (
                <OrganizationServiceListComponent
                services={props.services}
                history={props.history}
                bookmarkService={props.bookmarkService}
                unbookmarkService={props.unbookmarkService}
                openServiceDetail={props.openServiceDetail}
                analyticsLinkPressed={props.analyticsLinkPressed}
                currentPathForAnalytics={props.location.pathname}
                organizationServicesOffset={props.organizationServicesOffset}
                saveOrganizationServicesOffset={props.saveOrganizationServicesOffset}
            />
            );
          default:
            return <EmptyComponent />;
        }
      };
    const onIndexChange = (index: number): void => {
        // tslint:disable-next-line: no-expression-statement
        props.setOrganizationTab(index);
    };

    return (
        <TabView
            navigationState={{ index: props.organizationTab, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={onIndexChange}
            style={{backgroundColor: colors.white}}
            initialLayout={{ width: Dimensions.get('window').width }}
            sceneContainerStyle={{backgroundColor: colors.lightGrey}}
        />
    );
};

export interface NavigationStateRoute {
    readonly navigationState: NavigationState<Route>;
}

type TabBarProps = SceneRendererProps & NavigationStateRoute;

const renderTabBar = (tabBarProps: TabBarProps): JSX.Element => (
    <TabBar
        {...tabBarProps}
        style={{ backgroundColor: colors.white, width: '55%', elevation: 0, marginHorizontal: 8 }}
        indicatorStyle={{ backgroundColor: colors.teal, height: 4 }}
        getLabelText={({ route }: { readonly route: Route}): string => route.title}
        labelStyle={textStyles.headlineH3StyleBlackCenter}
    />
);

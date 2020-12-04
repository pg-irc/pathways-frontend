import React from 'react';
import { Dimensions } from 'react-native';
import { TabView, Route, NavigationState, SceneRendererProps, TabBar } from 'react-native-tab-view';
import { t } from '@lingui/macro';
import { EmptyComponent } from '../empty_component/empty_component';
import { colors, textStyles } from '../../application/styles';
import { OrganizationDetailComponent } from './organization_detail_component';
import { HumanOrganizationData } from '../../validation/organizations/types';
import { OrganizationActions, OrganizationProps } from './organization_component';
import { AnalyticsLinkPressedAction, AnalyticsLinkProps } from '../../stores/analytics';
import { OrganizationServiceListComponent } from './organization_service_list_component';
import { HumanServiceData } from '../../validation/services/types';

// tslint:disable-next-line: readonly-array
export type TabRoutes = Array<Route>;

interface OrganizationTabSwitcherProps {
    readonly i18n: I18n;
    readonly organization: HumanOrganizationData;
    readonly servicesForOrganization: ReadonlyArray<HumanServiceData>;
    readonly analyticsLinkPressed: (analyticsLinkProps: AnalyticsLinkProps) => AnalyticsLinkPressedAction;
    readonly currentPathForAnalytics: string;
}

type Props = OrganizationTabSwitcherProps & OrganizationProps & OrganizationActions;

export const OrganizationTabSwitcher = (props: Props): JSX.Element => {
    const routes: TabRoutes = [
        { key: 'about', title: props.i18n._(t`About`) },
        { key: 'services', title: props.i18n._(t`Services`) },
    ];

    const renderScene = ({ route }: { readonly route: Route }): JSX.Element => {
        switch (route.key) {
            case 'about':
                return (
                    <OrganizationDetailComponent
                        organization={props.organization}
                        analyticsLinkPressed={props.analyticsLinkPressed}
                        currentPathForAnalytics={props.currentPathForAnalytics}
                    />
                );
            case 'services':
                return (
                    <OrganizationServiceListComponent
                        services={props.servicesForOrganization}
                        history={props.history}
                        bookmarkService={props.bookmarkService}
                        unbookmarkService={props.unbookmarkService}
                        openServiceDetail={props.openServiceDetail}
                        organizationServicesOffset={props.organizationServicesOffset}
                        saveOrganizationServicesOffset={props.saveOrganizationServicesOffset}
                    />
                );
            default:
                return <EmptyComponent />;
        }
    };

    return (
        <TabView
            navigationState={{ index: props.organizationTab, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={props.saveOrganizationTab}
            initialLayout={{ width: Dimensions.get('window').width }}
        />
    );
}
export interface NavigationStateRoute {
    readonly navigationState: NavigationState<Route>;
}

type TabBarProps = SceneRendererProps & NavigationStateRoute;

const renderTabBar = (tabBarProps: TabBarProps): JSX.Element => (
    <TabBar
        {...tabBarProps}
        style={{ backgroundColor: colors.white, elevation: 0 }}
        indicatorStyle={{ backgroundColor: colors.teal, height: 4 }}
        getLabelText={({ route }: { readonly route: Route }): string => route.title}
        labelStyle={textStyles.paragraphStyle}
    />
);
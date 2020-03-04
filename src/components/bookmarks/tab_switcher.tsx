import React, { useState } from 'react';
import { TopicBookmarksComponent } from './topic_bookmarks_component';
import { ServiceBookmarksComponent } from './service_bookmarks_component';
import { TabView, SceneMap, TabBar, SceneRendererProps, NavigationState, Route } from 'react-native-tab-view';
import { Dimensions } from 'react-native';
import { ReactI18nRenderProp } from '../../locale/types';
import { Trans } from '@lingui/react';
import { colors, textStyles } from '../../application/styles';
import { BookmarksProps } from './bookmarks_component';
import { View, Text } from 'native-base';
import { RouterProps } from '../../application/routing';
import { TaskListActions } from '../topics/task_list_component';

// tslint:disable-next-line: readonly-array
export type TabRoutes = Array<Route>;

type Props = ReactI18nRenderProp & BookmarksProps & TaskListActions & RouterProps;

export const TabSwitcher = (props: Props): JSX.Element => {
    const _ = props.i18n._.bind(props.i18n);
    const routes: TabRoutes = [
        { key: 'topics', title: _('Topics') },
        { key: 'services', title: _('Services') },
    ];

    const [index, setIndex]: readonly [number, (n: number) => void] = useState(0);

    const TopicsComponent = (): JSX.Element => (
        <View style={{backgroundColor: colors.white}}>
            <TopicBookmarksComponent {...props} />
        </View>
    );

    const ServicesComponent = (): JSX.Element => (
        <View style={{backgroundColor: colors.white}}>
            <ServiceBookmarksComponent {...props} />
        </View>
    );

    const render = SceneMap({
        topics: TopicsComponent,
        services: ServicesComponent,
    });

    return (
        <TabView
        navigationState={{ index, routes }}
        renderScene={render}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
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

// This is here to be able to extract heading strings with yarn extract-strings-clean.
// These strings must match the strings within the BookmarksTabSwitcher component.
export const extractBookmarkComponentStrings = (): JSX.Element => (
    <View>
        <Text>
            <Trans>Topics</Trans>
        </Text>
        <Text>
            <Trans>Services</Trans>
        </Text>
    </View>
);
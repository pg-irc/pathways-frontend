import React, { useState } from 'react';
import { TopicBookmarksComponent } from './topic_bookmarks_component';
import { ServiceBookmarksComponent } from './service_bookmarks_component';
import { TabView, SceneMap, TabBar, SceneRendererProps, NavigationState, Route } from 'react-native-tab-view';
import { Dimensions } from 'react-native';
import { ReactI18nRenderProp } from '../../locale/types';
import { t } from '@lingui/macro';
import { colors, textStyles } from '../../application/styles';
import { BookmarksProps } from './bookmarks_component';
import { View } from 'native-base';
import { RouterProps } from '../../application/routing';
import { ListActions } from './bookmarks_connected_component';

// tslint:disable-next-line: readonly-array
export type TabRoutes = Array<Route>;

type Props = ReactI18nRenderProp & BookmarksProps & ListActions & RouterProps;

export const TabSwitcher = (props: Props): JSX.Element => {
    const _ = props.i18n._.bind(props.i18n);
    const routes: TabRoutes = [
        { key: 'topics', title: _(t`Topics`) },
        { key: 'services', title: _(t`Services`) },
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
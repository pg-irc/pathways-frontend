import React, { useState } from 'react';
import { TopicBookmarksComponent } from './topic_bookmarks_component';
import { ServiceBookmarksComponent } from './service_bookmarks_component';
import { TabView, TabBar, SceneRendererProps, NavigationState, Route } from 'react-native-tab-view';
import { Dimensions } from 'react-native';
import { t } from '@lingui/macro';
import { colors, textStyles } from '../../application/styles';
import { BookmarksProps } from './bookmarks_component';
import { RouterProps } from '../../application/routing';
import { ListActions } from './bookmarks_connected_component';
import { EmptyComponent } from '../empty_component/empty_component';

// tslint:disable-next-line: readonly-array
export type TabRoutes = Array<Route>;

interface TabSwitcherProps {
    readonly i18n: I18n;
}

type Props = TabSwitcherProps & BookmarksProps & ListActions & RouterProps;

export const TabSwitcher = (props: Props): JSX.Element => {
    const routes: TabRoutes = [
        { key: 'topics', title: props.i18n._(t`Topics`) },
        { key: 'services', title: props.i18n._(t`Services`) },
    ];

    const [index, setIndex]: readonly [number, (n: number) => void] = useState(0);

    const renderScene = ({ route }: { readonly route: Route}): JSX.Element => {
        switch (route.key) {
          case 'topics':
            return (
                <TopicBookmarksComponent
                    bookmarkedTopics={props.bookmarkedTopics}
                    bookmarkTopic={props.bookmarkTopic}
                    unbookmarkTopic={props.unbookmarkTopic}
                    history={props.history}
                    location={props.location}
                    match={props.match}
                />
            );
          case 'services':
            return (
                <ServiceBookmarksComponent
                    bookmarkedServices={props.bookmarkedServices}
                    bookmarkService={props.bookmarkService}
                    unbookmarkService={props.unbookmarkService}
                    openServiceDetail={props.openServiceDetail}
                    history={props.history}
                    location={props.location}
                    match={props.match}
                />
            );
          default:
            return <EmptyComponent />;
        }
      };

    return (
        <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
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
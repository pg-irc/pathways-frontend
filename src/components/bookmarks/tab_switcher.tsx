import React from 'react';
import { TopicBookmarksComponent } from './topic_bookmarks_component';
import { ServiceBookmarksComponent } from './service_bookmarks_component';
import { TabView, TabBar, SceneRendererProps, NavigationState, Route } from 'react-native-tab-view';
import { Dimensions } from 'react-native';
import { t } from '@lingui/macro';
import { colors, textStyles } from '../../application/styles';
import { BookmarksProps } from './bookmarks_component';
import { ListActions } from './bookmarks_connected_component';
import { EmptyComponent } from '../empty_component/empty_component';
import { History } from 'history';

// tslint:disable-next-line: readonly-array
export type TabRoutes = Array<Route>;

interface TabSwitcherProps {
    readonly i18n: I18n;
    readonly history: History;
}

type Props = TabSwitcherProps & BookmarksProps & ListActions;

export const TabSwitcher = (props: Props): JSX.Element => {
    const routes: TabRoutes = [
        { key: 'topics', title: props.i18n._(t`Topics`) },
        { key: 'services', title: props.i18n._(t`Services`) },
    ];

    const renderScene = ({ route }: { readonly route: Route}): JSX.Element => {
        switch (route.key) {
          case 'topics':
            return (
                <TopicBookmarksComponent
                    bookmarkedTopics={props.bookmarkedTopics}
                    history={props.history}
                    bookmarkTopic={props.bookmarkTopic}
                    unbookmarkTopic={props.unbookmarkTopic}
                    saveListOffset={props.saveListOffset}
                />
            );
          case 'services':
            return (
                <ServiceBookmarksComponent
                    bookmarkedServices={props.bookmarkedServices}
                    history={props.history}
                    bookmarkedServicesOffset={props.bookmarkedServicesOffset}
                    bookmarkService={props.bookmarkService}
                    unbookmarkService={props.unbookmarkService}
                    openServiceDetail={props.openServiceDetail}
                    saveListOffset={props.saveListOffset}
                />
            );
          default:
            return <EmptyComponent />;
        }
      };
    const onIndexChange = (index: number): void => {
        // tslint:disable-next-line: no-expression-statement
        props.setBookmarksTab(index);
    };

    return (
        <TabView
            navigationState={{ index: props.bookmarksTab, routes }}
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

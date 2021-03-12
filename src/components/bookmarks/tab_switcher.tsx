import React from 'react';
import { TopicBookmarksComponent } from './topic_bookmarks_component';
import { ServiceBookmarksComponent } from './service_bookmarks_component';
import { TabView, TabBar, SceneRendererProps, NavigationState, Route } from 'react-native-tab-view';
import { Dimensions, View } from 'react-native';
import { t } from '@lingui/macro';
import { colors, textStyles } from '../../application/styles';
import { BookmarksProps, BookmarkActions } from './bookmarks_component';
import { EmptyComponent } from '../empty_component/empty_component';
import { History } from 'history';
import { TabDividerComponent } from '../content_layout/tab_divider_component';

// tslint:disable-next-line: readonly-array
export type TabRoutes = Array<Route>;

interface TabSwitcherProps {
    readonly i18n: I18n;
    readonly history: History;
}

type Props = TabSwitcherProps & BookmarksProps & BookmarkActions;

export const TabSwitcher = (props: Props): JSX.Element => {
    const routes: TabRoutes = [
        { key: 'topics', title: props.i18n._(t`Topics`) },
        { key: 'services', title: props.i18n._(t`Services`) },
    ];

    const renderScene = ({ route }: { readonly route: Route }): JSX.Element => {
        switch (route.key) {
            case 'topics':
                return (
                    <TopicBookmarksComponent
                        bookmarkedTopics={props.bookmarkedTopics}
                        history={props.history}
                        bookmarkTopic={props.bookmarkTopic}
                        unbookmarkTopic={props.unbookmarkTopic}
                        scrollOffset={props.topicsScrollOffset}
                        saveScrollOffset={props.saveTopicsScrollOffset}
                    />
                );
            case 'services':
                return (
                    <ServiceBookmarksComponent
                        bookmarkedServices={props.bookmarkedServices}
                        history={props.history}
                        bookmarkService={props.bookmarkService}
                        unbookmarkService={props.unbookmarkService}
                        openServiceDetail={props.openServiceDetail}
                        saveScrollOffset={props.saveServicesScrollOffset}
                        i18n={props.i18n}
                        isSendingReview={props.isSendingReview}
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
            style={{ backgroundColor: colors.white }}
            initialLayout={{ width: Dimensions.get('window').width }}
            sceneContainerStyle={{ backgroundColor: colors.lightGrey }}
        />
    );
};

export interface NavigationStateRoute {
    readonly navigationState: NavigationState<Route>;
}

type TabBarProps = SceneRendererProps & NavigationStateRoute;

export const renderTabBar = (tabBarProps: TabBarProps): JSX.Element => (
    <View>
        <TabBar
            {...tabBarProps}
            style={{ backgroundColor: colors.white, width: '55%', elevation: 0, marginHorizontal: 8, shadowOpacity: 0 }}
            indicatorStyle={{ backgroundColor: colors.teal, height: 4 }}
            getLabelText={({ route }: { readonly route: Route }): string => route.title}
            labelStyle={textStyles.headlineH3StyleBlackCenter}
        />
        <TabDividerComponent />
    </View>
);

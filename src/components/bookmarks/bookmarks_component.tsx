import React, { Dispatch, SetStateAction } from 'react';
import { TopicListItem } from '../../selectors/topics/topic_list_item';
import { RouterProps } from '../../application/routing';
import { ListActions } from './bookmarks_connected_component';
import { TopicBookmarksComponent } from './topic_bookmarks_component';
import { HumanServiceData } from '../../validation/services/types';
import { View, Text, Content } from 'native-base';
import { Trans, I18n } from '@lingui/react';
import { colors, textStyles, values, getNormalFontFamily } from '../../application/styles';
import { ServiceBookmarksComponent } from './service_bookmarks_component';
import { ReactI18nRenderProp, ReactI18n } from '../../locale/types';
import { TabView, SceneMap, TabBar, SceneRendererProps, NavigationState, Route } from 'react-native-tab-view';
import { Dimensions } from 'react-native';

export interface BookmarksProps {
    readonly bookmarkedServices: ReadonlyArray<HumanServiceData>;
    readonly bookmarkedTopics: ReadonlyArray<TopicListItem>;
}

type Props = BookmarksProps & ListActions & RouterProps ;

export const BookmarksComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    return (
        <Content style={{ backgroundColor: colors.lightGrey }}>
            <HeaderComponent/>
            <I18n>
                {(i18nRenderProp: ReactI18nRenderProp): JSX.Element => (
                    <TabSwitcher i18n={i18nRenderProp.i18n} {...props}/>
                )}
            </I18n>
        </Content>
    );
};

const HeaderComponent = (): JSX.Element => (
    <View padder style={{ backgroundColor: colors.white, paddingHorizontal: values.backgroundTextPadding }}>
        <Text style={textStyles.headlineH1StyleBlackLeft} >
            <Trans>My bookmarks</Trans>
        </Text>
        <Text style={textStyles.paragraphStyle}>
            <Trans>Save important topics and services to build your personal plan for settlement.</Trans>
        </Text>
    </View>
);

export interface TabSwitcherProps {
    readonly i18n: ReactI18n;
}

// navigation state requires routes to not be a ReadonlyArray
// tslint:disable-next-line: readonly-array
export type TabRoutes = Array<Route>;

const TabSwitcher = (props: Props & TabSwitcherProps): JSX.Element => {
    const _ = props.i18n._.bind(props.i18n);
    const topicTabTitle = _('Topics');
    const serviceTabTitle = _('Services');
    const initialRoutes: TabRoutes = [
        // key must be 'first', 'second', 'third' etc
        { key: 'first', title: topicTabTitle },
        { key: 'second', title: serviceTabTitle },
    ];
    const [index, setIndex]: [number, (n: number) => void] = React.useState(0);
    const [routes]: [TabRoutes, Dispatch<SetStateAction<TabRoutes>>] = React.useState(initialRoutes);

    // recommended to define components outside of renderScene to avoid unecessary re-renders
    const FirstRoute = (): JSX.Element => (
        <View style={{backgroundColor: colors.white}}>
            <TopicBookmarksComponent {...props} />
        </View>
    );

    const SecondRoute = (): JSX.Element => (
        <View style={{backgroundColor: colors.white}}>
            <ServiceBookmarksComponent {...props} />
            </View>
        );

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    const renderTabBar = (tabBarProps: SceneRendererProps  & {
        readonly navigationState: NavigationState<Route>}): JSX.Element => (
        <TabBar
        {...tabBarProps}
        style={{ backgroundColor: colors.white, width: '55%', elevation: 0, marginHorizontal: 8 }}
        indicatorStyle={{ backgroundColor: colors.teal, height: 4 }}
        getLabelText={({ route }: { readonly route: Route}): string => route.title}
        labelStyle={{color: colors.black, fontWeight: 'bold', fontFamily: getNormalFontFamily()}}
        />
    );

    return (
        <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        style={{backgroundColor: colors.white}}
        // recommended to pass initialLayout to improve render performance
        initialLayout={{ width: Dimensions.get('window').width }}
        sceneContainerStyle={{backgroundColor: colors.lightGrey}}
        />
    );
};

// This is here to be able to extract heading strings with yarn extract-strings-clean.
// These strings must match the strings within the TabSwitcher component.
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

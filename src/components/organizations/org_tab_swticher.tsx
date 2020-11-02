import * as React from 'react';
import { Text, Dimensions } from 'react-native';
import { TabView, Route, NavigationState, SceneRendererProps, TabBar } from 'react-native-tab-view';
import { t } from '@lingui/macro';
import { EmptyComponent } from '../empty_component/empty_component';
import { colors, textStyles } from '../../application/styles';

// tslint:disable-next-line: readonly-array
export type TabRoutes = Array<Route>;

interface OrgTabSwitcherProps {
    readonly i18n: I18n;
}

export default function OrgTabSwitcher(props: OrgTabSwitcherProps) {
    const [index, setIndex] = React.useState(0);
    const routes: TabRoutes = [
        { key: 'about', title: props.i18n._(t`About`) },
        { key: 'services', title: props.i18n._(t`Services`) },
    ];

    const renderScene = ({ route }: { readonly route: Route}): JSX.Element => {
        switch (route.key) {
          case 'about':
            return (
                <Text>About Tab</Text>
            );
          case 'services':
            return (
                <Text>Services Tab</Text>
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
            initialLayout={{width: Dimensions.get('window').width}}
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
        getLabelText={({ route }: { readonly route: Route}): string => route.title}
        labelStyle={textStyles.paragraphStyle}
    />
);
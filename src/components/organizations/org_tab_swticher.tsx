import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { t } from '@lingui/macro';

const FirstRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);

const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

const initialLayout = { width: Dimensions.get('window').width };

interface OrgTabSwitcherProps {
    readonly i18n: I18n;
}

export default function OrgTabSwitcher(props: OrgTabSwitcherProps) {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'about', title: props.i18n._(t`About`) },
        { key: 'services', title: props.i18n._(t`Services`) },
    ]);

    const renderScene = SceneMap({
        about: FirstRoute,
        services: SecondRoute,
    });

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
        />
    );
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});
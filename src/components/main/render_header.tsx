import React from 'react';
import { View } from 'react-native';
import { Header, Left, Right, Body, Title } from 'native-base';
import { EmptyComponent } from '../empty_component/empty_component';
import { getStatusBarHeightForPlatform } from './get_status_bar_height_for_platform';
import { mapWithIndex } from '../../application/map_with_index';

interface RenderHeaderProps {
    readonly backgroundColor: string;
    readonly leftButton?: JSX.Element;
    readonly rightButtons: ReadonlyArray<JSX.Element>;
    readonly title?: JSX.Element;
}

export const renderHeader = (props: RenderHeaderProps): JSX.Element => {
    const marginTop = getStatusBarHeightForPlatform();
    return (
        <Header style={{ marginTop, backgroundColor: props.backgroundColor, borderBottomColor: 'transparent' }}>
            {buildLeftButton(props.leftButton)}
            {buildTitle(props.title)}
            {buildRightButtons(props.rightButtons)}
        </Header>
    );
};

const buildLeftButton = (leftButton?: JSX.Element): JSX.Element => {
    if (!leftButton) {
        return <EmptyComponent />;
    }
    return <Left style={{ justifyContent: 'flex-end', paddingLeft: 5 }}>
        {leftButton}
    </Left>;
};

const buildTitle = (title?: JSX.Element): JSX.Element => {
    if (!title) {
        return <EmptyComponent />;
    }
    return <Body>
        <Title>{title}</Title>
    </Body>;
};

const buildRightButtons = (rightButtons: ReadonlyArray<JSX.Element>): JSX.Element => {
    const buildView = (button: JSX.Element, index: number): JSX.Element => (
        <View key={index}>
            {button}
        </View>
    );
    return <Right style={{ alignItems: 'center' }}>
        {mapWithIndex(buildView, rightButtons)}
    </Right>;
};
import React from 'react';
import { View } from 'react-native';
import { Header, Left, Right, Body, Title } from 'native-base';
import { EmptyComponent } from '../empty_component/empty_component';
import { mapWithIndex } from '../../application/helpers/map_with_index';
import { applicationStyles } from '../../application/styles';

interface HeaderComponentProps {
    readonly backgroundColor: string;
    readonly leftButton?: JSX.Element;
    readonly rightButtons: ReadonlyArray<JSX.Element>;
    readonly title?: JSX.Element;
}

export const HeaderComponent = (props: HeaderComponentProps): JSX.Element => (
    <Header style={[ applicationStyles.header, { backgroundColor: props.backgroundColor }]}>
        {buildLeftButton(props.leftButton)}
        {buildTitle(props.title)}
        {buildRightButtons(props.rightButtons)}
    </Header>
);

const buildLeftButton = (leftButton?: JSX.Element): JSX.Element => {
    if (!leftButton) {
        return <EmptyComponent />;
    }
    return <Left style={applicationStyles.headerLeft}>
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
    return <Right style={applicationStyles.headerRight}>
        {mapWithIndex(buildView, rightButtons)}
    </Right>;
};

import React from 'react';
import { Content, View } from 'native-base';
import { colors } from '../../application/styles';

export interface LoadingServiceListComponentProps {
    readonly header?: JSX.Element;
}

export const LoadingServiceListComponent = (props: LoadingServiceListComponentProps): JSX.Element => {
    return (
        <Content style={{ backgroundColor: colors.lightGrey }}>
            {props.header}
            <LoadingServiceListItemComponent />
            <LoadingServiceListItemComponent />
            <LoadingServiceListItemComponent />
            <LoadingServiceListItemComponent />
        </Content>
    );
};

const LoadingServiceListItemComponent = (): JSX.Element => (
    <View style={{ backgroundColor: colors.white, marginTop: 8, paddingVertical: 15 }}>
        <View style={{ flex: 2, paddingLeft: 15 }}>
            <LoadingTitle />
            <LoadingSubtitle />
            <LoadingText />
            <LoadingText />
            <LoadingText />
        </View>
    </View>
);

const LoadingTitle = (): JSX.Element => (
    <View style={{ height: 16, width: 312, backgroundColor: colors.fadedGrey }}/>
);

const LoadingSubtitle = (): JSX.Element => (
    <View style={{ height: 16, width: 180, backgroundColor: colors.fadedGrey, marginTop: 10 }}/>
);

const LoadingText = (): JSX.Element => (
    <View style={{ height: 8, width: 312, backgroundColor: colors.fadedGrey, marginTop: 10 }}/>
);
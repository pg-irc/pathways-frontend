import React from 'react';
import { ServiceListHeaderComponent } from '../services/service_list_component';
import { Content, View } from 'native-base';
import { colors } from '../../application/styles';

export interface LoadingScreenComponentProps {
    readonly title: string;
}

export const LoadingScreenComponent = (props: LoadingScreenComponentProps): JSX.Element => {
    return (
        <Content>
            <ServiceListHeaderComponent title={props.title}/>
            <View style={{ backgroundColor: colors.white, marginTop: 8, paddingVertical: 15 }}>
                <View style={{ flex: 2, paddingLeft: 15 }}>
                    <View style={{ height: 16, width: 312, backgroundColor: colors.fadedGrey }}/>
                    <View style={{ height: 16, width: 180, backgroundColor: colors.fadedGrey, marginTop: 10 }}/>
                    <View style={{ height: 8, width: 312, backgroundColor: colors.fadedGrey, marginTop: 30 }}/>
                    <View style={{ height: 8, width: 312, backgroundColor: colors.fadedGrey, marginTop: 10 }}/>
                    <View style={{ height: 8, width: 312, backgroundColor: colors.fadedGrey, marginTop: 10 }}/>
                </View>
            </View>
            <View style={{ backgroundColor: colors.white, marginTop: 8, paddingVertical: 15 }}>
                <View style={{ paddingLeft: 15, marginTop: 8 }}>
                    <View style={{ height: 16, width: 312, backgroundColor: colors.fadedGrey }}/>
                    <View style={{ height: 16, width: 180, backgroundColor: colors.fadedGrey, marginTop: 10 }}/>
                    <View style={{ height: 8, width: 312, backgroundColor: colors.fadedGrey, marginTop: 30 }}/>
                    <View style={{ height: 8, width: 312, backgroundColor: colors.fadedGrey, marginTop: 10 }}/>
                    <View style={{ height: 8, width: 312, backgroundColor: colors.fadedGrey, marginTop: 10 }}/>
                </View>
            </View>
            <View style={{ backgroundColor: colors.white, marginTop: 8, paddingVertical: 15 }}>
                <View style={{ paddingLeft: 15, marginTop: 8 }}>
                    <View style={{ height: 16, width: 312, backgroundColor: colors.fadedGrey }}/>
                    <View style={{ height: 16, width: 180, backgroundColor: colors.fadedGrey, marginTop: 10 }}/>
                    <View style={{ height: 8, width: 312, backgroundColor: colors.fadedGrey, marginTop: 30 }}/>
                    <View style={{ height: 8, width: 312, backgroundColor: colors.fadedGrey, marginTop: 10 }}/>
                    <View style={{ height: 8, width: 312, backgroundColor: colors.fadedGrey, marginTop: 10 }}/>
                </View>
            </View>
        </Content>
    );
};

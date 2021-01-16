import React from 'react';
import { Text, View } from 'react-native';
import { CloseButtonComponent } from '../close_button_component';
import { colors, textStyles, applicationStyles } from '../../application/styles';
import { Header } from 'native-base';

export interface ServiceReviewProps {
    readonly serviceId: string;
    readonly serviceName: string;
}

export const ServiceReviewComponent = (props: ServiceReviewProps): JSX.Element => (
    <View>
        <HeaderComponent name={props.serviceName}/>
    </View>
);

export const HeaderComponent = ({name}: {readonly name: string}): JSX.Element => (
    <Header style={applicationStyles.headerContainer} androidStatusBarColor={colors.teal}>
        <View style={{ flex: 4, paddingHorizontal: 15 }}>
            <Text style={textStyles.headline6}>
                {name}
            </Text>
        </View>
        <CloseButtonComponent
            color={colors.greyishBrown}
            additionalStyle={{ paddingTop: 0 }}
            onPress={(): void => console.log('go back to previous page')}
        />
    </Header>
);
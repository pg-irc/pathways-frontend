// tslint:disable:no-class no-expression-statement no-this

import React from 'react';
import { Text, View } from 'native-base';
import { Trans } from '@lingui/react';
import { TextInput } from 'react-native';
import { textStyles } from '../../application/styles';
import { MultiLineButtonComponent } from '../mutiline_button/multiline_button_component';
import { HelpComponentProps, HelpComponentActions } from './help_component';

type Props = HelpComponentProps & HelpComponentActions;

interface State {
    readonly latitude?: string;
    readonly longitude?: string;
}

export class ManualUserLocation extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            latitude: props.manualUserLocation && '' + props.manualUserLocation.latitude,
            longitude: props.manualUserLocation && '' + props.manualUserLocation.longitude,
        };
    }
    onSetManualLocation(): void {
        const latitude = parseFloat(this.state.latitude);
        const longitude = parseFloat(this.state.longitude);
        if (latitude && longitude) {
            this.props.setManualUserLocation({ latitude, longitude });
        }
    }
    onClearManualLocation(): void {
        this.props.clearManualUserLocation();
    }
    render(): JSX.Element {
        return <View>
            <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={(latitude: string): void => this.setState({ ...this.state, latitude })}
                value={this.state.latitude}
            />
            <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={(longitude: string): void => this.setState({ ...this.state, longitude })}
                value={this.state.longitude}
            />
            <MultiLineButtonComponent onPress={(): void => this.onSetManualLocation()}>
                <Text style={textStyles.button}>
                    <Trans>Set manual location</Trans>
                </Text>
            </MultiLineButtonComponent>
            <MultiLineButtonComponent onPress={(): void => this.onClearManualLocation()}>
                <Text style={textStyles.button}>
                    <Trans>Clear manual location</Trans>
                </Text>
            </MultiLineButtonComponent>
        </View>;
    }
}

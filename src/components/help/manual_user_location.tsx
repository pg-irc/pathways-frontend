// tslint:disable:no-class no-expression-statement no-this

import React from 'react';
import { Text, View } from 'native-base';
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
        this.onSetManualLocation = this.onSetManualLocation.bind(this);
        this.onClearManualLocation = this.onClearManualLocation.bind(this);
    }

    onSetManualLocation(): void {
        const latitude = parseFloat(this.state.latitude);
        const longitude = parseFloat(this.state.longitude);
        if (latitude && longitude) {
            this.props.setManualUserLocation({ latitude, longitude });
        }
    }

    onClearManualLocation(): void {
        this.setState({ latitude: undefined, longitude: undefined });
        this.props.clearManualUserLocation();
    }

    render(): JSX.Element {
        const onLatitudeChange = (str: string): void => this.setState({ ...this.state, latitude: str });
        const onLongitudeChange = (str: string): void => this.setState({ ...this.state, longitude: str });
        return <View>
            {this.textInput('Latitude:', this.state.latitude, onLatitudeChange)}
            {this.textInput('Longitude:', this.state.longitude, onLongitudeChange)}
            {this.button('Set manual location', (): void => this.onSetManualLocation())}
            {this.button('Clear manual location', (): void => this.onClearManualLocation())}
        </View>;
    }

    textInput(text: string, value: string | undefined, onChange: (str: string) => void): JSX.Element {
        return <View style={{ flex: 1, flexDirection: 'row' }} >
            <Text style={{ flex: 0.3 }}>{text}</Text>
            <TextInput style={{ flex: 0.7, height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={onChange}
                value={value}
            />
        </View>;
    }

    button(text: string, onPress: () => void): JSX.Element {
        return <MultiLineButtonComponent onPress={(): void => onPress()}>
            <Text style={textStyles.button}>{text}</Text>
        </MultiLineButtonComponent>;
    }
}

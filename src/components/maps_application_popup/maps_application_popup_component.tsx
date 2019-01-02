// tslint:disable no-class no-this no-expression-statement
import React from 'react';
import { View, Text, Icon, Button } from 'native-base';
import { Popup } from 'react-native-map-link';
import { Trans } from '@lingui/react';
import { textStyles, colors, values, applicationStyles } from '../../application/styles';

interface MapsApplicationPopupProps {
    readonly latitude: number;
    readonly longitude: number;
    readonly locationTitle?: string;
}

interface State {
    readonly isVisible: boolean;
}

export class MapsApplicationPopupComponent extends React.Component<MapsApplicationPopupProps, State> {
    constructor(props: MapsApplicationPopupProps) {
        super(props);
        this.state = {
            isVisible: false,
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    render(): JSX.Element {
        return (
            <View>
                <Popup
                    isVisible={this.state.isVisible}
                    onCancelPressed={this.close}
                    onAppPressed={this.close}
                    onBackButtonPressed={this.close}
                    modalProps={{
                        animationIn: 'slideInUp',
                        onBackdropPress: this.close,
                    }}
                    appsWhiteList={['apple-maps', 'google-maps']}
                    options={{
                        title: this.props.locationTitle,
                        latitude: this.props.latitude,
                        longitude: this.props.longitude,
                    }}
                />
                <Button onPress={this.open} iconLeft style={applicationStyles.orangeButton}>
                    <Icon
                        type={'FontAwesome'}
                        name={'map-marker'}
                        style={{
                            color: colors.white,
                            fontSize: values.smallIconSize,
                        }}
                    />
                    <Text style={textStyles.button}><Trans>Open in map</Trans></Text>
                </Button>
            </View>
        );
    }

    open(): void {
        this.setState({ isVisible: true });
    }

    close(): void {
        this.setState({ isVisible: false });
    }
}

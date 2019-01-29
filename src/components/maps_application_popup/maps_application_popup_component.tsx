// tslint:disable no-class no-this no-expression-statement
import React from 'react';
import { View, Text, Icon, Button } from 'native-base';
import { showLocation } from 'react-native-map-link';
import { Trans } from '@lingui/react';
import { textStyles, colors, values, applicationStyles } from '../../application/styles';

interface MapsApplicationPopupProps {
    readonly latitude: number;
    readonly longitude: number;
    readonly locationTitle?: string;
}

export const MapsApplicationPopupComponent: React.StatelessComponent<MapsApplicationPopupProps> =
    (props: MapsApplicationPopupProps): JSX.Element => (
        <View>
            <Button
                onPress={(): Promise<void> =>
                    showLocation({
                        title: props.locationTitle,
                        latitude: props.latitude,
                        longitude: props.longitude,
                        appsWhiteList: ['apple-maps', 'google-maps'],
                    }).catch((): void => alert('Supported applications include Apple or Google maps.'))
                }
                iconLeft
                style={applicationStyles.tealButton}
            >
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

// tslint:disable no-class no-this no-expression-statement
import React from 'react';
import { View, Text, Icon, Button } from 'native-base';
import { Trans } from '@lingui/react';
import { textStyles, colors, values, applicationStyles } from '../../application/styles';
import { openInMapsApplication } from './open_in_maps_application';

interface MapsApplicationPopupProps {
    readonly latitude: number;
    readonly longitude: number;
    readonly currentPathForAnalytics: string;
    readonly linkContextForAnalytics: string;
    readonly locationTitle?: string;
}

export const MapsApplicationPopupComponent: React.StatelessComponent<MapsApplicationPopupProps> =
    (props: MapsApplicationPopupProps): JSX.Element => {

        const icon = <Icon
            type={'FontAwesome'} name={'map-marker'}
            style={{ color: colors.white, fontSize: values.smallIconSize }}
        />;

        const text = <Text style={textStyles.button} uppercase={false}><Trans>Open in maps</Trans></Text>;

        const onPress = openInMapsApplication(
            props.locationTitle,
            props.latitude,
            props.longitude,
            props.currentPathForAnalytics,
            props.linkContextForAnalytics,
        );

        const button = (
            <Button onPress={onPress} iconLeft style={applicationStyles.tealButton} >
                {icon}{text}
            </Button>
        );

        return <View>{button}</View>;
    };

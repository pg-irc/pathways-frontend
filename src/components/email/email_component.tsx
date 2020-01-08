// tslint:disable:no-expression-statement
import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';
import { Trans } from '@lingui/react';
import { CardButtonComponent } from '../card_button/card_button_component';
import { DividerComponent } from '../content_layout/divider_component';
import { textStyles, colors, values } from '../../application/styles';
import { openURL, LinkTypes } from '../link/link';
import { sendLinkPressedEvent } from '../../sagas/analytics/events';

interface Props {
    readonly email: string;
    readonly linkContextForAnalytics: string;
    readonly currentPathForAnalytics: string;
}

export const EmailComponent = (props: Props): JSX.Element => (
    <View>
        <CardButtonComponent
            leftContent={(
                <View>
                    <Text style={textStyles.paragraphBoldBlackLeft}><Trans>Email</Trans>: </Text>
                    <Text style={textStyles.paragraphStyle}>{props.email}</Text>
                </View>)
            }
            rightContent={
                <Icon
                    name={'envelope'}
                    type={'FontAwesome'}
                    style={{ color: colors.teal, fontSize: values.smallIconSize, paddingRight: 10 }}
                />
            }
            onPress={getOnPressForEmail(props.email, props.currentPathForAnalytics, props.linkContextForAnalytics)}
        />
        <DividerComponent />
    </View>
);

const getOnPressForEmail = (email: string, currentPathForAnalytics: string, linkContextForAnalytics: string): () => void => {
    const linkValue = 'mailto:' + email;
    const onPress = (): void => {
        sendLinkPressedEvent(currentPathForAnalytics, linkContextForAnalytics, LinkTypes.email, email);
        openURL(linkValue);
    };
    return onPress;
};

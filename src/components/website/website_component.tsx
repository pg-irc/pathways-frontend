// tslint:disable:no-expression-statement
import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';
import { Trans } from '@lingui/react';
import { CardButtonComponent } from '../card_button/card_button_component';
import { textStyles, colors, values } from '../../application/styles';
import { openURL, LinkTypes } from '../link/link';
import { sendLinkPressedEvent } from '../../sagas/analytics/events';

interface Props {
    readonly website: string;
    readonly linkContextForAnalytics: string;
    readonly currentPathForAnalytics: string;
}

export const WebsiteComponent = (props: Props): JSX.Element => (
    <View>
        <CardButtonComponent
            leftContent={(
                <View>
                    <Text style={textStyles.paragraphBoldBlackLeft}><Trans>Website</Trans>: </Text>
                    <Text style={textStyles.paragraphStyle}>{props.website}</Text>
                </View>)
            }
            rightContent={
                <Icon
                    name={'external-link'}
                    type={'FontAwesome'}
                    style={{ color: colors.teal, fontSize: values.smallIconSize, paddingRight: 10 }}
                />
            }
            onPress={getOnPressForWebsite(props.website, props.currentPathForAnalytics, props.linkContextForAnalytics)}
        />
    </View>
);

const getOnPressForWebsite = (website: string, currentPathForAnalytics: string, linkContextForAnalytics: string): () => void => {
    const onPress = (): void => {
        sendLinkPressedEvent(currentPathForAnalytics, linkContextForAnalytics, LinkTypes.website, website);
        openURL(website);
    };
    return onPress;
}

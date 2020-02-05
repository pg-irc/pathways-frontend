// tslint:disable:no-expression-statement
import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';
import { Trans } from '@lingui/react';
import { CardButtonComponent } from '../card_button/card_button_component';
import { DividerComponent } from '../content_layout/divider_component';
import { textStyles, colors, values } from '../../application/styles';
import { openURL, LinkTypes } from '../link/link';
import { AnalyticsLinkPressedAction } from '../../stores/analytics';

interface Props {
    readonly email: string;
    readonly linkContextForAnalytics: string;
    readonly currentPathForAnalytics: string;
    readonly analyticsLinkPressed: (currentPath: string, linkContext: string, linkType: string, linkValue: string) => AnalyticsLinkPressedAction;
}

export const EmailComponent = (props: Props): JSX.Element => {
    const onPress = (): void => {
        const linkValue = 'mailto:' + props.email;
        props.analyticsLinkPressed(props.currentPathForAnalytics, props.linkContextForAnalytics, LinkTypes.email, props.email);
        openURL(linkValue);
    };
    return (
        <View>
            <CardButtonComponent
                leftContent={renderEmail(props.email)}
                rightContent={renderIcon()}
                onPress={onPress}
            />
            <DividerComponent />
    </View>
    );
};

const renderEmail = (email: string): JSX.Element => (
    <View>
        <Text style={textStyles.paragraphBoldBlackLeft}><Trans>Email</Trans>: </Text>
        <Text style={textStyles.paragraphStyle}>{email}</Text>
    </View>
);

const renderIcon = (): JSX.Element => (
    <Icon
        name={'envelope'}
        type={'FontAwesome'}
        style={{ color: colors.teal, fontSize: values.smallIconSize, paddingRight: 10 }}
    />
);

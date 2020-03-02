// tslint:disable:no-expression-statement
import React from 'react';
import { View, Text } from 'react-native';
import { Trans } from '@lingui/react';
import { CardButtonComponent } from '../card_button/card_button_component';
import { DividerComponent } from '../content_layout/divider_component';
import { textStyles } from '../../application/styles';
import { openURL, LinkTypes } from '../link/link';
import { AnalyticsLinkPressedAction } from '../../stores/analytics';
import { ServiceDetailIconComponent } from '../services/service_detail_icon';
import { isServiceDetailStringEmpty } from '../services/is_service_detail_empty';
import { MissingServiceDetailComponent } from '../services/missing_service_detail_component';

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

    if (isServiceDetailStringEmpty(props.email)) {
        return <MissingServiceDetailComponent title={<Trans>Email</Trans>} />;
    }

    return (
        <View>
            <CardButtonComponent
                leftContent={renderEmail(props.email)}
                rightContent={<ServiceDetailIconComponent name={'envelope'} />}
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
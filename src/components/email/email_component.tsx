// tslint:disable:no-expression-statement
import React from 'react';
import { View, Text } from 'react-native';
import { Trans } from '@lingui/react';
import { CardButtonComponent } from '../card_button_component';
import { textStyles } from '../../application/styles';
import { openURL, LinkTypes } from '../link/link_component';
import { AnalyticsLinkPressedAction, AnalyticsLinkProps } from '../../stores/analytics';
import { ServiceDetailIconComponent } from '../services/service_detail_icon';
import { isServiceDetailStringEmpty } from '../services/is_service_detail_empty';
import { MissingServiceDetailComponent } from '../services/missing_service_detail_component';

interface Props {
    readonly email: string;
    readonly linkContextForAnalytics: string;
    readonly currentPathForAnalytics: string;
    readonly analyticsLinkPressed: (analyticsLinkProps: AnalyticsLinkProps) => AnalyticsLinkPressedAction;
}

export const EmailComponent = (props: Props): JSX.Element => {
    const onPress = (): void => {
        const linkValue = 'mailto:' + props.email;
        const analyticsLinkProps: AnalyticsLinkProps = {
            currentPath: props.currentPathForAnalytics,
            linkContext: props.linkContextForAnalytics,
            linkType: LinkTypes.email,
            linkValue: linkValue
        }
        props.analyticsLinkPressed(analyticsLinkProps);
        openURL(linkValue);
    };

    if (isServiceDetailStringEmpty(props.email)) {
        return <MissingServiceDetailComponent title={<Trans>Email:</Trans>} />;
    }

    return (
        <View>
            <CardButtonComponent
                leftContent={renderEmail(props.email)}
                rightContent={<ServiceDetailIconComponent name={'envelope'} />}
                onPress={onPress}
            />
        </View>
    );
};

const renderEmail = (email: string): JSX.Element => (
    <View style={{marginHorizontal: 5}}>
        <Text style={textStyles.paragraphBoldBlackLeft}><Trans>Email:</Trans> </Text>
        <Text style={textStyles.paragraphStyle}>{email}</Text>
    </View>
);

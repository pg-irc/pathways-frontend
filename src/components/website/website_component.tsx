// tslint:disable:no-expression-statement
import React from 'react';
import { View, Text } from 'react-native';
import { Trans } from '@lingui/react';
import { CardButtonComponent } from '../card_button_component';
import { textStyles } from '../../application/styles';
import { openURL, LinkTypes } from '../link/link';
import { AnalyticsLinkPressedAction } from '../../stores/analytics';
import { ServiceDetailIconComponent } from '../services/service_detail_icon';
import { isServiceDetailStringEmpty } from '../services/is_service_detail_empty';
import { MissingServiceDetailComponent } from '../services/missing_service_detail_component';

interface Props {
    readonly website: string;
    readonly linkContextForAnalytics: string;
    readonly currentPathForAnalytics: string;
    readonly analyticsLinkPressed: (currentPath: string, linkContext: string, linkType: string, linkValue: string) => AnalyticsLinkPressedAction;
}

export const WebsiteComponent = (props: Props): JSX.Element => {
    const onPress = (): void => {
        props.analyticsLinkPressed(props.currentPathForAnalytics, props.linkContextForAnalytics, LinkTypes.website, props.website);
        openURL(props.website);
    };

    if (isServiceDetailStringEmpty(props.website)) {
        return <MissingServiceDetailComponent title={<Trans>Website:</Trans>} />;
    }

    return (
        <View>
            <CardButtonComponent
                leftContent={renderWebsite(props.website)}
                rightContent={<ServiceDetailIconComponent name={'external-link'} />}
                onPress={onPress}
            />
        </View>
    );
};

const renderWebsite = (website: string): JSX.Element => (
    <View>
        <Text style={textStyles.paragraphBoldBlackLeft}><Trans>Website:</Trans> </Text>
        <Text style={textStyles.paragraphStyle}>{website}</Text>
    </View>
);

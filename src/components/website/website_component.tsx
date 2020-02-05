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
    return (
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
                onPress={onPress}
            />
            <DividerComponent />
        </View>
    );
};
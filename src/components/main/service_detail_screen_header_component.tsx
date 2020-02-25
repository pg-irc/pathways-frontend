import React from 'react';
import * as R from 'ramda';
import { Locale } from '../../locale';
import { Id } from '../../stores/services';
import { HumanServiceData } from '../../validation/services/types';
import { BookmarkServiceAction, UnbookmarkServiceAction, OpenDiscardFeedbackModalAction } from '../../stores/services/actions';
import { HeaderOwnProps } from './header_component';
import { getParametersFromPath, Routes } from '../../application/routing';
import { BackButtonComponent, getIconForBackButton } from '../header_button/back_button_component';
import { colors, textStyles } from '../../application/styles';
import { BookmarkButtonComponent } from '../bookmark_button/bookmark_button_component';
import { MenuButtonComponent } from '../header_button/menu_button_component';
import { renderHeader } from './render_header';
import { Trans } from '@lingui/react';
import { Text, View, Icon, Header, Right } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CloseButtonComponent } from '../close_button/close_button_component';
import { getStatusBarHeightForPlatform } from './get_status_bar_height_for_platform';

export interface ServiceDetailScreenHeaderProps {
    readonly currentLocale: Locale;
    readonly bookmarkedServicesIds: ReadonlyArray<Id>;
    readonly service: HumanServiceData;
    readonly feedbackEnabled: boolean;
}

export interface ServiceDetailScreenHeaderActions {
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly openDiscardFeedbackModal: () => OpenDiscardFeedbackModalAction;
}

type Props = ServiceDetailScreenHeaderProps & ServiceDetailScreenHeaderActions & HeaderOwnProps;

export const ServiceDetailScreenHeaderComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const params = getParametersFromPath(props.location, Routes.ServiceDetail);
    const serviceId = params.serviceId;
    const backgroundColor = colors.lightGrey;
    const leftButton = <BackButtonComponent history={props.history} textColor={colors.black} />;
    const rightButtons: ReadonlyArray<JSX.Element> = [
        <BookmarkButtonComponent
            isBookmarked={R.contains(serviceId, props.bookmarkedServicesIds)}
            bookmark={(): BookmarkServiceAction => props.bookmarkService(props.service)}
            unbookmark={(): UnbookmarkServiceAction => props.unbookmarkService(props.service)}
            textColor={colors.teal}
        />,
        <MenuButtonComponent
            onPress={props.openMenu}
            locale={props.currentLocale}
            textColor={colors.black}
        />,
    ];

    if (!props.feedbackEnabled) {
        return renderHeader({ backgroundColor, leftButton, rightButtons });
    }
    return <FeedbackHeaderComponent {...props}/>;
};

const FeedbackHeaderComponent = (props: Props): JSX.Element => {
    const marginTop = getStatusBarHeightForPlatform();
    return (
        <Header style={{ marginTop, backgroundColor: colors.white }}>
            <FeedbackBackButtonComponent {...props}/>
            <Right>
                <CloseButtonComponent onPress={props.openDiscardFeedbackModal} color={colors.black} additionalStyle={{ paddingTop: 0 }}/>
            </Right>
        </Header>
    );
};

const FeedbackBackButtonComponent = (props: Props): JSX.Element => (
    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity style={{ paddingRight: 10}} onPress={props.openDiscardFeedbackModal}>
            <Icon name={getIconForBackButton()} style={{ color: colors.teal, fontWeight: 'bold' }} />
        </TouchableOpacity>
        <Text style={[textStyles.headlineH3StyleBlackLeft, { color: colors.teal }]}>
            <Trans>Change name or other details</Trans>
        </Text>
    </View>
);
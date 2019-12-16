import React from 'react';
import * as R from 'ramda';
import { Locale } from '../../locale';
import { Id } from '../../stores/services';
import { HumanServiceData } from '../../validation/services/types';
import { BookmarkServiceAction, UnbookmarkServiceAction } from '../../stores/services/actions';
import { HeaderOwnProps, renderHeader } from './header_component';
import { getParametersFromPath, Routes } from '../../application/routing';
import { BackButtonComponent } from '../header_button/back_button_component';
import { colors } from '../../application/styles';
import { BookmarkButtonComponent } from '../bookmark_button/bookmark_button_component';
import { MenuButtonComponent } from '../header_button/menu_button_component';

export interface ServiceDetailScreenHeaderProps {
    readonly currentLocale: Locale;
    readonly bookmarkedServicesIds: ReadonlyArray<Id>;
    readonly service: HumanServiceData;
}

export interface ServiceDetailScreenHeaderActions {
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
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
    return renderHeader({ backgroundColor, leftButton, rightButtons });
};
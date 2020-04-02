import React from 'react';
import * as R from 'ramda';
import { History } from 'history';
import { Trans } from '@lingui/react';
import { View, Text } from 'react-native';
import { Content } from 'native-base';
import { values, textStyles, colors } from '../../application/styles';
import { Id } from '../../stores/services';
import { HumanServiceData } from '../../validation/services/types';
import { DescriptorComponent } from '../content_layout/descriptor_component';
import { TitleComponent } from '../content_layout/title_component';
import { MarkdownBodyComponent } from '../content_layout/markdown_body_component';
import { DividerComponent } from '../content_layout/divider_component';
import { RouterProps, getParametersFromPath, Routes } from '../../application/routing';
import { ContentVerificationComponent } from '../content_verification_component';
import { AddressesComponent } from '../addresses/addresses_component';
import { PhoneNumbersComponent } from '../phone_numbers/phone_numbers_component';
import { WebsiteComponent } from '../website/website_component';
import { filterPhysicalAddresses } from '../addresses/filter_physical_addresses';
import { buildAnalyticsLinkContext } from '../../sagas/analytics/events';
import { buildServiceName } from '../services//build_service_name';
import { getLocationTitleFromAddresses } from '../services/get_location_title_from_addresses';
import { EmailComponent } from '../email/email_component';
import { AnalyticsLinkPressedAction } from '../../stores/analytics';
import { BackButtonComponent } from '../header_button/back_button_component';
import { BookmarkButtonComponent } from '../bookmark_button_component';
import { MenuButtonComponent } from '../header_button/menu_button_component';
import { BookmarkServiceAction, UnbookmarkServiceAction } from '../../stores/services/actions';
import { OpenHeaderMenuAction } from '../../stores/header_menu';
import { renderHeader } from '../main/render_header';

export interface ServiceDetailProps {
    readonly history: History;
    readonly service: HumanServiceData;
    readonly bookmarkedServicesIds: ReadonlyArray<Id>;
}

export interface ServiceDetailActions {
    readonly analyticsLinkPressed: (currentPath: string, linkContext: string, linkType: string, linkValue: string) => AnalyticsLinkPressedAction;
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
}

type Props = ServiceDetailProps & ServiceDetailActions & RouterProps;

export const ServiceDetailComponent = (props: Props): JSX.Element => {
    return (
        <View style={{ flex: 1 }}>
            <HeaderComponent {...props} />
            <Content padder style={{ flex: 1 }}>
                <DescriptorComponent descriptor={<Trans>SERVICE</Trans>} />
                <TitleComponent title={props.service.name} />
                <ServiceOrganization history={props.history} name={props.service.organizationName} />
                <MarkdownBodyComponent body={props.service.description} shouldBeExpandable={true} />
                <DividerComponent />
                <ServiceContactDetails {...props}/>
            </Content>
        </View>
    );
};

const HeaderComponent = (props: Props): JSX.Element => {
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
            onPress={props.openHeaderMenu}
            textColor={colors.black}
        />,
    ];
    return renderHeader({ backgroundColor, leftButton, rightButtons });
};

const ServiceOrganization = (props: { readonly history: History, readonly name: string }): JSX.Element => (
    <View style={{ paddingHorizontal: values.backgroundTextPadding }}>
        <DividerComponent />
        <View>
            <Text style={textStyles.paragraphBoldBlackLeft}><Trans>Provided by:</Trans> </Text>
            <Text style={textStyles.paragraphStyle}>{props.name}</Text>
        </View>
        <DividerComponent />
    </View>
);

const ServiceContactDetails = (props: Props): JSX.Element => {
    const serviceName = buildServiceName(props.service.organizationName, props.service.name);
    const linkContextForAnalytics = buildAnalyticsLinkContext('Service', serviceName);
    const currentPathForAnalytics = props.location.pathname;

    return (
        <View style={{ paddingHorizontal: values.backgroundTextPadding }}>
            <AddressesComponent
                addresses={filterPhysicalAddresses(props.service.addresses)}
                latLong={props.service.latlong}
                linkContextForAnalytics={linkContextForAnalytics}
                currentPathForAnalytics={currentPathForAnalytics}
                locationTitle={getLocationTitleFromAddresses(filterPhysicalAddresses(props.service.addresses))}
                analyticsLinkPressed={props.analyticsLinkPressed}
            />
            <PhoneNumbersComponent
                phoneNumbers={props.service.phoneNumbers}
                linkContextForAnalytics={linkContextForAnalytics}
                currentPathForAnalytics={currentPathForAnalytics}
                analyticsLinkPressed={props.analyticsLinkPressed}
            />
            <WebsiteComponent
                website={props.service.website}
                linkContextForAnalytics={linkContextForAnalytics}
                currentPathForAnalytics={currentPathForAnalytics}
                analyticsLinkPressed={props.analyticsLinkPressed}
            />
            <EmailComponent
                email={props.service.email}
                linkContextForAnalytics={linkContextForAnalytics}
                currentPathForAnalytics={currentPathForAnalytics}
                analyticsLinkPressed={props.analyticsLinkPressed}
            />
            <ContentVerificationComponent verificationDate={'N/A'} />
        </View>
    );
 };

import React from 'react';
import * as R from 'ramda';
import { textStyles, colors } from '../../application/styles';
import { HumanServiceData, PhoneNumber, Address } from '../../validation/services/types';
import { View } from 'native-base';
import { Text, TouchableOpacity } from 'react-native';
import { TextWithPhoneLinks } from '../link/text_with_phone_links';
import { mapWithIndex } from '../../application/map_with_index';
import { ExpandableContentComponent } from '../expandable_content/expandable_content_component';
import { Trans } from '@lingui/react';
import { MapsApplicationPopupComponent } from '../maps_application_popup/maps_application_popup_component';
import { EmptyComponent } from '../empty_component/empty_component';
import { getLocationTitleFromAddresses } from './get_location_title_from_addresses';
import { AnalyticsLink, LinkTypes } from '../link/link';
import { buildAnalyticsLinkContext } from '../../sagas/analytics/events';
import { filterPhysicalAddresses } from '../addresses/filter_physical_addresses';
import { AddServiceToSavedListAction, RemoveServiceFromSavedListAction } from '../../stores/services/actions';
import { BookmarkButtonComponent } from '../bookmark_button/bookmark_button_component';
import { History } from 'history';

export interface ServiceListItemProps {
    readonly service: HumanServiceData;
    readonly currentPath: string;
    readonly onPress: () => void;
    readonly history?: History;
    readonly isBookmarked: boolean;
}

export interface ServiceListItemActions {
    readonly addServiceToSavedList: (service: HumanServiceData) => AddServiceToSavedListAction;
    readonly removeServiceFromSavedList: (service: HumanServiceData) => RemoveServiceFromSavedListAction;
}

type Props = ServiceListItemProps & ServiceListItemActions;

export const ServiceListItemComponent: React.StatelessComponent<Props> =
    (props: Props): JSX.Element => {
        const serviceName = buildServiceName(props.service.organizationName, props.service.name);
        const linkContext = buildAnalyticsLinkContext('Service', serviceName);
        return (
            <View style={{ backgroundColor: colors.white, padding: 10, marginTop: 10 }}>
                <BookmarkButtonComponent isBookmarked={props.isBookmarked} textColor={colors.teal}
                    addBookmark={(): AddServiceToSavedListAction => props.addServiceToSavedList(props.service)}
                    removeBookmark={(): RemoveServiceFromSavedListAction => props.removeServiceFromSavedList(props.service)}
                    />
                {renderName(serviceName, props.onPress)}
                {renderDescription(props.service.description)}
                {renderAddresses(filterPhysicalAddresses(props.service.addresses))}
                {renderPhoneNumbers(props.service.phoneNumbers, props.currentPath, linkContext)}
                {renderWebsite(props.service.website, props.currentPath, linkContext)}
                {renderEmail(props.service.email, props.currentPath, linkContext)}
                {renderMapButtonIfLocation(props.service, props.currentPath, linkContext)}
            </View>
        );
    };

const buildServiceName = (organizationName: string, serviceName: string): string => (
    `${organizationName} - ${serviceName}`
);

const renderName = (name: string, onPress: () => void): JSX.Element => (
    <TouchableOpacity onPress={onPress}>
        <Text style={[textStyles.headlineH3StyleURL, textStyles.alwaysLeftAlign]}>{name}</Text>
    </TouchableOpacity>
);

const renderDescription = (description: string): JSX.Element => {
    const content = <Text style={textStyles.alwaysLeftParagraphStyle}> {description}</Text>;
    return (
        <ExpandableContentComponent content={content} />
    );
};

// tslint:disable-next-line:typedef
const renderAddresses = (physicalAddresses: ReadonlyArray<Address>) => (
    mapWithIndex((address: Address, index: number) =>
        <View key={index} style={{ marginTop: 10 }}>
            <Text style={textStyles.paragraphBoldBlackLeft}><Trans>Address:</Trans></Text>
            <Text style={textStyles.paragraphStyle}>{address.address}</Text>
            <Text style={textStyles.paragraphStyle}>
                {address.city} {address.stateProvince} {address.postalCode ? address.postalCode : ''}
            </Text>
        </View>, physicalAddresses)
);

// tslint:disable-next-line:typedef
const renderPhoneNumbers = (phoneNumbers: ReadonlyArray<PhoneNumber>, currentPath: string, linkContext: string) => (
    mapWithIndex((phoneNumber: PhoneNumber, index: number): JSX.Element => {
        const fieldLabel = capitalizeFirstLetter(phoneNumber.type);
        const textWithPhoneLinks = (
            <TextWithPhoneLinks
                text={phoneNumber.phone_number}
                currentPath={currentPath}
                linkContext={linkContext}
                linkType={fieldLabel} />
        );
        return (
            <View key={index} style={{ marginTop: 10 }} >
                <Text style={textStyles.paragraphBoldBlackLeft}>
                    {fieldLabel}: {textWithPhoneLinks}
                </Text>
            </View>
        );
    }, phoneNumbers)
);

const renderWebsite = (website: string, currentPath: string, linkContext: string): JSX.Element => {
    if (R.not(website)) {
        return <EmptyComponent />;
    }

    const label = <Text style={textStyles.paragraphBoldBlackLeft}><Trans>Web:</Trans></Text>;
    const link = <AnalyticsLink href={website} currentPath={currentPath} linkContext={linkContext}
        linkType={LinkTypes.website} style={textStyles.paragraphStyle}>{website}</AnalyticsLink>;

    return <Text style={{ marginTop: 10 }}>{label}{link}</Text>;
};

const renderEmail = (email: string, currentPath: string, linkContext: string): JSX.Element => {
    if (R.not(email)) {
        return <EmptyComponent />;
    }

    const label = <Text style={textStyles.paragraphBoldBlackLeft}><Trans>Email:</Trans> </Text>;
    const link = <AnalyticsLink href={`mailto: ${email}`} currentPath={currentPath} linkContext={linkContext}
        linkType={LinkTypes.email} style={textStyles.paragraphStyle} >{email}</AnalyticsLink>;

    return <Text style={{ marginTop: 10 }}>{label}{link}</Text>;
};

const renderMapButtonIfLocation = (service: HumanServiceData, currentPath: string, linkContext: string): JSX.Element => {
    if (R.not(service.latlong)) {
        return <EmptyComponent />;
    }
    return (
        <View style={{ marginTop: 10, flexDirection: 'row' }}>
            <MapsApplicationPopupComponent
                latitude={service.latlong.lat}
                longitude={service.latlong.lng}
                locationTitle={getLocationTitleFromAddresses(filterPhysicalAddresses(service.addresses))}
                currentPathForAnalytics={currentPath}
                linkContextForAnalytics={linkContext}
            />
        </View>
    );
};

const capitalizeFirstLetter = (s: string): string => (
    s.charAt(0).toUpperCase() + s.slice(1)
);

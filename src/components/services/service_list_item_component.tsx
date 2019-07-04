import React from 'react';
import * as R from 'ramda';
import { textStyles, colors } from '../../application/styles';
import { Service, PhoneNumber, Address } from '../../stores/services';
import { View } from 'native-base';
import { Text, I18nManager } from 'react-native';
import { TextWithPhoneLinks } from '../link/text_with_phone_links';
import { mapWithIndex } from '../../application/map_with_index';
import { ExpandableContentComponent } from '../expandable_content/expandable_content_component';
import { MapsApplicationPopupComponent } from '../maps_application_popup/maps_application_popup_component';
import { EmptyComponent } from '../empty_component/empty_component';
import { getLocationTitleFromAddresses } from './get_location_title_from_addresses';
import { AnalyticsLink } from '../link/link';
import { buildLinkContext } from '../../sagas/analytics/events';

interface ServiceListItemProps {
    readonly service: Service;
    readonly currentPath: string;
}

export const ServiceListItemComponent: React.StatelessComponent<ServiceListItemProps> =
    (props: ServiceListItemProps): JSX.Element => {
        const serviceName = buildServiceName(props.service.organizationName, props.service.name);
        const linkContext = buildLinkContext('Service', serviceName);
        return (
            <View style={{ backgroundColor: colors.white, padding: 10, marginTop: 10 }}>
                {renderName(serviceName)}
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

const renderName = (name: string): JSX.Element => (
    <Text style={[textStyles.headlineH3StyleBlackLeft, textStyles.alwaysLeftAlign]}>{name}</Text>
);

const renderDescription = (description: string): JSX.Element => {
    return <ExpandableContentComponent
        forceEnglish={true}
        content={<Text style={textStyles.alwaysLeftParagraphStyle} > {description}</ Text>}
    />;
};

const filterPhysicalAddresses = R.filter(R.propEq('type', 'physical_address'));

// tslint:disable-next-line:typedef
const renderAddresses = (physicalAddresses: ReadonlyArray<Address>) => (
    mapWithIndex((address: Address, index: number) =>
        <View key={index}>
            <Text style={[textStyles.paragraphBoldBlackLeft, textStyles.alwaysLeftAlign]}>Address:</Text>
            <Text style={textStyles.alwaysLeftParagraphStyle}>{address.address}</Text>
            <Text style={textStyles.alwaysLeftParagraphStyle}>
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
                text={phoneNumber.phoneNumber}
                currentPath={currentPath}
                linkContext={linkContext}
                linkType={fieldLabel} />
        );
        return (
            <View key={index} style={{ paddingVertical: 10 }} >
                <Text style={[textStyles.paragraphBoldBlackLeft, textStyles.alwaysLeftAlign]}>
                    {fieldLabel} {textWithPhoneLinks}
                </Text>
            </View>
        );
    }, phoneNumbers)
);

const renderWebsite = (website: string, currentPath: string, linkContext: string): JSX.Element => {
    if (R.not(website)) {
        return <EmptyComponent />;
    }

    const label = <Text style={textStyles.paragraphBoldBlackLeft}>Web: </Text>;
    const link = <AnalyticsLink href={website} currentPath={currentPath} linkContext={linkContext}
        linkType={'Website'} style={textStyles.paragraphStyle}>{website}</AnalyticsLink>;

    return <Text>{label}{link}</Text>;
};

const renderEmail = (email: string, currentPath: string, linkContext: string): JSX.Element => {
    if (R.not(email)) {
        return <EmptyComponent />;
    }

    const label = <Text style={textStyles.paragraphBoldBlackLeft}>Email: </Text>;
    const link = <AnalyticsLink href={`mailto: ${email}`} currentPath={currentPath} linkContext={linkContext}
        linkType={'Email'} style={textStyles.paragraphStyle} >{email}</AnalyticsLink>;

    return <Text>{label}{link}</Text>;
};

const renderMapButtonIfLocation = (service: Service, currentPath: string, linkContext: string): JSX.Element => {
    if (R.not(service.latitude && service.longitude)) {
        return <EmptyComponent />;
    }
    const justifyContent = I18nManager.isRTL ? 'flex-end' : 'flex-start';
    return (
        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent }}>
            <MapsApplicationPopupComponent
                latitude={service.latitude}
                longitude={service.longitude}
                locationTitle={getLocationTitleFromAddresses(filterPhysicalAddresses(service.addresses))}
                currentPath={currentPath}
                linkContext={linkContext}
            />
        </View>
    );
};

const capitalizeFirstLetter = (s: string): string => (
    s.charAt(0).toUpperCase() + s.slice(1)
);

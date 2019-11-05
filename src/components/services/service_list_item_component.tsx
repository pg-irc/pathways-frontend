import React from 'react';
import * as R from 'ramda';
import { textStyles, colors } from '../../application/styles';
import { Service, PhoneNumber, Address } from '../../stores/services';
import { View } from 'native-base';
import { Text } from 'react-native';
import { TextWithPhoneLinks } from '../link/text_with_phone_links';
import { mapWithIndex } from '../../application/map_with_index';
import { ExpandableContentComponent } from '../expandable_content/expandable_content_component';
import { MapsApplicationPopupComponent } from '../maps_application_popup/maps_application_popup_component';
import { EmptyComponent } from '../empty_component/empty_component';
import { Link } from '../link/link';

interface ServiceListItemProps {
    readonly service: Service;
}

export const ServiceListItemComponent: React.StatelessComponent<ServiceListItemProps> =
    (props: ServiceListItemProps): JSX.Element => (
        <View style={{ backgroundColor: colors.white, padding: 10, marginTop: 10 }}>
            {renderName(props.service.name, props.service.organizationName)}
            {renderDescription(props.service.description)}
            {renderAddresses(filterPhysicalAddresses(props.service.addresses))}
            {renderPhoneNumbers(props.service.phoneNumbers)}
            {renderWebsite(props.service.website)}
            {renderEmail(props.service.email)}
            {renderMapButtonIfLocation(props.service)}
        </View>
    );

const renderName = (name: string, organizationName: string): JSX.Element => (
    <Text style={textStyles.headlineH3StyleBlackLeft}>{organizationName} - {name}</Text>
);

const renderDescription = (description: string): JSX.Element => (
    <ExpandableContentComponent forceEnglish={true} content={<Text style={textStyles.paragraphStyle}>{description}</Text>} />
);

const filterPhysicalAddresses = R.filter(R.propEq('type', 'physical_address'));

// tslint:disable-next-line:typedef
const renderAddresses = (physicalAddresses: ReadonlyArray<Address>) => (
    mapWithIndex((address: Address, index: number) =>
        <View key={index}>
            <Text style={textStyles.paragraphBoldBlackLeft}>Address:</Text>
            <Text style={textStyles.paragraphStyle}>{address.address}</Text>
            <Text style={textStyles.paragraphStyle}>
                {address.city} {address.stateProvince} {address.postalCode ? address.postalCode : ''}
            </Text>
        </View>, physicalAddresses)
);

// tslint:disable-next-line:typedef
const renderPhoneNumbers = (phoneNumbers: ReadonlyArray<PhoneNumber>) => (
    (mapWithIndex((phoneNumber: PhoneNumber, index: number): JSX.Element => (
        <View key={index} style={{ paddingVertical: 10 }} >
            <Text>
                <Text style={textStyles.paragraphBoldBlackLeft}>
                    {capitalizeFirstLetter(phoneNumber.type)}:
            </Text> <TextWithPhoneLinks text={phoneNumber.phoneNumber} />
            </Text>
        </View>), phoneNumbers))
);

const renderWebsite = (website: string): JSX.Element => {
    if (R.not(website)) {
        return <EmptyComponent />;
    }
    return (
        <Text>
            <Text style={textStyles.paragraphBoldBlackLeft}>Web: </Text>
            <Link href={website} style={textStyles.paragraphStyle} >{website}</Link>
        </Text>
    );
};

const renderEmail = (email: string): JSX.Element => {
    if (R.not(email)) {
        return <EmptyComponent />;
    }
    return (
        <Text>
            <Text style={textStyles.paragraphBoldBlackLeft}>Email: </Text>
            <Link href={'mailto:' + email} style={textStyles.paragraphStyle} >{email}</Link>
        </Text>
    );
};

const renderMapButtonIfLocation = (service: Service): JSX.Element => {
    if (R.not(service.latitude && service.longitude)) {
        return <EmptyComponent />;
    }
    return (
        <View style={{ marginTop: 10 }}>
            <MapsApplicationPopupComponent
                latitude={service.latitude}
                longitude={service.longitude}
                locationTitle={getLocationTitleFromAddresses(filterPhysicalAddresses(service.addresses))}
            />
        </View>
    );
};

const getLocationTitleFromAddresses = (addresses: ReadonlyArray<Address>): string => {
    if (addresses.length !== 1) {
        return undefined;
    }
    return addresses[0].address === 'n/a' ? undefined : addresses[0].address;
};

const capitalizeFirstLetter = (s: string): string => (
    s.charAt(0).toUpperCase() + s.slice(1)
);

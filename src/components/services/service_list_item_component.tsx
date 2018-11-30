import React from 'react';
import * as R from 'ramda';
import { textStyles, colors, values } from '../../application/styles';
import { Service, PhoneNumber, Address } from '../../stores/services';
import { View } from 'native-base';
import { Text } from 'react-native';
import { TextWithPhoneLinks } from '../link/text_with_phone_links';
import { mapWithIndex } from '../../application/map_with_index';
import { ExpandableContentComponent } from '../expandable_content/expandable_content_component';
import { Trans } from '@lingui/react';

interface ServiceListItemProps {
    readonly service: Service;
}

export const ServiceListItemComponent: React.StatelessComponent<ServiceListItemProps> =
    (props: ServiceListItemProps): JSX.Element => (
        <View style={{ backgroundColor: colors.white, padding: 10, borderRadius: values.lessRoundedBorderRadius }}>
            {renderName(props.service.name)}
            {renderDescription(props.service.description)}
            {renderAddresses(filterPhysicalAddresses(props.service.addresses))}
            {renderPhoneNumbers(props.service.phoneNumbers)}
        </View>
    );

const renderName = (name: string): JSX.Element => (
    <Text style={textStyles.headlineH3StyleBlackLeft}>{name}</Text>
);

const renderDescription = (description: string): JSX.Element => (
    <ExpandableContentComponent content={<Text style={textStyles.paragraphStyle}>{description}</Text>} />
);

const filterPhysicalAddresses = R.filter(R.propEq('type', 'physical_address'));

// tslint:disable-next-line:typedef
const renderAddresses = (physicalAddresses: ReadonlyArray<Address>) => (
    mapWithIndex((address: Address, index: number) =>
        <View key={index}>
            <Text style={textStyles.paragraphBoldBlackLeft}><Trans>Address:</Trans></Text>
            <Text style={textStyles.paragraphStyle}>{address.address}</Text>
            <Text style={textStyles.paragraphStyle}>{address.city + ' ' + address.stateProvince + ' ' + address.postalCode}</Text>
        </View>, physicalAddresses)
);

// tslint:disable-next-line:typedef
const renderPhoneNumbers = (phoneNumbers: ReadonlyArray<PhoneNumber>) => (
    (mapWithIndex((phoneNumber: PhoneNumber, index: number): JSX.Element => (<View key={index}>
        <Text>
            <Text style={textStyles.paragraphBoldBlackLeft}>
                {capitalizeFirstLetter(phoneNumber.type)}:
            </Text> <TextWithPhoneLinks text={phoneNumber.phoneNumber} />
        </Text>
    </View>), phoneNumbers))
);

const capitalizeFirstLetter = (s: string): string => (
    s.charAt(0).toUpperCase() + s.slice(1)
);

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
    (props: ServiceListItemProps): JSX.Element => {
        const physicalAddresses = R.filter(R.propEq('type', 'physical_address'), props.service.addresses);
        const capitalizeFirstLetter = (phoneType: string): string => (
            phoneType.charAt(0).toUpperCase() + phoneType.slice(1)
        );

        return (
            <View style={{ backgroundColor: colors.white, padding: 10, borderRadius: values.lessRoundedBorderRadius }}>
                <Text style={textStyles.headlineH3StyleBlackLeft}>
                    {props.service.name}
                </Text>
                <ExpandableContentComponent content={<Text style={textStyles.paragraphStyle}>{props.service.description}</Text>} />
                {
                    mapWithIndex((address: Address, index: number) =>
                        <View key={index}>
                            <Text style={textStyles.paragraphBoldBlackLeft}><Trans>Address:</Trans></Text>
                            <Text style={textStyles.paragraphStyle}>{address.address}</Text>
                            <Text style={textStyles.paragraphStyle}>{address.city + ' ' + address.stateProvince + ' ' + address.postalCode}</Text>
                        </View>, physicalAddresses)
                }
                {
                    mapWithIndex((phoneNumber: PhoneNumber, index: number) =>
                        <View key={index}>
                            <Text>
                                <Text style={textStyles.paragraphBoldBlackLeft}>
                                    {capitalizeFirstLetter(phoneNumber.type)}:
                            </Text> <TextWithPhoneLinks text={phoneNumber.phoneNumber} />
                            </Text>
                        </View>, props.service.phoneNumbers)
                }
            </View>
        );
    };
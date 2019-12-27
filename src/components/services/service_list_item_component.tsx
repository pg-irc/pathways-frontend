import React from 'react';
import { textStyles, colors } from '../../application/styles';
import { HumanServiceData, Address } from '../../validation/services/types';
import { View, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { mapWithIndex } from '../../application/map_with_index';
import { Trans } from '@lingui/react';
import { filterPhysicalAddresses } from '../addresses/filter_physical_addresses';
import { BookmarkServiceAction, UnbookmarkServiceAction } from '../../stores/services/actions';
import { BookmarkButtonComponent } from '../bookmark_button/bookmark_button_component';
import { History } from 'history';

export interface ServiceListItemProps {
    readonly service: HumanServiceData;
    readonly currentPath: string;
    readonly onPress: () => void;
    readonly history: History;
    readonly isBookmarked: boolean;
}

export interface ServiceListItemActions {
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
}

type Props = ServiceListItemProps & ServiceListItemActions;

export const ServiceListItemComponent: React.StatelessComponent<Props> =
    (props: Props): JSX.Element => {
        const serviceName = buildServiceName(props.service.organizationName, props.service.name);
        const addBookmark = (): BookmarkServiceAction => props.bookmarkService(props.service);
        const removeBookmark = (): UnbookmarkServiceAction => props.unbookmarkService(props.service);
        return (
            <View style={{ backgroundColor: colors.white, marginTop: 10, paddingVertical: 15, flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 2, paddingLeft: 15}}>
                    {renderName(serviceName, props.onPress)}
                    {renderOrganizationName(props.service.organizationName)}
                    {renderAddresses(filterPhysicalAddresses(props.service.addresses))}
                    {renderDescription(props.service.description)}
                </View>
                <View>
                    <BookmarkButtonComponent isBookmarked={props.isBookmarked}
                    textColor={colors.teal}
                    bookmark={addBookmark}
                    unbookmark={removeBookmark}
                    />
                </View>
            </View>
        );
    };

const buildServiceName = (organizationName: string, serviceName: string): string => (
    `${organizationName} - ${serviceName}`
);

const renderName = (name: string, onPress: () => void): JSX.Element => (
    <TouchableOpacity onPress={onPress}>
        <Text style={[textStyles.headlineH3StyleBlackLeft]}>{name}</Text>
    </TouchableOpacity>
);

const renderOrganizationName = (name: string): JSX.Element => (
    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
        <Text style={textStyles.listItemDetail}>
            <Trans>Provided by</Trans>{' '}
        </Text>
        <TouchableOpacity>
        <Text style={[textStyles.listItemDetail, { color: 'teal', fontWeight: 'bold'} ]}>
            {name}
        </Text>
    </TouchableOpacity>
    </View>
);

const renderDescription = (description: string): JSX.Element => (
    <Text note numberOfLines={3} style={textStyles.listItemDetail }>
    {description}
    </Text>
);

// tslint:disable-next-line:typedef
const renderAddresses = (physicalAddresses: ReadonlyArray<Address>) => (
    mapWithIndex((address: Address, index: number) =>
        <View key={index} style={{ flex: 1, flexDirection: 'row'}}>
            <Text style={textStyles.listItemDetail}>
                {address.address}
            </Text>
            <Text style={textStyles.listItemDetail}>
                , {address.city} {address.stateProvince} {address.postalCode ? address.postalCode : ''}
            </Text>
        </View>, physicalAddresses)
);
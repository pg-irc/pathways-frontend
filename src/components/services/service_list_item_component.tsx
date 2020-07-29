import React from 'react';
import { textStyles, colors } from '../../application/styles';
import { HumanServiceData, Address } from '../../validation/services/types';
import { View, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { mapWithIndex } from '../../application/helpers/map_with_index';
import { filterPhysicalAddresses } from '../addresses/filter_physical_addresses';
import { History } from 'history';
import { BookmarkServiceAction, UnbookmarkServiceAction } from '../../stores/services/actions';
import { BookmarkButtonComponent } from '../bookmark_button_component';
import { buildServiceName } from './build_service_name';

export interface ServiceListItemProps {
    readonly service: HumanServiceData;
    readonly onPress: () => void;
    readonly history: History;
    readonly isBookmarked: boolean;
}

export interface ServiceListItemActions {
    readonly onBookmark: () => BookmarkServiceAction;
    readonly onUnbookmark: () => UnbookmarkServiceAction;
}

type Props = ServiceListItemProps & ServiceListItemActions;

export const ServiceListItemComponent = (props: Props): JSX.Element => {
        const serviceName = buildServiceName(props.service.organizationName, props.service.name);
        return (
            <TouchableOpacity onPress={props.onPress}>
                 <View style={{ backgroundColor: colors.white, paddingVertical: 15, flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 2, paddingLeft: 15}}>
                    {renderName(serviceName)}
                    {renderAddresses(filterPhysicalAddresses(props.service.addresses))}
                    {renderDescription(props.service.description)}
                    </View>
                    <View>
                        <BookmarkButtonComponent
                            isBookmarked={props.isBookmarked}
                            textColor={colors.teal}
                            bookmark={props.onBookmark}
                            unbookmark={props.onUnbookmark}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

const renderName = (name: string): JSX.Element => (
    <Text style={[textStyles.headlineH3StyleBlackLeft]}>{name}</Text>
);

const renderDescription = (description: string): JSX.Element => (
    <Text note numberOfLines={3} style={textStyles.listItemDetail }>
    {description}
    </Text>
);

// tslint:disable-next-line:typedef
const renderAddresses = (physicalAddresses: ReadonlyArray<Address>) => (
    mapWithIndex((address: Address, index: number): JSX.Element =>
        <View key={index} style={{ marginVertical: 10}}>
            <Text style={textStyles.listItemDetail}>
                {address.address}, {address.city} {address.stateProvince} {address.postalCode || ''}
            </Text>
        </View>, physicalAddresses)
);

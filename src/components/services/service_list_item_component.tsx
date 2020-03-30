import React from 'react';
import { textStyles, colors } from '../../application/styles';
import { HumanServiceData, Address } from '../../validation/services/types';
import { View, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { mapWithIndex } from '../../application/map_with_index';
import { filterPhysicalAddresses } from '../addresses/filter_physical_addresses';
import { History } from 'history';
import { BookmarkServiceAction, UnbookmarkServiceAction } from '../../stores/services/actions';
import { BookmarkButtonComponent } from '../bookmark_button/bookmark_button_component';

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

export const ServiceListItemComponent = (props: Props): JSX.Element => {
        const serviceName = buildServiceName(props.service.organizationName, props.service.name);
        const addBookmark = (): BookmarkServiceAction => props.bookmarkService(props.service);
        const removeBookmark = (): UnbookmarkServiceAction => props.unbookmarkService(props.service);
        return (
            <TouchableOpacity onPress={props.onPress}>
                 <View style={{ backgroundColor: colors.white, marginTop: 8, paddingVertical: 15, flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 2, paddingLeft: 15}}>
                    {renderName(serviceName)}
                    {/* {renderOrganizationName(props.service.organizationName)} */}
                    {renderAddresses(filterPhysicalAddresses(props.service.addresses))}
                    {renderDescription(props.service.description)}
                    </View>
                    <View>
                        <BookmarkButtonComponent
                            isBookmarked={props.isBookmarked}
                            textColor={colors.teal}
                            bookmark={addBookmark}
                            unbookmark={removeBookmark}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

const buildServiceName = (organizationName: string, serviceName: string): string => (
    `${organizationName} - ${serviceName}`
);

const renderName = (name: string): JSX.Element => (
    <Text style={[textStyles.headlineH3StyleBlackLeft]}>{name}</Text>
);

// const renderOrganizationName = (name: string): JSX.Element => (
//     <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
//         <Text style={textStyles.listItemDetail}>
//             <Trans>Provided by</Trans>{' '}
//         </Text>
//         <TouchableOpacity>
//             <Text style={[textStyles.listItemDetail, { color: 'teal', fontWeight: 'bold'} ]}>
//                 {name}
//             </Text>
//         </TouchableOpacity>
//     </View>
// );

const renderDescription = (description: string): JSX.Element => (
    <Text note numberOfLines={3} style={textStyles.listItemDetail }>
    {description}
    </Text>
);

// tslint:disable-next-line:typedef
const renderAddresses = (physicalAddresses: ReadonlyArray<Address>) => (
    mapWithIndex((address: Address, index: number) =>
        <View key={index} style={{ marginVertical: 10}}>
            <Text style={textStyles.listItemDetail}>
                {address.address}, {address.city} {address.stateProvince} {address.postalCode || ''}
            </Text>
        </View>, physicalAddresses)
);
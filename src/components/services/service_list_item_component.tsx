import React from 'react';
import { textStyles, colors } from '../../application/styles';
import { HumanServiceData, Address } from '../../validation/services/types';
import { View } from 'native-base';
import { Text, TouchableOpacity } from 'react-native';
import { mapWithIndex } from '../../application/map_with_index';
import { ExpandableContentComponent } from '../expandable_content/expandable_content_component';
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
            <View style={{ backgroundColor: colors.white, padding: 10, marginTop: 10 }}>
                <BookmarkButtonComponent isBookmarked={props.isBookmarked}
                textColor={colors.teal}
                bookmark={addBookmark}
                unbookmark={removeBookmark}
                />
                {renderName(serviceName, props.onPress)}
                {renderDescription(props.service.description)}
                {renderAddresses(filterPhysicalAddresses(props.service.addresses))}
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
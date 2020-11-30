import React from 'react';
import { View } from 'native-base';
import { History } from 'history';
import { FlatList } from 'react-native';
import { colors } from '../../application/styles';
import { BookmarkServiceAction, OpenServiceAction, UnbookmarkServiceAction } from '../../stores/services/actions';
import { SaveOrganizationServicesScrollOffsetAction } from '../../stores/user_experience/actions';
import { HumanServiceData } from '../../validation/services/types';
import { SearchListSeparator } from '../search/separators';
import { renderServiceItems } from '../services/render_service_items';

interface ServicesTabProps {
    readonly services: ReadonlyArray<HumanServiceData>;
    readonly history: History;
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
    readonly openServiceDetail: (service: HumanServiceData) => OpenServiceAction;
    readonly organizationServicesOffset: number;
    readonly saveOrganizationServicesOffset: (offset: number) => SaveOrganizationServicesScrollOffsetAction;
}

export const OrganizationServiceListComponent = (props: ServicesTabProps): JSX.Element => {

    return (
        <View style={{ flexDirection: 'column', backgroundColor: colors.lightGrey, flex: 1 }}>
            <FlatList
                style={{ backgroundColor: colors.lightGrey, flex: 1 }}
                data={props.services}
                keyExtractor={keyExtractor}
                renderItem={renderServiceItems({
                    ...props,
                    scrollOffset: props.organizationServicesOffset,
                    saveScrollOffset: props.saveOrganizationServicesOffset,
                })}
                ItemSeparatorComponent={SearchListSeparator}
            />
        </View>
    );
};

const keyExtractor = (item: HumanServiceData): string => (
    item.id
);
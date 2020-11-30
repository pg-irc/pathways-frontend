// tslint:disable: no-expression-statement
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'native-base';
import { History } from 'history';
import { FlatList, NativeSyntheticEvent, ScrollViewProps } from 'react-native';
import { colors } from '../../application/styles';
import { BookmarkServiceAction, OpenServiceAction, UnbookmarkServiceAction } from '../../stores/services/actions';
import { SaveOrganizationServicesScrollOffsetAction } from '../../stores/user_experience/actions';
import { HumanServiceData } from '../../validation/services/types';
import { SearchListSeparator } from '../search/separators';
import { renderServiceItems } from '../services/render_service_items';
import { setServicesOffsetThrottled } from '../set_services_offset_throttled';

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

    const [orgServicesOffset, setOrgServicesOffset]: readonly [number, (n: number) => void] = useState(props.organizationServicesOffset);
    const flatListRef = useRef<FlatList<HumanServiceData>>();

    useEffect((): void => {
        if (props.services.length > 0) {
            flatListRef.current.scrollToOffset({ animated: false, offset: props.organizationServicesOffset });
        }
    }, [props.organizationServicesOffset, props.services, flatListRef]);

    return (
        <View style={{ flexDirection: 'column', backgroundColor: colors.lightGrey, flex: 1 }}>
            <FlatList
                ref={flatListRef}
                onScroll={(e: NativeSyntheticEvent<ScrollViewProps>): void => setServicesOffsetThrottled(e, setOrgServicesOffset)}
                style={{ backgroundColor: colors.lightGrey, paddingTop: 8 }}
                data={props.services}
                keyExtractor={(service: HumanServiceData): string => service.id}
                renderItem={renderServiceItems({
                    ...props,
                    scrollOffset: orgServicesOffset,
                    saveScrollOffset: props.saveOrganizationServicesOffset,
                })}
                ItemSeparatorComponent={SearchListSeparator}
                ListHeaderComponent={<View />}
            />
        </View>
    );
};
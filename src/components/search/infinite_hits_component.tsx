import React from 'react';
import { Text, View, FlatList, ListRenderItemInfo } from 'react-native';
import { EmptyComponent } from '../empty_component/empty_component';
import { colors, textStyles } from '../../application/styles';
import { ServiceHit } from './types';

export interface Props {
    readonly hits: ReadonlyArray<ServiceHit>;
    readonly hasMore: boolean;
    readonly currentRefinement: string;
}

export interface Actions {
    readonly refine: (searchTerms: string) => string;
}

export const InfiniteHitsComponent = (props: Partial<Props & Actions>): JSX.Element => {
    const hits = props.currentRefinement === '' ? [] : props.hits;
    // tslint:disable-next-line:no-empty
    const onRefresh = (): void => { };
    const refreshing = false;
    const listEmptyComponent = <EmptyComponent />;
    const listHeaderComponent = <EmptyComponent />;

    return <FlatList
        style={{ backgroundColor: colors.white }}
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={hits}
        keyExtractor={keyExtractor}
        renderItem={renderServiceSearchHit}
        ListEmptyComponent={listEmptyComponent}
        ListHeaderComponent={listHeaderComponent}
        ItemSeparatorComponent={(): JSX.Element => separator()}
        onEndReached={(): boolean => props.hasMore}
    />;
};

const separator = (): JSX.Element => (
    <View style={{ borderBottomWidth: 8, borderColor: colors.lightGrey }} />
);

const keyExtractor = (item: ServiceHit): string => (
    item.service_id
);

const renderServiceSearchHit = ({ item }: ListRenderItemInfo<ServiceHit>): JSX.Element => (
    <View style={{ padding: 10, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={[textStyles.paragraphBoldBlackLeft, { color: colors.darkerGrey }]}>{itemType(item)}</Text>
        <Text style={[textStyles.paragraphBoldBlackLeft, { fontSize: 20, lineHeight: 25 }]}>{itemName(item)}</Text>
        <Text style={[textStyles.paragraphStyle, { color: colors.darkerGrey }]}>{itemAdress(item)}</Text>
        <Text style={[textStyles.paragraphStyle]}>{truncatedItemDescription(item)}</Text>
    </View >
);

const itemType = (_: ServiceHit): string => (
    'SERVICE'
);

const itemName = (item: ServiceHit): string => (
    item.service_name
);

const itemAdress = (item: ServiceHit): string => (
    item.street_address + ', ' + item.city + ' ' + item.postal_code
);

const truncatedItemDescription = (item: ServiceHit): string => {
    const maxLength = 200;
    const desc = item.service_description;
    return desc.length > maxLength ? desc.slice(0, maxLength - 3) + '...' : desc;
};

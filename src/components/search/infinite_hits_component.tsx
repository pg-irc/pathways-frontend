import React from 'react';
import { StyleSheet, Text, View, FlatList, ListRenderItemInfo } from 'react-native';
import { EmptyComponent } from '../empty_component/empty_component';
import { colors } from '../../application/styles';
import { ServiceHit } from './types';

const styles = StyleSheet.create({
    separator: {
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    item: {
        padding: 10,
        flexDirection: 'column',
    },
    titleText: {
        fontWeight: 'bold',
    },
});

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
        style={{ backgroundColor: colors.lightGrey }}
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={hits}
        keyExtractor={keyExtractor}
        renderItem={renderServiceSearchHit}
        ListEmptyComponent={listEmptyComponent}
        ListHeaderComponent={listHeaderComponent}
        ItemSeparatorComponent={(): JSX.Element => <View style={styles.separator} />}
        onEndReached={(): boolean => props.hasMore}
    />;
};

const keyExtractor = (item: ServiceHit): string => (
    item.service_id
);

const renderServiceSearchHit = ({ item }: ListRenderItemInfo<ServiceHit>): JSX.Element => (
    <View style={styles.item}>
        <Text>SERVICE</Text>
        <Text>{name(item)}</Text>
        <Text>{adress(item)}</Text>
        <Text>{truncatedDescription(item)}</Text>
    </View>
);

const name = (item: ServiceHit): string => (
    item.service_name
);

const truncatedDescription = (item: ServiceHit): string => {
    const maxLength = 200;
    const description = item.service_description;
    return description.length > maxLength ? description.slice(0, maxLength - 3) + '...' : description;
};

const adress = (item: ServiceHit): string => (
    item.street_address + ', ' + item.city + ' ' + item.postal_code
);

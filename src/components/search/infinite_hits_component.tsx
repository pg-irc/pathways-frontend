import React from 'react';
import { StyleSheet, Text, View, FlatList, ListRenderItemInfo } from 'react-native';
import { EmptyComponent } from '../empty_component/empty_component';
import { colors } from '../../application/styles';

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

export interface ServiceHit {
    readonly service_id: string;
    readonly service_name: string;
    readonly service_description: string;
    readonly street_address: string;
    readonly city: string;
    readonly postal_code: string;
}

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
        renderItem={renderItem}
        ListEmptyComponent={listEmptyComponent}
        ListHeaderComponent={listHeaderComponent}
        ItemSeparatorComponent={(): JSX.Element => <View style={styles.separator} />}
        onEndReached={(): boolean => props.hasMore}
    />;
};

const renderItem = ({ item }: ListRenderItemInfo<ServiceHit>): JSX.Element => {
    return <View style={styles.item}>
        <Text>SERVICE</Text>
        <Text>{item.service_name}</Text>
        <Text>{item.street_address + ', ' + item.city + ' ' + item.postal_code}</Text>
        <Text>{item.service_description.slice(0, 200) + '...'}</Text>
        <Text>{}</Text>
    </View>;
};

const keyExtractor = (item: ServiceHit): string => item.service_id;

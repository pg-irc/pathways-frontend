import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { connectInfiniteHits } from 'react-instantsearch-native';

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

interface HasId {
    readonly objectID: string;
}

interface Props {
    readonly hits: ReadonlyArray<HasId>;
    readonly hasMore: boolean;
}

const InfiniteHits = (props: Props): JSX.Element => (
    <FlatList
        data={props.hits}
        keyExtractor={(item: HasId): string => item.objectID}
        ItemSeparatorComponent={(): JSX.Element => <View style={styles.separator} />}
        onEndReached={(): boolean => props.hasMore}
        renderItem={({ item }) => (
            <View style={styles.item}>
                <Text>{JSON.stringify(item).slice(0, 100)}</Text>
            </View>
        )}
    />
);

export const InfiniteHitsConnectedComponent = connectInfiniteHits(InfiniteHits);

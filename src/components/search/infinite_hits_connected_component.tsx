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
    objectID: string,
}

interface Props {
    hits: ReadonlyArray<HasId>;
    hasMore: boolean;
    // refine: (foo?: string) => string | undefined;
}

const InfiniteHits = (props: Props) => {
    return <FlatList
        data={props.hits}
        keyExtractor={item => item.objectID}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onEndReached={() => props.hasMore /* && props.refine() */}
        renderItem={({ item }) => (
            <View style={styles.item}>
                <Text>{JSON.stringify(item).slice(0, 100)}</Text>
            </View>
        )}
    />;
};

export const InfiniteHitsConnectedComponent = connectInfiniteHits(InfiniteHits);

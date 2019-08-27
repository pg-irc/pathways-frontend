import React from 'react';
import { StyleSheet, Text, View, FlatList, ListRenderItemInfo } from 'react-native';
import { colors } from '../../application/styles';
import { EmptyComponent } from '../empty_component/empty_component';

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

export interface Prediction {
    readonly service_id: string;
    readonly service_name: string;
    readonly service_description: string;
}

export interface Props {
    readonly hits: ReadonlyArray<Prediction>;
    readonly currentRefinement: string;
}

export interface Actions {
    readonly refine: (value?: string) => void;
}

export const AutoCompleteComponent = (props: Props & Actions): JSX.Element => {

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
    />;
};

const renderItem = (prediction: ListRenderItemInfo<Prediction>): JSX.Element => {
    const dummyAddress = '5575 Boundary Road, Vancouver, BC';

    return <View style={styles.item}>
        <Text>SERVICE</Text>
        <Text>{prediction.item.service_name}</Text>
        <Text>{dummyAddress}</Text>
        <Text>{prediction.item.service_description.slice(0, 200) + '...'}</Text>
        <Text>{}</Text>
    </View>;
};

const keyExtractor = (item: Prediction): string => item.service_id;

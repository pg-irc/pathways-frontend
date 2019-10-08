import React from 'react';
import { View, FlatList, ListRenderItemInfo } from 'react-native';
import { Text } from 'native-base';
import { EmptyComponent } from '../empty_component/empty_component';
import { colors, textStyles } from '../../application/styles';
import { UnvalidatedData, ServiceSearchHit } from './types';
import { Trans } from '@lingui/react';
import { useTraceUpdate } from '../../helpers/debug';
import { SearchListSeparator } from './separators';

export interface Props {
    readonly currentPath: string;
    readonly hits: ReadonlyArray<UnvalidatedData>;
    readonly hasMore: boolean;
    readonly currentRefinement: string;
}

export interface Actions {
    readonly refine: (searchTerms?: string) => string;
}

export const InfiniteHitsComponent = (props: Partial<Props & Actions>): JSX.Element => {
    // tslint:disable-next-line:no-expression-statement
    useTraceUpdate('InfiniteHitsComponent', props);
    const hits = props.currentRefinement === '' ? [] : props.hits;
    return <FlatList
        style={{ backgroundColor: colors.white }}
        refreshing={false}
        data={hits}
        keyExtractor={keyExtractor}
        renderItem={renderSearchHit}
        ListEmptyComponent={EmptyComponent}
        ItemSeparatorComponent={SearchListSeparator} />;
};

const keyExtractor = (item: UnvalidatedData): string => (
    item.objectID || 'missingId'
);

const renderSearchHit = ({ item }: ListRenderItemInfo<UnvalidatedData>): JSX.Element => {
    try {
        return renderServiceHit(item);
    } catch (error) {
        return <Text>Error</Text>;
    }
};

const truncateDescription = (description: string): string => {
    const maxLength = 200;
    return description.length > maxLength ? description.slice(0, maxLength - 3) + '...' : description;
};

const renderServiceHit = (hit: ServiceSearchHit): JSX.Element => (
    <View style={{ padding: 10, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={[textStyles.paragraphBoldBlackLeft, { color: colors.darkerGrey }]}><Trans>SERVICE</Trans></Text>
        <Text style={[textStyles.paragraphBoldBlackLeft, { fontSize: 20, lineHeight: 25 }]}>{serviceName(hit)}</Text>
        <Text style={[textStyles.paragraphStyle, { color: colors.darkerGrey }]}>{serviceAdress(hit)}</Text>
        <Text style={[textStyles.paragraphStyle]}>{truncatedServiceDescription(hit)}</Text>
    </View >
);

const serviceName = (hit: ServiceSearchHit): string => (
    hit.service_name
);

const serviceAdress = (hit: ServiceSearchHit): string => (
    hit.street_address + ', ' + hit.city + ' ' + hit.postal_code
);

const truncatedServiceDescription = (hit: ServiceSearchHit): string => (
    truncateDescription(hit.service_description)
);

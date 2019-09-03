import React from 'react';
import { View, FlatList, ListRenderItemInfo } from 'react-native';
import { Text } from 'native-base';
import { EmptyComponent } from '../empty_component/empty_component';
import { colors, textStyles } from '../../application/styles';
import { ServiceHit } from './types';
import { Trans } from '@lingui/react';
import { LinkTypes, AnalyticsLink } from '../link/link';
import { buildLinkContext } from '../../sagas/analytics/events';

export interface Props {
    readonly currentPath: string;
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

    return <FlatList
        style={{ backgroundColor: colors.white }}
        refreshing={false}
        onRefresh={onRefresh}
        data={hits}
        keyExtractor={keyExtractor}
        renderItem={renderServiceSearchHit}
        ListEmptyComponent={EmptyComponent}
        ListHeaderComponent={ListHeaderComponent}
        ItemSeparatorComponent={Separator}
        onEndReached={(): boolean => props.hasMore}
    />;
};

const ListHeaderComponent = (props: Partial<Props & Actions>): JSX.Element => {
    const phoneNumber: string = '211';
    const href = `tel: ${phoneNumber}`;
    const linkContext = buildLinkContext('Service', 'BC-211');

    return <View style={{ backgroundColor: colors.lightTeal }}>
        <Text style={[textStyles.paragraphStyle,
        {
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 20,
            marginRight: 20,
        }]}>
            <Trans>Services search is only available in English. For multilingual assistance, <AnalyticsLink
                href={href} currentPath={props.currentPath}
                linkContext={linkContext} linkType={LinkTypes.phone}
            >please call BC211</AnalyticsLink>.</Trans>
        </Text>
        <Separator />
    </View>;
};

const Separator = (): JSX.Element => (
    <View style={{ borderBottomWidth: 8, borderColor: colors.lightGrey }} />
);

const keyExtractor = (item: ServiceHit): string => (
    item.service_id
);

// grey colour from "note" font
const renderServiceSearchHit = ({ item }: ListRenderItemInfo<ServiceHit>): JSX.Element => (
    <View style={{ padding: 10, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={[textStyles.paragraphBoldBlackLeft, { color: colors.darkerGrey }]}>{itemType(item)}</Text>
        <Text style={[textStyles.paragraphBoldBlackLeft, { fontSize: 20, lineHeight: 25 }]}>{serviceName(item)}</Text>
        <Text style={[textStyles.paragraphStyle, { color: colors.darkerGrey }]}>{itemAdress(item)}</Text>
        <Text style={[textStyles.paragraphStyle]}>{truncatedServiceDescription(item)}</Text>
    </View >
);

const itemType = (_: ServiceHit): string => (
    'SERVICE'
);

const serviceName = (_: ServiceHit): string => (
    'itemName' // item.service_name
);

const itemAdress = (service: ServiceHit): string => (
    JSON.stringify(service).substr(0, 200)
);

const truncatedServiceDescription = (_: ServiceHit): string => {
    return 'truncatedItemDescription';
    // const maxLength = 200;
    // const desc = item.service_description;
    // return desc.length > maxLength ? desc.slice(0, maxLength - 3) + '...' : desc;
};

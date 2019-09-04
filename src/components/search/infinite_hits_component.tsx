import React from 'react';
import { View, FlatList, ListRenderItemInfo } from 'react-native';
import { Text } from 'native-base';
import { EmptyComponent } from '../empty_component/empty_component';
import { colors, textStyles } from '../../application/styles';
import { UnvalidatedData, ServiceSearchHit, OrganizationSearchHit } from './types';
import { Trans } from '@lingui/react';
import { LinkTypes, AnalyticsLink } from '../link/link';
import { buildLinkContext } from '../../sagas/analytics/events';
import { toValidSearchHit as toValidSearchHit } from './validation';

export interface Props {
    readonly currentPath: string;
    readonly hits: ReadonlyArray<UnvalidatedData>;
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
        renderItem={renderSearchHit}
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

const keyExtractor = (hit: UnvalidatedData): string => (
    hit.service_id ? hit.service_id : hit.organization_name // TODO change organization_name to organization_id
);

const renderSearchHit = ({ item }: ListRenderItemInfo<UnvalidatedData>): JSX.Element => (
    renderValidSearchHit(toValidSearchHit(item))
);

const renderValidSearchHit = (validHit: ServiceSearchHit | OrganizationSearchHit): JSX.Element => (
    validHit.type === 'OrganizationSearchItem' ? renderOrganizationHit(validHit) : renderServiceHit(validHit)
);

const renderOrganizationHit = (hit: OrganizationSearchHit): JSX.Element => (
    <View style={{ padding: 10, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={[textStyles.paragraphBoldBlackLeft, { color: colors.darkerGrey }]}><Trans>ORGANIZATION</Trans></Text>
        <Text style={[textStyles.paragraphBoldBlackLeft, { fontSize: 20, lineHeight: 25 }]}>{organizationName(hit)}</Text>
        <Text style={[textStyles.paragraphStyle]}>{truncatedOrganizationDescription(hit)}</Text>
    </View >
);

const organizationName = (hit: OrganizationSearchHit): string => (
    hit.organization_name
);

const truncatedOrganizationDescription = (hit: OrganizationSearchHit): string => (
    truncateDescription(hit.organization_description)
);

const truncateDescription = (description: string): string => {
    const maxLength = 200;
    return description.length > maxLength ? description.slice(0, maxLength - 3) + '...' : description;
};

// TODO grey colour from "note" font
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

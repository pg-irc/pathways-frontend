import React from 'react';
import { View, FlatList, ListRenderItemInfo } from 'react-native';
import { Text } from 'native-base';
import { EmptyComponent } from '../empty_component/empty_component';
import { colors, textStyles } from '../../application/styles';
import { UnvalidatedData, ServiceSearchHit, OrganizationSearchHit } from './types';
import { Trans } from '@lingui/react';
import { LinkTypes, AnalyticsLink } from '../link/link';
import { buildLinkContext } from '../../sagas/analytics/events';
import { toValidSearchHit } from './api/validation';
import { useTraceUpdate } from './debug';

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
        ListHeaderComponent={InformationOnlyInEnglishNotice}
        ItemSeparatorComponent={Separator} />;
};

const InformationOnlyInEnglishNotice = (props: Partial<Props & Actions>): JSX.Element => {
    const phoneNumber: string = '211';
    const href = `tel: ${phoneNumber}`;
    const linkContext = buildLinkContext('Service', 'BC-211');

    return <View style={{ backgroundColor: colors.white }}>
        <Text style={[textStyles.paragraphStyle,
        {
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 20,
            marginRight: 20,
        }]}>
            <Trans>Information about services is currently only available in English. For information in other languages, <AnalyticsLink
                href={href} currentPath={props.currentPath} linkContext={linkContext} linkType={LinkTypes.phone} style={{ color: colors.teal }}
            >please call BC211</AnalyticsLink>.</Trans>
        </Text>
        <Separator />
    </View>;
};

const Separator = (): JSX.Element => (
    <View style={{ borderBottomWidth: 8, borderColor: colors.lightGrey }} />
);

const keyExtractor = (item: UnvalidatedData): string => (
    item.objectID || 'missingId'
);

const renderSearchHit = ({ item }: ListRenderItemInfo<UnvalidatedData>): JSX.Element => {
    try {
        return renderValidSearchHit(toValidSearchHit(item));
    } catch (error) {
        return <Text>Error</Text>;
    }
};

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

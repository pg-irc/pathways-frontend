// tslint:disable:no-expression-statement
import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import { InstantSearch, connectInfiniteHits, connectConfigure, connectSearchBox } from 'react-instantsearch-native';
import { InfiniteHitsComponent } from './infinite_hits_component';
import { colors } from '../../application/styles';
import { Content, View } from 'native-base';
import { emptyComponent } from '../empty_component/empty_component';
import { LatLong } from '../../validation/latlong/types';
import { useFetchLatLongFromLocation } from './api/use_fetch_lat_long_from_location';
import { toServiceSearchConfiguration } from './api/configuration';
import { useTraceUpdate } from '../../helpers/debug';
import { ALGOLIA_SERVICES_INDEX } from 'react-native-dotenv';
import { I18n } from '@lingui/react';
import { SearchInputComponent } from './search_input_component';
import { HumanServiceData } from '../../validation/services/types';
import { SaveServiceAction, BookmarkServiceAction, UnbookmarkServiceAction } from '../../stores/services/actions';
import { RouterProps } from '../../application/routing';
import { DisableAnalyticsAction } from '../../stores/user_profile';
import { Id } from '../../stores/services';
import { DISABLE_ANALYTICS_STRING, ENABLE_ANALYTICS_STRING } from 'react-native-dotenv';
import algoliasearch from 'algoliasearch/lite';
import { CloseButtonComponent } from '../close_button/close_button_component';
import { BannerImageComponent } from '../content_layout/banner_image_component';
import { DescriptorComponent } from '../content_layout/descriptor_component';
import { TitleComponent } from '../content_layout/title_component';
import { MarkdownBodyComponent } from '../content_layout/markdown_body_component';
import { DividerComponent } from '../content_layout/divider_component';
// import { ServiceOrganization } from '../services/service_detail_component';
import { EmptyComponent } from '../empty_component/empty_component';
import { Trans } from '@lingui/react';

export interface SearchComponentProps {
    readonly apiKey: string;
    readonly appId: string;
    readonly bookmarkedServicesIds: ReadonlyArray<Id>;
}

export interface SearchComponentActions {
    readonly saveService: (service: HumanServiceData) => SaveServiceAction;
    readonly disableAnalytics: (disable: boolean) => DisableAnalyticsAction;
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
}

type Props = SearchComponentProps & SearchComponentActions & RouterProps;

export const SearchComponent = (props: Props): JSX.Element => {
    useTraceUpdate('SearchComponent', props);

    const [location, setLocation]: [string, (s: string) => void] = useState('');
    const [latLong, setLatLong]: [LatLong, (latLong: LatLong) => void] = useState(undefined);
    const [modalState, setModalState]: readonly [boolean, (modalState: boolean) => void] = useState(undefined);
    const [service, setServiceDetail]: readonly [HumanServiceData, (service: HumanServiceData) => void] = useState(undefined);

    useFetchLatLongFromLocation(location, setLatLong);
    useDisableAnalyticsOnEasterEgg(location, props.disableAnalytics);
    const modal = renderServiceDetailModal(modalState, setModalState, service);

    const SearchInputConnectedComponent = connectSearchBox(SearchInputComponent);
    const ConfigureConnectedComponent = connectConfigure(() => emptyComponent());
    const InfiniteHitsConnectedComponent = connectInfiniteHits(InfiniteHitsComponent);
    const searchClient = algoliasearch(
        props.appId,
        props.apiKey,
    );
    console.log('im re-rendering')
    return <I18n>{(): JSX.Element => {

        return <Content style={{ backgroundColor: colors.pale }}>
            <InstantSearch indexName={servicesIndex()} searchClient={searchClient} {...props} >
                <SearchInputConnectedComponent location={location} setLocation={setLocation} latLong={latLong} />
                <ConfigureConnectedComponent {...toServiceSearchConfiguration(latLong)} />
                <InfiniteHitsConnectedComponent {...{ ...props, setModalState, setServiceDetail }} />
            </InstantSearch>
            {modal}
        </Content>;
    }}</I18n>;
};

const useDisableAnalyticsOnEasterEgg = (location: string, disableAnalytics: (disable: boolean) => DisableAnalyticsAction): void => {
    const effect = (): void => {
        if (location === DISABLE_ANALYTICS_STRING) {
            disableAnalytics(true);
            alert('Analytics disabled');
        } else if (location === ENABLE_ANALYTICS_STRING) {
            disableAnalytics(false);
            alert('Analytics enabled');
        }
    };
    useEffect(effect, [location]);
};
const servicesIndex = (): string => (
    ALGOLIA_SERVICES_INDEX || 'dev_services'
);

const renderServiceDetailModal = (modalState: boolean, setModalState: (modalState: boolean) => void, service: HumanServiceData): JSX.Element => {

    if (service === undefined)
        return <EmptyComponent />;

    const hideModal = (): void => {
        setModalState(false);
    };
    return (
        <Modal isVisible={modalState} >
            <View style={{ backgroundColor: colors.lightGrey, flex: 1 }}>
                <CloseButtonComponent
                    onPress={hideModal}
                    color={colors.black}
                />
                <Content padder style={{ flex: 1 }}>
                    <BannerImageComponent imageSource={undefined} />
                    <DescriptorComponent descriptor={<Trans>SERVICE</Trans>} />
                    <TitleComponent title={service.name} />
                    {/* <ServiceOrganization history={history} name={service.organizationName} /> */}
                    <MarkdownBodyComponent body={service.description} shouldBeExpandable={true} />
                    <DividerComponent />
                    {/* <ServiceContactDetails service={props.service} currentPathForAnaltyics={props.location.pathname} /> */}
                </Content>
            </View>
        </Modal>
    );
};
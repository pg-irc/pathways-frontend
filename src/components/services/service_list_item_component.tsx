import React, { useState } from 'react';
import { textStyles, colors } from '../../application/styles';
import { HumanServiceData, Address } from '../../validation/services/types';
import { View, Text, Content } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { mapWithIndex } from '../../application/map_with_index';
import { Trans } from '@lingui/react';
import { filterPhysicalAddresses } from '../addresses/filter_physical_addresses';
import { BookmarkServiceAction, UnbookmarkServiceAction } from '../../stores/services/actions';
import { BookmarkButtonComponent } from '../bookmark_button/bookmark_button_component';
import { History } from 'history';
import { EmptyComponent } from '../empty_component/empty_component';
import Modal from 'react-native-modal';
import { CloseButtonComponent } from '../close_button/close_button_component';
import { BannerImageComponent } from '../content_layout/banner_image_component';
import { DescriptorComponent } from '../content_layout/descriptor_component';
import { TitleComponent } from '../content_layout/title_component';
import { MarkdownBodyComponent } from '../content_layout/markdown_body_component';
import { DividerComponent } from '../content_layout/divider_component';
// import { ServiceOrganization } from '../services/service_detail_component';

export interface ServiceListItemProps {
    readonly service: HumanServiceData;
    readonly currentPath: string;
    readonly onPress: () => void;
    readonly history: History;
    readonly isBookmarked: boolean;
    readonly withModal?: boolean;
}

export interface ServiceListItemActions {
    readonly bookmarkService: (service: HumanServiceData) => BookmarkServiceAction;
    readonly unbookmarkService: (service: HumanServiceData) => UnbookmarkServiceAction;
}

type Props = ServiceListItemProps & ServiceListItemActions;

export const ServiceListItemComponent: React.StatelessComponent<Props> =
    (props: Props): JSX.Element => {
        const [modalState, setModalState]: readonly [boolean, (modalState: boolean) => void] = useState(undefined);
        const serviceName = buildServiceName(props.service.organizationName, props.service.name);
        const addBookmark = (): BookmarkServiceAction => props.bookmarkService(props.service);
        const removeBookmark = (): UnbookmarkServiceAction => props.unbookmarkService(props.service);
        const toggleModal = () => {
            if(modalState) {
                setModalState(false)
            } else {
                setModalState(true)
            }
        }
        return (
            <View style={{ backgroundColor: colors.white, marginTop: 8, paddingVertical: 15, flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 2, paddingLeft: 15}}>
                    {renderName(serviceName, toggleModal)}
                    {renderOrganizationName(props.service.organizationName)}
                    {renderAddresses(filterPhysicalAddresses(props.service.addresses))}
                    {renderDescription(props.service.description)}
                </View>
                <View>
                    <BookmarkButtonComponent isBookmarked={props.isBookmarked}
                    textColor={colors.teal}
                    bookmark={addBookmark}
                    unbookmark={removeBookmark}
                    />
                </View>
                {props.withModal ? <ServiceDetailModal modalState={modalState} setModalState={setModalState} service={props.service}/> : ''}
            </View>
        );
    };

const buildServiceName = (organizationName: string, serviceName: string): string => (
    `${organizationName} - ${serviceName}`
);

const renderName = (name: string, onPress: () => void): JSX.Element => (
    <TouchableOpacity onPress={onPress}>
        <Text style={[textStyles.headlineH3StyleBlackLeft]}>{name}</Text>
    </TouchableOpacity>
);

const renderOrganizationName = (name: string): JSX.Element => (
    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
        <Text style={textStyles.listItemDetail}>
            <Trans>Provided by</Trans>{' '}
        </Text>
        <TouchableOpacity>
        <Text style={[textStyles.listItemDetail, { color: 'teal', fontWeight: 'bold'} ]}>
            {name}
        </Text>
    </TouchableOpacity>
    </View>
);

const renderDescription = (description: string): JSX.Element => (
    <Text note numberOfLines={3} style={textStyles.listItemDetail }>
    {description}
    </Text>
);

// tslint:disable-next-line:typedef
const renderAddresses = (physicalAddresses: ReadonlyArray<Address>) => (
    mapWithIndex((address: Address, index: number) =>
        <View key={index} style={{ flex: 1, flexDirection: 'row'}}>
            <Text style={textStyles.listItemDetail}>
                {address.address}
            </Text>
            <Text style={textStyles.listItemDetail}>
                , {address.city} {address.stateProvince} {address.postalCode ? address.postalCode : ''}
            </Text>
        </View>, physicalAddresses)
);

export interface ServiceDetailModalProps {
    readonly modalState: boolean;
    readonly setModalState: (modalState: boolean) => void;
    readonly service: HumanServiceData;
}

const ServiceDetailModal = (props: ServiceDetailModalProps): JSX.Element => {

    if (props.service === undefined)
        return <EmptyComponent />;

    const hideModal = (): void => {
        // tslint:disable-next-line: no-expression-statement
        props.setModalState(false);
    };
    return (
        <Modal isVisible={props.modalState}>
            <View style={{ backgroundColor: colors.white, flex: 1 }}>
                <CloseButtonComponent
                    onPress={hideModal}
                    color={colors.black}
                />
                <Content padder style={{ flex: 1 }}>
                    <BannerImageComponent imageSource={undefined} />
                    <DescriptorComponent descriptor={<Trans>SERVICE</Trans>} />
                    <TitleComponent title={props.service.name} />
                    {/* <ServiceOrganization history={history} name={service.organizationName} /> */}
                    <MarkdownBodyComponent body={props.service.description} shouldBeExpandable={true} />
                    <DividerComponent />
                    {/* <ServiceContactDetails service={props.service} currentPathForAnaltyics={props.location.pathname} /> */}
                </Content>
            </View>
        </Modal>
    );
};
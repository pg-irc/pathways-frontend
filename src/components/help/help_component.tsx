// tslint:disable: no-expression-statement
import React, { useRef } from 'react';
import { History } from 'history';
import { Text, View, Icon } from 'native-base';
import { Trans, I18n } from '@lingui/react';
import { I18nManager, Alert, TouchableOpacity, AlertButton, NativeSyntheticEvent, ScrollViewProps } from 'react-native';
import { applicationStyles, colors, textStyles, values, getNormalFontFamily } from '../../application/styles';
import { EmptyComponent } from '../empty_component/empty_component';
import { mapWithIndex } from '../../application/helpers/map_with_index';
import { ClearAllUserDataAction } from '../../stores/questionnaire/actions';
import { openURL } from '../link/link_component';
import { goToRouteWithParameter, Routes, goToRouteWithoutParameter } from '../../application/routing';
import { MultiLineButtonComponent } from '../mutiline_button/multiline_button_component';
import { ReactI18nRenderProp, ReactI18n } from '../../application/locales';
import * as R from 'ramda';
import { SetManualUserLocationAction, ClearManualUserLocationAction } from '../../stores/manual_user_location';
import { UserLocation, LatLong } from '../../validation/latlong/types';
import { OpenHeaderMenuAction } from '../../stores/user_experience/actions';
import { MenuAndBackButtonHeaderComponent } from '../menu_and_back_button_header/menu_and_back_button_header_component';
import { BuildServicesRequestAction } from '../../stores/services/actions';
import { ScrollView } from 'react-native-gesture-handler';
import { OffsetHook, useOffset } from '../use_offset';
import { useScrollViewToOffset } from '../use_scroll_view_to_offset';
import { RegionCode } from '../../validation/region/types';

interface HelpContact {
    readonly title: JSX.Element;
    readonly url: string;
    readonly subTitle?: JSX.Element;
}

const fixtureBC: ReadonlyArray<HelpContact> = [
    {
        title: <Trans>Information on emergency services (9-1-1)</Trans>,
        subTitle: (
            <Text note style={{ fontFamily: getNormalFontFamily() }}>
                <Trans>Police, fire and medical emergencies</Trans>
            </Text>),
        url: 'https://www.ecomm911.ca/',
    },
    {
        title: <Trans>Information on HealthLinkBC (8-1-1)</Trans>,
        subTitle: (
            <Text note style={{ fontFamily: getNormalFontFamily() }}>
                <Trans>Multilingual health information services</Trans>
            </Text>),
        url: 'https://www.healthlinkbc.ca/services-and-resources/about-8-1-1',
    },
    {
        title: <Trans>Information on BC211</Trans>,
        subTitle: (
            <Text note style={{ fontFamily: getNormalFontFamily() }}>
                <Trans>Services information and referral</Trans>
            </Text>),
        url: 'http://www.bc211.ca/',
    },
    {
        title: <Trans>Information on helplines</Trans>,
        url: 'http://www.bc211.ca/help-lines/',
    },
    {
        title: <Trans>Contact Arrival Advisor team</Trans>,
        url: 'mailto:info@arrivaladvisor.ca',
    },
];

const fixtureMB: ReadonlyArray<HelpContact> = [
    {
        title: <Trans>Information on emergency services (9-1-1)</Trans>,
        subTitle: (
            <Text note style={{ fontFamily: getNormalFontFamily() }}>
                <Trans>Police, fire and medical emergencies</Trans>
            </Text>),
        url: 'https://www.winnipeg.ca/interhom/guide/All/Emergency.stm',
    },
    {
        title: <Trans>Information on Health Links - Info Santé</Trans>,
        subTitle: (
            <Text note style={{ fontFamily: getNormalFontFamily() }}>
                <Trans>Multilingual health information services</Trans>
            </Text>),
        url: 'https://misericordia.mb.ca/programs/phcc/health-links-info-sante/',
    },
    {
        title: <Trans>Information on 211 Manitoba</Trans>,
        subTitle: (
            <Text note style={{ fontFamily: getNormalFontFamily() }}>
                <Trans>Services information and referral</Trans>
            </Text>),
        url: 'https://mb.211.ca/',
    },
    {
        title: <Trans>Information on helplines</Trans>,
        url: 'https://mb.211.ca/quick-reference-guide-helplines/',
    },
    {
        title: <Trans>Contact Arrival Advisor team</Trans>,
        url: 'mailto:info@arrivaladvisor.ca',
    },
];

export interface HelpComponentProps {
    readonly topicId: string;
    readonly history: History;
    readonly manualUserLocation: UserLocation;
    readonly customLatLong: LatLong;
    readonly region: RegionCode;
}

export interface HelpComponentActions {
    readonly clearAllUserState: () => ClearAllUserDataAction;
    readonly setManualUserLocation: (userLocation: UserLocation) => SetManualUserLocationAction;
    readonly clearManualUserLocation: () => ClearManualUserLocationAction;
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
    readonly dispatchServicesRequest: (topicId: string, manualUserLocation?: UserLocation) => BuildServicesRequestAction;
}

type Props = HelpComponentProps & HelpComponentActions;

export const HelpComponent = (props: Props): JSX.Element => {
    const scrollViewRef = useRef<ScrollView>();
    const { offset, setOffset, offsetFromRouteLocation }: OffsetHook = useOffset();
    useScrollViewToOffset(scrollViewRef, offsetFromRouteLocation);
    const scrollViewThrottle = 8;
    return (
        <View style={{ flex: 1 }}>
        <MenuAndBackButtonHeaderComponent
            {...props}
            {...{ textColor: colors.teal, backgroundColor: colors.white }}
        />
        <ScrollView
            style={applicationStyles.body}
            ref={scrollViewRef}
            onScroll={(e: NativeSyntheticEvent<ScrollViewProps>): void => setOffset(e.nativeEvent.contentOffset.y)}
            scrollEventThrottle={scrollViewThrottle}
        >
            <View
                style={{
                    backgroundColor: colors.white,
                    marginTop: 0,
                    marginHorizontal: 0,
                    padding: 10,
                    marginBottom: 10,
                }}
            >
                <Text style={[textStyles.headlineH1StyleBlackLeft, { paddingHorizontal: values.backgroundTextPadding }]}>
                    <Trans>{'Help & Support'}</Trans>
                </Text>
                <Text style={[textStyles.headlineH4StyleBlackLeft, { paddingHorizontal: values.backgroundTextPadding }]}>
                    <Trans>If you are having difficulty with settlement in Canada, we suggest getting in touch with a settlement worker.</Trans>
                </Text>
                <View style={{
                    marginTop: 15,
                    marginBottom: 20,
                }}>
                    <FindSettlementAgencyButton
                        topicId={props.topicId}
                        history={props.history}
                        manualUserLocation={props.manualUserLocation}
                        customLatLong={props.customLatLong}
                        offset={offset}
                        dispatchServicesRequest={props.dispatchServicesRequest}
                    />
                </View>
            </View>
            <Text style={[textStyles.headlineH5StyleBlackLeft, { paddingHorizontal: 10 }]}>
                <Trans>FOR ADDITIONAL ASSISTANCE</Trans>
            </Text>
            {mapWithIndex(renderContactComponent, getRegionFixture(props.region))}
            <View style={{
                marginTop: 15,
                marginBottom: 20,
            }}>
                <ClearAppMemoryButton {...props} />
                <MultiLineButtonComponent onPress={(): void => goToRouteWithoutParameter(Routes.Welcome, props.history)} >
                    <Text style={textStyles.button}>
                        Go to Welcome screen
                    </Text>
                </MultiLineButtonComponent>
            </View>
        </ScrollView>
    </View>
    );
};

export interface FindSettlementAgencyButtonProps {
    readonly topicId: string;
    readonly history: History;
    readonly manualUserLocation: UserLocation;
    readonly customLatLong: LatLong;
    readonly offset: number;
    readonly dispatchServicesRequest: (topicId: string, manualUserLocation?: UserLocation) => BuildServicesRequestAction;
}

const FindSettlementAgencyButton = (props: FindSettlementAgencyButtonProps): JSX.Element => (
    <MultiLineButtonComponent onPress={(): void => onFindSettlementAgencyPress(props)}>
        <Text style={textStyles.button}>
            <Trans>Find a settlement agency near me</Trans>
        </Text>
    </MultiLineButtonComponent>
);

const onFindSettlementAgencyPress = (props: FindSettlementAgencyButtonProps): void => {
    if (props.customLatLong) {
        props.dispatchServicesRequest(props.topicId, { humanReadableLocation: '', latLong: props.customLatLong });
    } else {
        props.dispatchServicesRequest(props.topicId, props.manualUserLocation);
    }
    goToRouteWithParameter(Routes.Services, props.topicId, props.history, props.offset);
};

const getRegionFixture = (region: RegionCode): ReadonlyArray<HelpContact> => {
    if (region === RegionCode.MB) {
        return fixtureMB;
    }
    return fixtureBC;
};

const ClearAppMemoryButton = (props: Props): JSX.Element => {
    const alertToClearAllUserData = (i18n: ReactI18n): void => {
        const _ = i18n._.bind(i18n);
        // These strings are being extracted by Lingui using the function extractAlertStrings below
        // They must always match the strings found in the <Trans> tags in extractAlertStrings
        const heading = 'Delete all user data';
        const message = 'Do you want to delete all user data from this phone? This includes which ' +
            'answers are chosen in the questionnaire and which topics are bookmarked.';
        const cancelOption = 'Cancel';
        const deleteOption = 'Delete all user data';
        // tslint:disable-next-line: readonly-array
        const buttons: AlertButton[] = [
            { text: _(cancelOption), style: 'cancel' },
            { text: _(deleteOption), onPress: (): ClearAllUserDataAction => props.clearAllUserState() },
        ];
        // tslint:disable-next-line:no-expression-statement
        Alert.alert(_(heading), _(message),
            I18nManager.isRTL ? R.reverse(buttons) : buttons,
        );
    };
    return (
        <I18n>
            {(i18nRenderProp: ReactI18nRenderProp): JSX.Element => (
                <MultiLineButtonComponent onPress={(): void => alertToClearAllUserData(i18nRenderProp.i18n)} >
                    <Text style={textStyles.button}>
                        <Trans>Delete all user data</Trans>
                    </Text>
                </MultiLineButtonComponent>
            )}
        </I18n>
    );
};

const renderContactComponent = (contact: HelpContact, index: number): JSX.Element => (
    <TouchableOpacity
        key={index}
        style={{
            backgroundColor: colors.white,
            marginHorizontal: -10,
            margin: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 15,
            paddingHorizontal: 20,
        }}
        onPress={(): void => openURL(contact.url)}
    >
        <View style={{ flexDirection: 'column', flex: .95 }}>
            <Text style={textStyles.paragraphBoldBlackLeft}>{contact.title}</Text>
            {contact.subTitle ? <Text note>{contact.subTitle}</Text> : <EmptyComponent />}
        </View>
        <Icon name={I18nManager.isRTL ? 'arrow-back' : 'arrow-forward'} style={{ fontSize: values.smallIconSize, flex: .05, marginHorizontal: 3 }} />
    </TouchableOpacity>
);

export const extractAlertStrings = (): JSX.Element => (
    <div>
        <Text><Trans>Delete all user data</Trans></Text>
        <Text>
            <Trans>
                Do you want to delete all user data from this phone? This includes which
                answers are chosen in the questionnaire and which topics are bookmarked.
            </Trans>
        </Text>
        <Text>
            <Trans>Cancel</Trans>
        </Text>
    </div>
);
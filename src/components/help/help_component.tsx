// tslint:disable: no-expression-statement
import React from 'react';
import { History } from 'history';
import { Text, View, Icon, Content } from 'native-base';
import { Trans, I18n } from '@lingui/react';
import { I18nManager, Alert, TouchableOpacity, AlertButton } from 'react-native';
import { applicationStyles, colors, textStyles, values, getNormalFontFamily } from '../../application/styles';
import { EmptyComponent } from '../empty_component/empty_component';
import { mapWithIndex } from '../../application/helpers/map_with_index';
import { ClearAllUserDataAction } from '../../stores/questionnaire/actions';
import { openURL } from '../link/link_component';
import { goToRouteWithParameter, Routes } from '../../application/routing';
import { MultiLineButtonComponent } from '../mutiline_button/multiline_button_component';
import { ReactI18nRenderProp, ReactI18n } from '../../locale/types';
import * as R from 'ramda';
import { SetManualUserLocationAction, ClearManualUserLocationAction } from '../../stores/manual_user_location';
import { UserLocation, LatLong } from '../../validation/latlong/types';
import { OpenHeaderMenuAction } from '../../stores/user_experience/actions';
import { MenuAndBackButtonHeaderComponent } from '../menu_and_back_button_header/menu_and_back_button_header_component';
import { BuildServicesRequestAction } from '../../stores/services/actions';
import { Topic } from '../../selectors/topics/types';

interface HelpContact {
    readonly title: JSX.Element;
    readonly url: string;
    readonly subTitle?: JSX.Element;
}

const fixture: ReadonlyArray<HelpContact> = [
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

export interface HelpComponentProps {
    readonly topic: Topic;
    readonly history: History;
    readonly manualUserLocation: UserLocation;
    readonly customLatLong: LatLong;
}

export interface HelpComponentActions {
    readonly clearAllUserState: () => ClearAllUserDataAction;
    readonly setManualUserLocation: (userLocation: UserLocation) => SetManualUserLocationAction;
    readonly clearManualUserLocation: () => ClearManualUserLocationAction;
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
    readonly dispatchServicesRequest: (topic: Topic, manualUserLocation?: UserLocation)=> BuildServicesRequestAction;
}

type Props = HelpComponentProps & HelpComponentActions;

export const HelpComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <View style={{ flex: 1 }}>
        <MenuAndBackButtonHeaderComponent
            {...props}
            {...{ textColor: colors.teal, backgroundColor: colors.white }}
        />
        <Content padder style={applicationStyles.body}>
            <View
                style={{
                    backgroundColor: colors.white,
                    marginTop: -10,
                    marginHorizontal: -10,
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
                    <FindSettlementAgencyButton {...props} />
                </View>
            </View>
            <Text style={[textStyles.headlineH5StyleBlackLeft, { paddingHorizontal: values.backgroundTextPadding }]}>
                <Trans>FOR ADDITIONAL ASSISTANCE</Trans>
            </Text>
            {mapWithIndex(renderContactComponent, fixture)}
            <View style={{
                marginTop: 15,
                marginBottom: 20,
            }}>
                <ClearAppMemoryButton {...props} />
            </View>
        </Content>
    </View>
);

const FindSettlementAgencyButton: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <MultiLineButtonComponent onPress={(): void => onFindSettlementAgencyPress(props)}>
        <Text style={textStyles.button}>
            <Trans>Find a settlement agency near me</Trans>
        </Text>
    </MultiLineButtonComponent>
);

const onFindSettlementAgencyPress = (props: Props): void => {
    if (props.customLatLong) {
        props.dispatchServicesRequest(props.topic, { humanReadableLocation: '', latLong: props.customLatLong });
    } else {
        props.dispatchServicesRequest(props.topic, props.manualUserLocation);
    }
    goToRouteWithParameter(Routes.Services, props.topic.id, props.history);
};

const ClearAppMemoryButton: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
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
            padding: 15,
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
)

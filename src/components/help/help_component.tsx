import React from 'react';
import { History } from 'history';
import { Text, View, Icon, Content } from 'native-base';
import { Trans } from '@lingui/react';
import { I18nManager, Alert, TouchableOpacity, TextInput } from 'react-native';
import { applicationStyles, colors, textStyles, values } from '../../application/styles';
import { EmptyComponent } from '../empty_component/empty_component';
import { mapWithIndex } from '../../application/map_with_index';
import { ClearAllUserDataAction } from '../../stores/questionnaire/actions';
import { openURL } from '../link/link';
import { goToRouteWithParameter, Routes } from '../../application/routing';
import { MultiLineButtonComponent } from '../mutiline_button/multiline_button_component';
import { LatLong, SetManualUserLocationAction, ClearManualUserLocationAction } from '../../stores/manual_user_location';

const settlementWorkerTaskID = 'contact-workers-at-your-local-settlement-agency';

interface HelpContact {
    readonly title: JSX.Element;
    readonly url: string;
    readonly subTitle?: JSX.Element;
}

const fixture: ReadonlyArray<HelpContact> = [
    {
        title: <Trans>Information on emergency services (9-1-1)</Trans>,
        subTitle: <Trans>Police, fire and medical emergencies</Trans>,
        url: 'https://www.ecomm911.ca/',
    },
    {
        title: <Trans>Information on HealthLinkBC (8-1-1)</Trans>,
        subTitle: <Trans>Mutlilingual health information services</Trans>,
        url: 'https://www.healthlinkbc.ca/services-and-resources/about-8-1-1',
    },
    {
        title: <Trans>Information on BC211</Trans>,
        subTitle: <Trans>Services information and referral</Trans>,
        url: 'http://www.bc211.ca/',
    },
    {
        title: <Trans>Information on helplines</Trans>,
        url: 'http://www.bc211.ca/help-lines/',
    },
    {
        title: <Trans>Contact Arrival Advisor team</Trans>,
        url: 'mailto:hello@arrivaladvisor.ca',
    },
];

export interface HelpComponentProps {
    readonly history: History;
    readonly manualUserLocation?: LatLong;
}

export interface HelpComponentActions {
    readonly clearAllUserState: () => ClearAllUserDataAction;
    readonly setManualUserLocation: (userLocation: LatLong) => SetManualUserLocationAction;
    readonly clearManualUserLocation: () => ClearManualUserLocationAction;
}

type Props = HelpComponentProps & HelpComponentActions;

export const HelpComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
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
                <ContactSettlementWorkerButton {...props} />
                <ManualUserLocation {...props} />
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
);

const ContactSettlementWorkerButton: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <MultiLineButtonComponent onPress={goToRouteWithParameter(Routes.Services, settlementWorkerTaskID, props.history)}>
        <Text style={textStyles.button}>
            <Trans>Find a settlement agency near me</Trans>
        </Text>
    </MultiLineButtonComponent>
);

const ClearAppMemoryButton: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const alertToClearAllUserData = (): void => {
        const alertHeading = 'Delete user data';
        const alertMessage = 'Do you want to delete all user data from this phone? This includes which ' +
            'answers are chosen in the questionnaire and which topics are bookmarked.';

        // tslint:disable-next-line:no-expression-statement
        Alert.alert(alertHeading, alertMessage,
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete all user data', onPress: (): ClearAllUserDataAction => props.clearAllUserState() },
            ],
        );
    };
    return (
        <MultiLineButtonComponent onPress={alertToClearAllUserData} >
            <Text style={textStyles.button}>
                <Trans>Delete all user data</Trans>
            </Text>
        </MultiLineButtonComponent>
    );
};

interface ManualUserLocationState {
    readonly latitude?: string;
    readonly longitude?: string;
}

// tslint:disable:no-class no-expression-statement no-this
class ManualUserLocation extends React.Component<Props, ManualUserLocationState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            latitude: props.manualUserLocation && '' + props.manualUserLocation.latitude,
            longitude: props.manualUserLocation && '' + props.manualUserLocation.longitude,
        };
    }

    onSetManualLocation(): void {
        const latitude = parseFloat(this.state.latitude);
        const longitude = parseFloat(this.state.longitude);
        if (latitude && longitude) {
            this.props.setManualUserLocation({ latitude, longitude });
        }
    }

    onClearManualLocation(): void {
        this.props.clearManualUserLocation();
    }

    render(): JSX.Element {
        return <View>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={(latitude: string): void => this.setState({ ...this.state, latitude })}
                value={this.state.latitude}
            />
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={(longitude: string): void => this.setState({ ...this.state, longitude })}
                value={this.state.longitude}
            />
            <MultiLineButtonComponent onPress={(): void => this.onSetManualLocation()} >
                <Text style={textStyles.button}>
                    <Trans>Set manual location</Trans>
                </Text>
            </MultiLineButtonComponent>
            <MultiLineButtonComponent onPress={(): void => this.onClearManualLocation()} >
                <Text style={textStyles.button}>
                    <Trans>Clear manual location</Trans>
                </Text>
            </MultiLineButtonComponent>
        </View>;
    }
}

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
        <View style={{ flexDirection: 'column' }}>
            <Text style={textStyles.paragraphBoldBlackLeft}>{contact.title}</Text>
            {contact.subTitle ? <Text note>{contact.subTitle}</Text> : <EmptyComponent />}
        </View>
        <Icon name={I18nManager.isRTL ? 'arrow-back' : 'arrow-forward'} style={{ fontSize: values.smallIconSize }} />
    </TouchableOpacity>
);

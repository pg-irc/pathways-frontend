// tslint:disable:no-class no-this no-expression-statement
import React from 'react';
import { Dimensions, Image } from 'react-native';
import { View, Text, Button } from 'native-base';
import { colors, textStyles, applicationStyles } from '../../application/styles';
import { onBoardingPhoto } from '../../application/images';
import { Trans } from '@lingui/react';
import { EmptyComponent } from '../empty_component/empty_component';
import { SetOnboardingAction } from '../../stores/onboarding/actions';
import { History } from 'history';
import { goToRouteWithoutParameter, Routes } from '../../application/routing';

export interface OnBoardingPageProps {
    readonly key: string;
    readonly title: JSX.Element;
    readonly subtitle: JSX.Element;
    readonly image: any;
}

export interface OnboardingComponentProps {
    readonly history: History;
}

export interface OnboardingAction {
    readonly setOnboarding: () => SetOnboardingAction;
}

const pages: ReadonlyArray<OnBoardingPageProps> = [
    {
        key: '0',
        title: <Trans>Get trusted information</Trans>,
        subtitle: <Trans>Learn about employment, health care, and everything else to start your new life in British Columbia</Trans>,
        image: onBoardingPhoto,
    },
    {
        key: '1',
        title: <Trans>Find helpful services nearby</Trans>,
        subtitle: <Trans>Find organizations that can help you settle into your new community.</Trans>,
        image: onBoardingPhoto,
    },
    {
        key: '2',
        title: <Trans>Get information based on your needs</Trans>,
        subtitle: <Trans>Answer a few questions about your situation to get personalized
         recommendations of topics and services to help you settle in British Columbia.</Trans>,
        image: onBoardingPhoto,
    },
];

const arrivalAdvisorLogoSize = Dimensions.get('screen').width / 1.5;

type Props = OnboardingAction & OnboardingComponentProps;
interface State {
    readonly pageIndex: number;
}
export class OnboardingComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            pageIndex: 0,
        };
    }

    render(): JSX.Element {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
            }}>
                {this.renderPage(this.state.pageIndex)}
                {this.renderPersonalizationButtons()}
                {this.renderNavigationButtons()}
            </View>
        );
    }

    renderPage(pageIndex: number): JSX.Element {
        const activePage = pages[pageIndex] ;
        return <OnBoardingPage {...activePage} />;
    }

    renderPersonalizationButtons(): JSX.Element {
        const isLastPage = this.state.pageIndex === pages.length - 1;
        const personalizationButtons = <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {this.renderStartPersonalizationButton()}
            {this.renderSkipPersonalizationButton()}
        </View>;
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {isLastPage ? personalizationButtons : <EmptyComponent />}
            </View>
        );
    }

    renderStartPersonalizationButton(): JSX.Element {
        return (
            <Button
                full
                style={[applicationStyles.tealButton, { paddingHorizontal: 30, paddingVertical: 30, marginBottom: 30 }]}
                onPress={() => this.onPersonalizationButtonPress()}
            >
                <Text style={textStyles.button}>
                    <Trans>Start personalization</Trans>
                </Text>
            </Button>
        );
    }

    onPersonalizationButtonPress(): void {
        this.props.setOnboarding();
        goToRouteWithoutParameter(Routes.Questionnaire, this.props.history);
    }

    renderSkipPersonalizationButton(): JSX.Element {
        return (
            <Button
            style={{ backgroundColor: 'transparent', paddingHorizontal: 35 }}
            onPress={() => this.onSkipPersonalizationButtonPress()}
        >
            <Text style={{
                color: colors.sunshine,
                fontSize: 16, fontFamily: 'AvenirBlack',
            }}>
                <Trans>Skip personalization</Trans>
            </Text>
        </Button>
        );
    }

    onSkipPersonalizationButtonPress(): void {
        this.props.setOnboarding();
        goToRouteWithoutParameter(Routes.Welcome, this.props.history);
    }

    renderNavigationButtons(): JSX.Element {
        const hasNextPage = this.state.pageIndex < pages.length - 1;
        const hasPrevPage = this.state.pageIndex > 0;
        const backButton = <Button style={{backgroundColor: 'transparent', alignSelf: 'flex-start'}} onPress={() => this.onBackButtonPress()}>
                                 <Trans><Text style={{ color: colors.teal }}>Back</Text></Trans>
                            </Button>;
        const nextButton = <Button style={{backgroundColor: 'transparent', alignSelf: 'flex-end'}} onPress={() => this.onNextButtonPress()}>
                                <Trans><Text style={{ color: colors.teal }}>Next</Text></Trans>
                            </Button>;
        return (<View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10,
        }}>

            {hasPrevPage ? backButton : <View/>}
            {hasNextPage ? nextButton : <View/>}
        </View>
        );
    }

    onNextButtonPress(): void {
        const page = this.state.pageIndex;
        this.setState({pageIndex: page + 1});
    }

    onBackButtonPress(): void {
        const page = this.state.pageIndex;
        this.setState({pageIndex: page - 1 });
    }
}

const OnBoardingPage = (props: OnBoardingPageProps): JSX.Element => (
    <View style={{
        backgroundColor: colors.white,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginHorizontal: 25,
        marginVertical: 25,

    }}>
        <Image
            source={props.image}
            resizeMode={'contain'}
            style={{
                width: arrivalAdvisorLogoSize,
                height: arrivalAdvisorLogoSize,
                marginBottom: 20,
                marginVertical: 15,
                alignSelf: 'center',
            }}
        />
        <Text style={textStyles.headlineH2StyleBlackCenter}>{props.title}</Text>
        <Text style={{
            fontSize: 16,
            textAlign: 'center',
            lineHeight: 21,
            marginTop: 22,
            marginBottom: 30,
        }}>{props.subtitle}</Text>
    </View>
);
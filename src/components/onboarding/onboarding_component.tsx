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
import { Routes, goToRouteWithoutParameter, goToRouteWithParameter, MatchParameters } from '../../application/routing';

export interface OnBoardingPageProps {
    readonly key: string;
    readonly title: JSX.Element;
    readonly subtitle: JSX.Element;
    readonly image: any;
}

export interface OnboardingComponentProps {
    readonly history: History;
    readonly routeParameter: MatchParameters;
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

export class OnboardingComponent extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
            }}>
                {this.renderPage()}
                {this.renderPersonalizationButtons()}
                {this.renderNavigationButtons()}
            </View>
        );
    }

    renderPage(): JSX.Element {
        const pageIndex = this.pageIndex();
        return <OnBoardingPage {...pages[pageIndex]} />;
    }

    pageIndex(): number {
        const indexAsString = this.props.routeParameter.page;
        const index = parseInt(indexAsString, 10);
        if (index >= 0 && index < pages.length) {
            return index;
        }
        throw new Error(`${indexAsString}: Invalid onboarding page index, number expected`);
    }

    renderPersonalizationButtons(): JSX.Element {
        const isLastPage = this.pageIndex() === pages.length - 1;
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
                onPress={(): void => this.onPersonalizationButtonPress()}
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
                onPress={(): void => this.onSkipPersonalizationButtonPress()}
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
        const pageIndex = this.pageIndex();
        const hasNextPage = pageIndex < pages.length - 1;
        const hasPrevPage = pageIndex > 0;
        const backButton = <Button style={{ backgroundColor: 'transparent', alignSelf: 'flex-start' }} onPress={this.onButtonPress(this.pageIndex() - 1)}>
            <Trans><Text style={{ color: colors.teal }}>Back</Text></Trans>
        </Button>;
        const nextButton = <Button style={{ backgroundColor: 'transparent', alignSelf: 'flex-end' }} onPress={this.onButtonPress(this.pageIndex() + 1)}>
            <Trans><Text style={{ color: colors.teal }}>Next</Text></Trans>
        </Button>;
        return (<View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10,
        }}>

            {hasPrevPage ? backButton : <View />}
            {hasNextPage ? nextButton : <View />}
        </View>
        );
    }

    onButtonPress(nextPage: number): () => void {
        const nextPageAsString = '' + nextPage;
        return goToRouteWithParameter(Routes.Onboarding, nextPageAsString, this.props.history);
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

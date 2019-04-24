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
    readonly title: string;
    readonly subtitle: string;
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
        title: 'Get trusted information',
        subtitle: 'Learn about employment, health care, and everything else to start your new life in British Columbia',
        image: onBoardingPhoto,
    },
    {
        key: '1',
        title: 'Find helpful services nearby',
        subtitle: 'Find organizations that can help you settle into your new community.',
        image: onBoardingPhoto,
    },
    {
        key: '2',
        title: 'Get information based on your needs',
        subtitle: `Answer a few questions about your situation to get personalized
         recommendations of topics and services to help you settle in British Columbia.`,
        image: onBoardingPhoto,
    },
];

const arrivalAdvisorLogoSize = Dimensions.get('screen').width / 1.5;

export type Props = OnboardingAction & OnboardingComponentProps;
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

    onNextButtonPress(): void {
        let page = this.state.pageIndex;
        this.setState({pageIndex: page += 1});
    }

    onBackButtonPress(): void {
        let page = this.state.pageIndex;
        this.setState({pageIndex: page -= 1 });
    }

    onPersonalizationButtonPress(): void {
        this.props.setOnboarding();
        goToRouteWithoutParameter(Routes.Questionnaire, this.props.history);
    }

    onSkipPersonalizationButtonPress(): void {
        this.props.setOnboarding();
        goToRouteWithoutParameter(Routes.Welcome, this.props.history);
    }

    renderPage(pageIndex: number): JSX.Element {
        const activePage = pages[pageIndex] ;
        return <OnBoardingPage {...activePage} />;
    }

    renderPersonalizationButton(): JSX.Element {
        const isLastPage = this.state.pageIndex === pages.length - 1;
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {isLastPage ? <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                        full
                        style={[applicationStyles.tealButton, { paddingHorizontal: 30, paddingVertical: 30, marginBottom: 30 }]}
                        onPress={() => this.onPersonalizationButtonPress()}
                    >
                        <Text style={textStyles.button}>
                            <Trans>Start personalization</Trans>
                        </Text>
                    </Button>
                    <Button
                        style={{ backgroundColor: 'transparent', paddingHorizontal: 35 }}
                        onPress={() => this.onSkipPersonalizationButtonPress()}
                    >
                        <Text style={{
                            color: colors.sunshine,
                            fontSize: 16, fontFamily: 'AvenirBlack'
                        }}>
                            <Trans>Skip personalization</Trans>
                        </Text>
                    </Button>
                </View> : <EmptyComponent />}
            </View>
        );
    }

    renderNavigationButtons(): JSX.Element {
        const hasNextPage = this.state.pageIndex < pages.length - 1;
        const hasPrevPage = this.state.pageIndex > 0;
        return (<View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10,
        }}>

            {hasPrevPage ? <Button style={{backgroundColor: 'transparent', alignSelf: 'flex-start'}} onPress={() => this.onBackButtonPress()}>
                <Trans><Text style={{ color: colors.teal }}>Back</Text></Trans>
            </Button> : <View/>}
            {hasNextPage ? <Button style={{backgroundColor: 'transparent', alignSelf: 'flex-end'}} onPress={() => this.onNextButtonPress()}>
                <Trans><Text style={{ color: colors.teal }}>Next</Text></Trans>
            </Button> : <View/>}
        </View>
        );
    }

    render(): JSX.Element {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
            }}>
                {this.renderPage(this.state.pageIndex)}
                {this.renderPersonalizationButton()}
                {this.renderNavigationButtons()}
            </View>
        );
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
        <Text style={textStyles.headlineH2StyleBlackCenter}><Trans>{props.title}</Trans></Text>
        <Text style={{
            fontSize: 16,
            textAlign: 'center',
            lineHeight: 21,
            marginTop: 22,
            marginBottom: 30,
        }}><Trans>{props.subtitle}</Trans></Text>
    </View>
);
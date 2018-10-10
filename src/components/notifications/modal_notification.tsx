// tslint:disable:no-class no-this no-expression-statement readonly-keyword
import React from 'react';
import { StyleSheet, Dimensions, LayoutChangeEvent } from 'react-native';
import { Trans } from '@lingui/react';
import { Text, View, Icon, Button } from 'native-base';
import { Notification, NotificationType } from '../../stores/notifications';
import { colors } from '../../application/styles';
import { EmptyComponent } from '../empty_component/empty_component';
import { RouterProps, Routes, goToRouteWithoutParameter } from '../../application/routing';

export interface ModalNotificationProps {
    readonly notification: Notification;
}

export interface ModalNotificationActions {
    readonly removeNotification: () => void;
}

type Props = ModalNotificationProps & ModalNotificationActions & RouterProps;

interface State {
    readonly timeHasElapsed: boolean;
    readonly modalBottomPosition: number;
}

export class ModalNotificationComponent extends React.Component<Props, State> {
    timer: number;
    displayAfterMilliseconds: number = 180000; // Three minutes in milliseconds

    constructor(props: Props) {
        super(props);
        this.state = {
            timeHasElapsed: false,
            modalBottomPosition: undefined,
        };
        this.onLayoutChange = this.onLayoutChange.bind(this);
    }

    componentDidMount(): void {
        this.timer = setTimeout(() => {
            this.setState({
                ...this.state,
                timeHasElapsed: true,
            });
        }, this.displayAfterMilliseconds);
    }

    componentWillUnmount(): void {
        clearTimeout(this.timer);
        this.props.removeNotification();
    }

    render(): JSX.Element {
        return (
            <View style={this.getOverlayStyles()}>
                <View style={this.getModalStyles()} onLayout={this.onLayoutChange}>
                    {this.getComponentForContent()}
                </View>
            </View>
        );
    }

    private getOverlayStyles(): object {
        return this.shouldDisplayModal() ? styles.modalOverlay : undefined;
    }

    private getModalStyles(): object {
        return this.shouldDisplayModal() ? [styles.modal, { bottom: this.state.modalBottomPosition }] : undefined;
    }

    private getComponentForContent(): JSX.Element {
        if (this.shouldDisplayModal()) {
            if (this.props.notification.type === NotificationType.QuestionnaireInformation) {
                return this.withModalHeader(this.getContentForQuestionnaireInformation());
            }
        }
        return <EmptyComponent />;
    }

    private shouldDisplayModal(): boolean {
        const positionInitialized = Number.isInteger(this.state.modalBottomPosition);
        const timeHasElapsed = this.state.timeHasElapsed;
        return positionInitialized && timeHasElapsed;
    }

    private onLayoutChange(event: LayoutChangeEvent): void {
        this.setModalBottomPosition(event.nativeEvent.layout.height);
    }

    private setModalBottomPosition(modalHeight: number): void {
        const halfTheScreenHeight = Dimensions.get('screen').height / 2;
        const halfTheModalHeight = modalHeight / 2;
        const bottomPosition = Math.round(halfTheScreenHeight - halfTheModalHeight);
        this.setState({
            ...this.state,
            modalBottomPosition: bottomPosition,
        });
    }

    private withModalHeader(content: JSX.Element): JSX.Element {
        const onPress = (): void => this.props.removeNotification();
        return (
            <View>
                <View style={styles.modalHeader}>
                    <Button onPress={onPress} small>
                        <Icon name='close' />
                    </Button>
                </View>
                <View>{content}</View>
            </View>
        );
    }

    private getContentForQuestionnaireInformation(): JSX.Element {
        const goToQuestionnaire = (): void => {
            goToRouteWithoutParameter(Routes.Questionnaire, this.props.history)();
            this.props.removeNotification();
        };
        return (
            <View>
                <Text style={[{ textAlign: 'left', padding: 10 }]}>
                    <Trans>Help us recommend you tasks by answering a few questions.</Trans>
                </Text>
                <View style={[{ flexDirection: 'row', justifyContent: 'center', marginTop: 10}]}>
                    <Button onPress={goToQuestionnaire} rounded>
                        <Text><Trans>Go to questionnaire</Trans></Text>
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modalOverlay: {
        backgroundColor: colors.darkGreyWithAlpha,
        position: 'absolute',
        height: Dimensions.get('screen').height,
        bottom: 0,
        left: 0,
        right: 0,
    },
    modal: {
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        position: 'absolute',
        padding: 10,
        bottom: '50%',
        left: '5%',
        right: '5%',
    },
    modalHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});

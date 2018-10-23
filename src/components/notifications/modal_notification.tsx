// tslint:disable:no-class no-this no-expression-statement readonly-keyword
import React from 'react';
import { StyleSheet, Dimensions, LayoutChangeEvent, TouchableOpacity } from 'react-native';
import { View, Icon } from 'native-base';
import { Notification } from '../../stores/notifications';
import { colors, values } from '../../application/styles';
import { EmptyComponent } from '../empty_component/empty_component';

export interface ModalNotificationProps {
    readonly notification: Notification;
    readonly notificationContent: JSX.Element;
}

export interface ModalNotificationActions {
    readonly removeNotification: () => void;
}

type Props = ModalNotificationProps & ModalNotificationActions;

interface State {
    readonly timeHasElapsed: boolean;
    readonly modalBottomPosition: number;
}

export class ModalNotificationComponent extends React.Component<Props, State> {
    timer: number;
    threeMinutesInMilliSeconds: number = 180000;

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
        }, this.threeMinutesInMilliSeconds);
    }

    componentWillUnmount(): void {
        clearTimeout(this.timer);
        this.props.removeNotification();
    }

    render(): JSX.Element {
        return (
            <View style={this.getOverlayStyles()}>
                <View style={this.getModalStyles()} onLayout={this.onLayoutChange}>
                    {this.shouldDisplay() ? this.withHeader(this.props.notificationContent) : <EmptyComponent />}
                </View>
            </View>
        );
    }

    private getOverlayStyles(): object {
        return this.shouldDisplay() ? styles.modalOverlay : undefined;
    }

    private getModalStyles(): object {
        return this.shouldDisplay() ? [styles.modal, { bottom: this.state.modalBottomPosition }] : undefined;
    }

    private shouldDisplay(): boolean {
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

    private withHeader(content: JSX.Element): JSX.Element {
        const onPress = (): void => this.props.removeNotification();
        return (
            <View>
                <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={onPress}>
                        <Icon name='close' />
                    </TouchableOpacity>
                </View>
                <View>{content}</View>
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
        borderRadius: values.lessRoundedBorderRadius,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.lightGrey,
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

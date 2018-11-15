// tslint:disable:no-class no-this no-expression-statement readonly-keyword
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from 'native-base';
import { Trans } from '@lingui/react';
import { colors, fontFamily } from '../../application/styles';

export interface FloatingTaskCounterProps {
    readonly taskCount: number;
}

interface State {
    readonly taskCountChange: number;
}

type Props = FloatingTaskCounterProps;

export class FloatingTaskCounterComponent extends React.Component<Props, State> {
    timer: number;

    constructor(props: Props) {
        super(props);
        this.state = {
            taskCountChange: 0,
        };
    }

    componentDidUpdate(previousProps: Props): void {
        const difference = this.props.taskCount - previousProps.taskCount;
        if (difference !== 0) {
            this.setState({
                taskCountChange: difference,
            });
            this.timer = setTimeout(() => {
                this.setState({
                    taskCountChange: 0,
                });
            }, 1500);
        }
    }

    componentWillUnmount(): void {
        clearTimeout(this.timer);
    }

    render(): JSX.Element {
        return (
            <TouchableOpacity
                style={styles.floatingCount}
            >
                {this.getCountText()}
                <Text style={styles.smallFloatingText}>
                    {this.props.taskCount === 1 ? <Trans>task</Trans> : <Trans>tasks</Trans>}
                </Text>
                <Text style={styles.smallFloatingText}>
                    <Trans>recommended</Trans>
                </Text>
            </TouchableOpacity>
        );
    }

    private getCountText(): JSX.Element {
        if (this.state.taskCountChange === 0) {
            return this.getTaskCountText();
        }
        return (
            <View>
                {this.getTaskCountChangeText()}
                {this.getTaskCountText()}
            </View>
        );
    }

    private getTaskCountChangeText(): JSX.Element {
        const differenceText = this.state.taskCountChange < 0 ?
            this.state.taskCountChange : '+' + this.state.taskCountChange;
        return <Text style={styles.smallFloatingText}>{differenceText}</Text>;
    }

    private getTaskCountText(): JSX.Element {
        return <Text style={styles.largeFloatingText}>{this.props.taskCount} </Text>;
    }
}

const styles = StyleSheet.create({
    floatingCount: {
        backgroundColor: colors.orange,
        padding: 5,
        flex: 1,
        position: 'absolute',
        bottom: 20,
        right: 0,
        justifyContent: 'center',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
    },
    smallFloatingText: {
        fontFamily: fontFamily,
        fontSize: 12,
        color: colors.white,
        textAlign: 'center',
    },
    largeFloatingText: {
        fontFamily: fontFamily,
        fontSize: 20,
        color: colors.white,
        textAlign: 'center',
    },
});

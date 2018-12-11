// tslint:disable:no-class no-this no-expression-statement
import React from 'react';
import { View, Text } from 'react-native';
import Sentry from 'sentry-expo';

interface Props {
}

interface State {
    readonly error?: Error;
    readonly errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            error: undefined,
            errorInfo: undefined,
        };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        this.setState({
            error: error,
            errorInfo: errorInfo,
        });
        Sentry.captureException(error, {
            extra: errorInfo,
        });
    }

    render(): React.ReactNode {
        return this.state.error ? this.renderOnError() : this.renderOnOk();
    }

    renderOnError(): React.ReactNode {
        return (
            <View>
                <Text>{'Oh-no! Something went wrong'}</Text>
                <Text>{this.state.error && this.state.error.toString()}</Text>
            </View>
        );
    }

    renderOnOk(): React.ReactNode {
        return this.props.children;
    }
}

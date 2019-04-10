// tslint:disable:no-class no-expression-statement no-this
import React from 'react';
import { BackHandler } from 'react-native';
import { EmptyComponent } from '../empty_component/empty_component';

interface HardwareBackButtonHandlerComponentActions {
    readonly onHardwareBackButtonPress: () => void;
}

type Props = HardwareBackButtonHandlerComponentActions;

export class HardwareBackButtonHandlerComponent extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    componentDidMount(): void {
        BackHandler.addEventListener('hardwareBackPress', this.props.onHardwareBackButtonPress);
    }

    componentWillUnmount(): void {
        BackHandler.removeEventListener('hardwareBackPress', this.props.onHardwareBackButtonPress);
    }

    render(): JSX.Element {
        return <EmptyComponent />;
    }
}
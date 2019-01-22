// tslint:disable:no-class no-expression-statement no-this
import React from 'react';
import { AboutComponent } from './about_component';
import { API_URL } from 'react-native-dotenv';

interface Props {
}

interface State {
    readonly serverVersion: string;
}

export class AboutComponentWithServerVersion extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = { serverVersion: 'unknown' };
    }

    componentDidMount(): void {
        const url = API_URL + '/version';
        fetch(url).
            then((response: Response) => response.ok ? response.text() : 'error').
            then((serverVersion: string) => this.setState({ serverVersion })).
            catch((_: string) => this.setState({ serverVersion: 'exception' }));
    }

    render(): JSX.Element {
        return <AboutComponent serverVersion={this.state.serverVersion} />;
    }
}

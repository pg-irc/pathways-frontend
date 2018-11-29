// tslint:disable:no-this no-class no-any
import React from 'react';
import { Text, NativeBase } from 'native-base';

export class SelectableText extends React.Component<NativeBase.Text, any> {
    render(): JSX.Element {
        return <Text selectable={true} {...this.props} />;
    }
}

import React, { ReactElement } from 'react';
import { Spinner, View } from 'native-base';

export interface LoaderProps {
    readonly loading: boolean;
}

export const withLoader =
    <ChildProps extends object>
        (ChildComponent: React.ComponentType<ChildProps>): React.SFC<ChildProps & LoaderProps> =>
        ({ loading, ...props }: LoaderProps): ReactElement<ChildProps> => (
            loading ? <CenteredSpinner /> : <ChildComponent {...props} />
        );

function CenteredSpinner(): JSX.Element {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Spinner color='darkgrey' />
        </View>
    );
}

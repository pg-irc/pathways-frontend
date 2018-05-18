import React, { ComponentType, ReactElement } from 'react';
import { Text } from 'native-base';

export interface LoaderProps {
    readonly loading: boolean;
}

export function withLoader<
    Props extends LoaderProps,
    ChildProps extends Omit<Props, LoaderProps>
>(ChildComponent: ComponentType<ChildProps>): ComponentType<Props> {

    const LoaderComponent: ComponentType<Props> = (props: Props): ReactElement<ChildProps> => {
        const { loading, ...wrappedProps }: LoaderProps & object = props;
        return loading ? renderLoading() : renderLoaded(wrappedProps as ChildProps);
    };

    function renderLoading(): JSX.Element {
        return <Text>Loading...</Text>;
    }

    function renderLoaded(props: ChildProps): JSX.Element {
        return <ChildComponent { ...props } />;
    }

    return LoaderComponent;
}
import React, { ReactElement } from 'react';
import { Spinner, View } from 'native-base';

export interface LoaderProps {
    readonly loading: boolean;
}

// Without the cast to ChildProps below we get this error:
//
// "Type '{}' is not assignable to type 'ChildProps'. '{}' is assignable to the constraint of
// type 'ChildProps', but 'ChildProps' could be instantiated with a different subtype of constraint
// 'object'."
//
// This error is the compiler's way to stop the problem where this call
//
//      withLoader<PropsFoo>(ComponentBar);
//
// is made with a type ComponentBar whose properties are actually PropsBar, not PropsFoo.
// This should be invalid, even if both PropsBar and PropsFoo comply with the "extends object"
// constraint.
//
// https://github.com/Microsoft/TypeScript/issues/29049
// https://medium.com/androidiots/generics-variance-2def0411ce1b

export const withLoader =
    <ChildProps extends object>
        (ChildComponent: React.ComponentType<ChildProps>): React.SFC<ChildProps & LoaderProps> =>
        ({ loading, ...props }: LoaderProps): ReactElement<ChildProps> => (
            loading ? <CenteredSpinner /> : <ChildComponent {...props as ChildProps} />
        );

function CenteredSpinner(): JSX.Element {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Spinner color='darkgrey' />
        </View>
    );
}

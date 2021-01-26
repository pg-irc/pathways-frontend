import React from 'react';
import { Trans } from '@lingui/react';
import { Text, TouchableOpacity } from 'react-native';
import { colors, textStyles, values } from '../../application/styles';
import { Icon } from 'native-base';
import { goToRouteWithParameter, Routes } from '../../application/routing';
import { Id } from '../../stores/services';
import { useHistory } from 'react-router-native';
import { EmptyComponent } from '../empty_component/empty_component';

interface Props {
    readonly isVisible: boolean;
    readonly serviceId: Id;
}

export const PromptServiceReviewButton = (props: Props): JSX.Element => {
    const history = useHistory();
    const onPress = (): void => {
        // tslint:disable-next-line: no-expression-statement
        goToRouteWithParameter(Routes.ServiceReview, props.serviceId, history)();
    };

    if (!props.isVisible) {
        return <EmptyComponent />;
    }

    return (
        <TouchableOpacity
            style={{
                flex: 1,
                flexDirection: 'row',
                alignSelf: 'flex-start',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 10,
                paddingHorizontal: 15,
                marginLeft: 15,
                marginBottom: 20,
                borderRadius: values.roundedBorderRadius,
                borderColor: colors.grey,
                borderWidth: 1,
            }}
            onPress={onPress}
        >
            <Icon
                name='smile'
                type='FontAwesome5'
                style={{ fontSize: 25, marginRight: 10, color: colors.teal }}
            />
            <Text style={textStyles.buttonTealText}>
                <Trans>Was this service helpful?</Trans>
            </Text>
        </TouchableOpacity>
    );
};
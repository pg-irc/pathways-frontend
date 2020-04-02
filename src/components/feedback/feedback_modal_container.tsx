// tslint:disable:no-expression-statement
import { Trans } from '@lingui/react';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useHistory } from 'react-router-native';

import { textStyles, colors } from '../../application/styles';
import { Routes, goToRouteWithParameter, ParsedQueryParameters } from '../../application/routing';
import { FeedbackReceiveUpdatesModal } from '../feedback/feedback_receive_updates_modal';
import { ServiceDetailIconComponent } from '../services/service_detail_icon';
import { EmptyComponent } from '../empty_component/empty_component';

import { FeedbackOptionsModalComponent } from './feedback_options_modal_component';

interface FeedbackModalContainerProps {
    readonly feedbackEnabled: boolean;
    readonly onSuggestAnUpdatePress: () => void;
    readonly serviceId: string;
    readonly query: ParsedQueryParameters;
}

export const FeedbackModalContainer = ({
    feedbackEnabled,
    onSuggestAnUpdatePress: onSuggestAnUpdate,
    serviceId,
    query,
}: FeedbackModalContainerProps): JSX.Element => {

    const history = useHistory();

    const [optionsModalVisible, setOptionsModalVisible]: readonly[boolean, Dispatch<SetStateAction<boolean>>]
        = useState<boolean>(query.optionsModalVisible === 'true');

    const [receiveUpdatesModalVisible, setReceiveUpdatesModalVisible]: readonly[boolean, Dispatch<SetStateAction<boolean>>]
        = useState<boolean>(query.receiveUpdatesModalVisible === 'true');

    const goToFeedbackOtherScreen = goToRouteWithParameter(
        Routes.Feedback,
        serviceId,
        history,
        { mode: 'OTHER' },
    );

    const goToFeedbackRemoveServiceScreen = goToRouteWithParameter(
        Routes.Feedback,
        serviceId,
        history,
        { mode: 'REMOVE_SERVICE' },
    );

    const onOtherPress = (): void => {
        goToFeedbackOtherScreen();
    };

    const onRemoveServicePress = (): void => {
        goToFeedbackRemoveServiceScreen();
    };

    const onSuggestAnUpdatePress = (): void => {
        setOptionsModalVisible(false);
        onSuggestAnUpdate();
    };

    const onFeedbackButtonPress = (): void => {
        setOptionsModalVisible(true);
    };

    const onCloseFeedbackOptions = (): void => {
        setOptionsModalVisible(false);
    };

    const onHideReceiveUpdatesModal = (): void => {
        setReceiveUpdatesModalVisible(false);
    };

    return (
        <>
            <FeedbackButton isVisible={!feedbackEnabled} onPress={onFeedbackButtonPress} />
            <FeedbackOptionsModalComponent
                isVisible={optionsModalVisible}
                onClose={onCloseFeedbackOptions}
                onSuggestAnUpdatePress={onSuggestAnUpdatePress}
                onOtherPress={onOtherPress}
                onRemoveServicePress={onRemoveServicePress}
            />
            <FeedbackReceiveUpdatesModal isVisible={receiveUpdatesModalVisible} onHide={onHideReceiveUpdatesModal} />
        </>
    );
};

const FeedbackButton = (props: { readonly isVisible: boolean, readonly onPress: () => void } ): JSX.Element => {
    if (!props.isVisible) {
        return <EmptyComponent />;
    }
    return (
        <View style={{flexDirection: 'row-reverse', marginBottom: 20}}>
        <TouchableOpacity
            onPress={props.onPress}
            style={{ borderWidth: 1, borderColor: colors.greyBorder, borderRadius: 20 , paddingVertical: 10, paddingHorizontal: 16 }}
        >
            <View style={{ flexDirection: 'row'}}>
                <ServiceDetailIconComponent name={'edit'} />
                <Text style={textStyles.paragraphBoldBlackLeft}>
                    <Trans>Suggest an update</Trans>
                </Text>
            </View>
        </TouchableOpacity>
    </View>
    );
};
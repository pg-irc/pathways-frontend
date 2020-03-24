// tslint:disable:no-expression-statement
import { Trans } from '@lingui/react';
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useHistory } from 'react-router-native';

import { textStyles, colors } from '../../application/styles';
import { Routes, goToRouteWithParameters } from '../../application/routing';
import { useQuery } from '../../hooks/use_query';
import { FeedbackReceiveUpdatesModal } from '../feedback/feedback_receive_updates_modal';
import { ServiceDetailIconComponent } from '../services/service_detail_icon';
import { EmptyComponent } from '../empty_component/empty_component';

import { FeedbackOptionsModalComponent } from './feedback_options_modal_component';

interface FeedbackModalContainerProps {
    readonly feedbackEnabled: boolean;
    readonly onSuggestAnUpdatePress: () => void;
    readonly serviceId: string;
}

interface FeedbackModalControls {
    readonly onFeedbackButtonPress: () => void;
    readonly onSuggestAnUpdatePress: () => void;
    readonly onOtherPress: () => void;
    readonly onRemoveServicePress: () => void;
    readonly onCloseFeedbackOptions: () => void;
}

interface ModalState {
    readonly visible: boolean;
    readonly show: () => void;
    readonly hide: () => void;
    readonly toggle: () => void;
}

const useModalState = (initialValue: boolean): ModalState => {
    const [visible, setVisible]: readonly[boolean, Dispatch<SetStateAction<boolean>>]
        = useState<boolean>(initialValue);

    const show = useCallback(
        (): void => setVisible(true),
        [setVisible],
    );

    const hide = useCallback(
        (): void => setVisible(false),
        [setVisible],
    );

    const toggle = useCallback(
        (): void => setVisible(!visible),
        [visible, setVisible],
    );

    return { visible, show, hide, toggle };
};

/**
 * This hook attempts to abstract the onPress callbacks for Other and Remove Service options.
 * The controls do not attempt to manage the state of suggestion modal visibility.
 *
 */
const useFeedbackModalControls = (modalState: ModalState, serviceId: string, onSuggestAnUpdate: () => void): FeedbackModalControls => {
    const history = useHistory();

    const goToFeedbackOtherScreen = goToRouteWithParameters(
        Routes.Feedback,
        serviceId,
        { mode: 'OTHER' },
        history,
    );

    const goToFeedbackRemoveServiceScreen = goToRouteWithParameters(
        Routes.Feedback,
        serviceId,
        { mode: 'REMOVE_SERVICE' },
        history,
    );

    const onOtherPress = useCallback<() => void>(
        (): void => {
            goToFeedbackOtherScreen();
        },
        [history],
    );

    const onRemoveServicePress = useCallback<() => void>(
        (): void => {
            goToFeedbackRemoveServiceScreen();
        },
        [history],
    );

    const onSuggestAnUpdatePress = useCallback<() => void>(
        (): void => {
            modalState.hide();
            onSuggestAnUpdate();
        },
        [modalState, onSuggestAnUpdate],
    );

    const onFeedbackButtonPress = useCallback<() => void>(
        (): void => modalState.show(),
        [modalState],
    );

    const onCloseFeedbackOptions = useCallback(
        (): void => modalState.hide(),
        [modalState],
    );

    return {
        onFeedbackButtonPress,
        onSuggestAnUpdatePress,
        onOtherPress,
        onRemoveServicePress,
        onCloseFeedbackOptions,
    };
};

export const FeedbackModalContainer = ({
    feedbackEnabled,
    onSuggestAnUpdatePress: onSuggestAnUpdate,
    serviceId,
}: FeedbackModalContainerProps): JSX.Element => {
    const query = useQuery();

    const optionsModalState: ModalState = useModalState(query.optionsModalVisible === 'true');

    const receiveUpdatesModalState: ModalState = useModalState(query.receiveUpdatesModalVisible === 'true');

    const {
        onFeedbackButtonPress,
        onSuggestAnUpdatePress,
        onOtherPress,
        onRemoveServicePress,
        onCloseFeedbackOptions,
    }: FeedbackModalControls = useFeedbackModalControls(optionsModalState, serviceId, onSuggestAnUpdate);

    return (
        <>
            <FeedbackButton isVisible={!feedbackEnabled} onPress={onFeedbackButtonPress} />
            <FeedbackOptionsModalComponent
                isVisible={optionsModalState.visible}
                onClose={onCloseFeedbackOptions}
                onSuggestAnUpdatePress={onSuggestAnUpdatePress}
                onOtherPress={onOtherPress}
                onRemoveServicePress={onRemoveServicePress}
            />
            <FeedbackReceiveUpdatesModal isVisible={receiveUpdatesModalState.visible} />
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
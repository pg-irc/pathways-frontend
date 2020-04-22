// tslint:disable:no-expression-statement
import { Trans } from '@lingui/react';
import React, { Dispatch, SetStateAction } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { textStyles, colors } from '../../application/styles';
import { FeedbackReceiveUpdatesModal } from '../feedback/feedback_receive_updates_modal';
import { ServiceDetailIconComponent } from '../services/service_detail_icon';
import { EmptyComponent } from '../empty_component/empty_component';
import { FeedbackOptionsModalComponent } from './feedback_options_modal_component';
import { UserInformation } from '../../stores/feedback/types';

interface FeedbackModalContainerProps {
    readonly isSendingFeedback: boolean;
    readonly showSuggestAnUpdate: boolean;
    readonly showChoooseFeedbackModeModal: boolean;
    readonly showReceiveUpdatesModal: boolean;
    readonly setUserInformation: Dispatch<SetStateAction<UserInformation>>;
    readonly userInformation: UserInformation;
    readonly onSuggestAnUpdatePress: () => void;
    readonly onChangeNameOrDetailsPress: () => void;
    readonly onRemoveThisServicePress: () => void;
    readonly onOtherChangesPress: () => void;
    readonly onFinishPress: () => void;
    readonly closeModal: () => void;
}

export const FeedbackModalContainer = (props: FeedbackModalContainerProps): JSX.Element => (
    <>
        <SuggestAnUpdateButton
            isVisible={props.showSuggestAnUpdate}
            onPress={props.onSuggestAnUpdatePress}
        />
        {/* TODO Rename. */}
        <FeedbackOptionsModalComponent
            isVisible={props.showChoooseFeedbackModeModal}
            onClose={props.closeModal}
            // TODO Rename these.
            onSuggestAnUpdatePress={props.onChangeNameOrDetailsPress}
            onOtherPress={props.onOtherChangesPress}
            onRemoveServicePress={props.onRemoveThisServicePress}
        />
        <FeedbackReceiveUpdatesModal
            isVisible={props.showReceiveUpdatesModal}
            // TODO Rename.
            onHide={props.onFinishPress}
            isSendingFeedback={props.isSendingFeedback}
            setUserInformation={props.setUserInformation}
            userInformation={props.userInformation}
        />
    </>
);

const SuggestAnUpdateButton = (props: { readonly isVisible: boolean, readonly onPress: () => void } ): JSX.Element => {
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

import React from 'react';
import Modal from 'react-native-modal';
import { View, Text } from 'native-base';
import { colors, textStyles } from '../../application/styles';
import { TouchableOpacity } from 'react-native';
import { DividerComponent } from '../content_layout/divider_component';
import { Trans } from '@lingui/react';
import { CloseButtonComponent } from '../close_button_component';

export interface FeedbackModalProps {
    readonly onClosePress: () => void;
    readonly isVisible: boolean;
}

export interface ButtonsComponentProps {
    readonly onChangeNameOrOtherDetailPress: () => void;
    readonly onChooseOtherChangesPress: () => void;
    readonly onChooseRemoveServicePress: () => void;
    readonly onChooseExplainFeedback: () => void;
}

type Props = FeedbackModalProps & ButtonsComponentProps;

export const ChooseModeModal = (props: Props): JSX.Element => (
    <Modal
        isVisible={props.isVisible}
        onBackdropPress={props.onClosePress}
        onBackButtonPress={props.onClosePress}
        style={{ justifyContent: 'flex-end', margin: 0 }}
        backdropTransitionOutTiming={0}
    >
        <View padder style={{backgroundColor: colors.white, borderTopStartRadius: 20, borderTopEndRadius: 20}}>
           <HeaderComponent onClosePress={props.onClosePress}/>
           <DividerComponent />
           <ButtonsComponent {...props} />
           <DividerComponent />
           <SubtitleComponent {...props} />
        </View>
    </Modal>
);

const HeaderComponent = (props: { readonly onClosePress: () => void }): JSX.Element => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, marginHorizontal: 10 }}>
        <Text style={textStyles.paragraphStyleBrown}>
            <Trans>Suggest an update</Trans>
        </Text>
        <CloseButtonComponent
            color={colors.greyishBrown}
            additionalStyle={{ paddingTop: 0, paddingRight: 0,  paddingBottom: 0 }}
            onPress={props.onClosePress}
        />
    </View>
);

const ButtonsComponent = (props: ButtonsComponentProps): JSX.Element => (
    <View style={{ marginHorizontal: 10, marginVertical: -10 }}>
       <OptionButton name={<Trans>Change name or other details</Trans>} onPress={props.onChangeNameOrOtherDetailPress}/>
       <OptionButton name={<Trans>This service no longer exists</Trans>} onPress={props.onChooseRemoveServicePress}/>
       <OptionButton name={<Trans>Other suggestions</Trans>} onPress={props.onChooseOtherChangesPress}/>
    </View>
);

const OptionButton = (props: { readonly name: JSX.Element, readonly onPress: () => void }): JSX.Element => (
    <TouchableOpacity style={{marginVertical: 20}} onPress={props.onPress}>
        <Text style={textStyles.headlineH3StyleBlackLeft}>
            {props.name}
        </Text>
    </TouchableOpacity>
);

const SubtitleComponent = (props: ButtonsComponentProps): JSX.Element => (
    <View style={{ marginHorizontal: 10, marginBottom: 15 }}>
        <Text style={[textStyles.paragraphSmallStyleLeft, { fontSize: 14 }]}>
            <Trans>Your suggestions will be reviewed by our team before making final changes to the service information.</Trans>
            <Text style={textStyles.messageLink} onPress={props.onChooseExplainFeedback}>
                {' '}
                <Trans>Learn More</Trans>
            </Text>
        </Text>
    </View>
);

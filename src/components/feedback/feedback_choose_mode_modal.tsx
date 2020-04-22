import React from 'react';
import Modal from 'react-native-modal';
import { View, Text } from 'native-base';
import { colors, textStyles } from '../../application/styles';
import { TouchableOpacity } from 'react-native';
import { DividerComponent } from '../content_layout/divider_component';
import { Trans } from '@lingui/react';
import { CloseButtonComponent } from '../close_button_component';

export interface FeedbackModalProps {
    readonly isVisible: boolean;
    readonly closeModal: () => void;
}

export interface ButtonsComponentProps {
    readonly onChangeNameOrDetailsPress: () => void;
    readonly onOtherPress: () => void;
    readonly onRemoveServicePress: () => void;
}

type Props = FeedbackModalProps & ButtonsComponentProps;

export const FeedbackChooseModeModal = (props: Props): JSX.Element => (
    <Modal
        isVisible={props.isVisible}
        onBackdropPress={props.closeModal}
        style={{ justifyContent: 'flex-end', margin: 0 }}
        backdropTransitionOutTiming={0}
    >
        <View padder style={{backgroundColor: colors.white, borderTopStartRadius: 20, borderTopEndRadius: 20}}>
           <HeaderComponent closeModal={props.closeModal}/>
           <DividerComponent />
           <ButtonsComponent {...props} />
           <DividerComponent />
           <SubtitleComponent />
           <DividerComponent />
        </View>
    </Modal>
);

const HeaderComponent = (props: { readonly closeModal: () => void }): JSX.Element => (
    <View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 10}}>
        <Text style={textStyles.paragraphStyleBrown}>
            <Trans>Suggest an Update</Trans>
        </Text>
        <CloseButtonComponent
            color={colors.greyishBrown}
            additionalStyle={{ paddingTop: 0 }}
            onPress={props.closeModal}
        />
    </View>
);

const ButtonsComponent = (props: ButtonsComponentProps): JSX.Element => (
    <View style={{ marginHorizontal: 10 }}>
       <OptionButton name={<Trans>Change name or other details</Trans>} onPress={props.onChangeNameOrDetailsPress}/>
       <OptionButton name={<Trans>Remove this service</Trans>} onPress={props.onRemoveServicePress}/>
       <OptionButton name={<Trans>Other</Trans>} onPress={props.onOtherPress}/>
    </View>
);

const OptionButton = (props: { readonly name: JSX.Element, readonly onPress: () => void }): JSX.Element => (
    <TouchableOpacity style={{marginVertical: 10}} onPress={props.onPress}>
        <Text style={textStyles.headlineH3StyleBlackLeft}>
            {props.name}
        </Text>
    </TouchableOpacity>
);

const SubtitleComponent = (): JSX.Element => (
    <View>
        <Text style={textStyles.paragraphSmallStyleLeft}>
            <Trans>Your suggestions will be reviewed by our team before making final changes to the service information.</Trans>
        </Text>
    </View>
);
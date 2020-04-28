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
    readonly onClose: () => void;
}

export interface ButtonsComponentProps {
    readonly onSuggestAnUpdatePress: () => void;
    readonly onOtherPress: () => void;
    readonly onRemoveServicePress: () => void;
}

type Props = FeedbackModalProps & ButtonsComponentProps;

export const FeedbackOptionsModalComponent = (props: Props): JSX.Element => (
    <Modal
        isVisible={props.isVisible}
        onBackdropPress={props.onClose}
        style={{ justifyContent: 'flex-end', margin: 0 }}
    >
        <View padder style={{backgroundColor: colors.white, borderTopStartRadius: 20, borderTopEndRadius: 20}}>
           <HeaderComponent onClose={props.onClose}/>
           <DividerComponent />
           <ButtonsComponent {...props} />
           <DividerComponent />
           <SubtitleComponent />
           <DividerComponent />
        </View>
    </Modal>
);

const HeaderComponent = (props: { readonly onClose: () => void }): JSX.Element => (
    <View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 10}}>
        <Text style={textStyles.paragraphStyleBrown}>
            <Trans>Suggest an Update</Trans>
        </Text>
        <CloseButtonComponent
            color={colors.greyishBrown}
            additionalStyle={{ paddingTop: 0 }} 
            onPress={props.onClose}
        />
    </View>
);

const ButtonsComponent = (props: ButtonsComponentProps): JSX.Element => (
    <View style={{ marginHorizontal: 10 }}>
       <OptionButton name={<Trans>Change name or other details</Trans>} onPress={props.onSuggestAnUpdatePress}/>
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
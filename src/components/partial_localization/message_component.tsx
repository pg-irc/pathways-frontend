import React from 'react';
import { View, Text } from 'native-base';
import { textStyles, colors } from '../../application/styles';
import { TouchableOpacity } from 'react-native';
import { EmptyComponent } from '../empty_component/empty_component';

interface Props {
    readonly isVisible: boolean;
    readonly messageText: JSX.Element;
    readonly linkText: JSX.Element;
    readonly onLinkPress: () => void;
}

export const MessageComponent = (props: Props): JSX.Element => {
    if (!props.isVisible) {
        return <EmptyComponent />;
    }

    return (
        <View style={{ backgroundColor: colors.lightGrey }}>
            <View style={{ backgroundColor: colors.white, padding: 15, marginBottom: 8 }}>
                <Message text={props.messageText} />
                <Link text={props.linkText} onPress={props.onLinkPress}/>
            </View>
        </View>
    );
};

const Message = (props: { readonly text: Props['messageText'] }): JSX.Element => (
    <View>
        <Text style={textStyles.listItemDetail}>
            {props.text}
        </Text>
    </View>
);

const Link = (props: { readonly onPress: Props['onLinkPress'], readonly text: Props['linkText']}): JSX.Element => (
    <View style={{ marginTop: 10, flexDirection: 'row-reverse' }}>
        <TouchableOpacity onPress={props.onPress}>
            <Text style={[textStyles.messageLink, { fontSize: 16 }]}>
                {props.text}
            </Text>
        </TouchableOpacity>
    </View>
);
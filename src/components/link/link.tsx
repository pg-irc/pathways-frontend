// tslint:disable:no-expression-statement
import React from 'react';
import { Linking } from 'react-native';
import { Text } from 'native-base';
import { colors } from '../../application/styles';

interface AnchorProps {
    readonly href: string;
    readonly text: string;
}

const openURL = (url: string): void => {
    Linking.canOpenURL(url).then((supported: boolean) => {
        if (!supported) {
          console.log('Can\'t handle url: ' + url);
        } else {
          Linking.openURL(url).catch((error: string) => console.error(error));
        }
      }).catch((error: string) => console.error(error));
};

export const Link: React.StatelessComponent<AnchorProps> = (props: AnchorProps): JSX.Element => (
    <Text onPress={(): void => openURL(props.href)} style={[
        { color: colors.urlColor },
    ]}>
        {props.text}
    </Text>
);

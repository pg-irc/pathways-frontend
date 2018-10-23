// tslint:disable:no-expression-statement
import React from 'react';
import { Linking } from 'react-native';
import { Text } from 'native-base';

interface AnchorProps {
    readonly href: string;
    readonly text: string;
    readonly style?: object;
}

const openURL = (url: string): void => {
    Linking.canOpenURL(url).then((supported: boolean) => {
        if (supported) {
          Linking.openURL(url).catch((error: string) => console.error(error));
        } else {
          console.log('Can\'t handle url: ' + url);
        }
      }).catch((error: string) => console.error(error));
};

export const Link: React.StatelessComponent<AnchorProps> = (props: AnchorProps): JSX.Element => (
    <Text onPress={(): void => openURL(props.href)} style={[
        {
            fontWeight: 'bold',
            textDecorationLine: 'underline',
        },
        { ...props.style },
    ]}>
        {props.text}
    </Text>
);

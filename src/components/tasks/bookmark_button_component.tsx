import React from 'react';
import { Icon, View, Button } from 'native-base';
import { Dimensions } from 'react-native';
import { colors, applicationStyles } from '../../application/styles';

export interface BookmarkButtonProps {
    readonly isBookmarked: boolean;
}

export interface BookmarkButtonActions {
    readonly bookmarkupButtonOnPress: () => void;
}

type Props = BookmarkButtonProps & BookmarkButtonActions;

export const BookmarkButtonComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const height = Dimensions.get('screen').height;
    const position = Math.round(height / 25);
    return (
        <View style={{
            flex: 1,
            alignItems: 'flex-end',
            position: 'absolute',
            right: position,
            bottom: position,
        }}>
            <Button
                onPress={props.bookmarkupButtonOnPress}
                style={[
                    applicationStyles.boxShadowBelow,
                    {
                        backgroundColor: colors.topaz,
                        alignSelf: 'flex-end',
                        marginTop: 20,
                    },
                ]}
            >
                <Icon
                    type='FontAwesome'
                    style={{ color: colors.white, fontSize: 30 }}
                    name={props.isBookmarked ? 'bookmark' : 'bookmark-o'}
                />
            </Button>
        </View>
    );
};

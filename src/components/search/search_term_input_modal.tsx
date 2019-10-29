// tslint:disable:no-expression-statement
import React, { useState, useEffect } from 'react';
import { Icon } from 'native-base';
import { View } from 'native-base';
import { TouchableOpacity, Modal, TextInput } from 'react-native';
import { colors } from '../../application/styles';

interface Props {
    readonly visible: boolean;
    readonly placeholder: string;
    readonly currentRefinement: string;
    readonly refine: (searchTerms: string) => string;
    readonly onEndEditing: (s: string) => void;
}

export const SearchTermInputModal: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const [searchTerm, setSearchTerm]: [string, (s: string) => void] = useState(props.currentRefinement);

    useEffect(() => {
        props.refine(searchTerm);
    });

    const onEndEditing = (): void => {
        props.onEndEditing(searchTerm);
    };

    const BackButton = (): JSX.Element => (
        <TouchableOpacity onPress={onEndEditing}>
            <Icon name={'arrow-back'} style={{}} />
        </TouchableOpacity>
    );

    const ClearInputButton = (): JSX.Element => (
        <TouchableOpacity onPress={(): void => { setSearchTerm(''); }} >
            <Icon name={'window-close'} type='MaterialCommunityIcons' style={{ fontSize: 25 }} />
        </TouchableOpacity>
    );

    return <Modal visible={props.visible} transparent={false} presentationStyle={'fullScreen'}>
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: colors.darkerGrey }}>
            <BackButton />
            <TextInput
                value={searchTerm}
                onChangeText={setSearchTerm}
                onEndEditing={onEndEditing}
                placeholder={props.placeholder}
                style={{ flex: 1 }} />
            <ClearInputButton />
        </View>
    </Modal>;
};

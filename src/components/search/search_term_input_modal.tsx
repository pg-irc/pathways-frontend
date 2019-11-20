// tslint:disable:no-expression-statement
import React, { useState, useEffect } from 'react';
import { View } from 'native-base';
import { Modal, TextInput } from 'react-native';
import { applicationStyles } from '../../application/styles';
import { BackButton } from './back_button';
import { ClearInputButton } from './clear_input_button';

interface Props {
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
    const clearContent = (): void => {
        setSearchTerm('');
    };

    return <Modal visible={true} transparent={false} presentationStyle={'fullScreen'}>
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            ...applicationStyles.thinGreyBorderBelow,
        }}>
            <BackButton onPress={onEndEditing} />
            <TextInput
                autoFocus
                value={searchTerm}
                onChangeText={setSearchTerm}
                onEndEditing={onEndEditing}
                placeholder={props.placeholder}
                style={{
                    flex: 1,
                    paddingTop: 15,
                    paddingBottom: 15,
                }} />
            <ClearInputButton visible={searchTerm !== ''} onPress={clearContent} />
        </View>
    </Modal>;
};
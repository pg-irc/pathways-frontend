// tslint:disable:no-expression-statement
import React, { useState, useEffect } from 'react';
import { Icon } from 'native-base';
import { View } from 'native-base';
import { TouchableOpacity, Modal, TextInput } from 'react-native';
import { colors } from '../../application/styles';
import { EmptyComponent } from '../empty_component/empty_component';

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
        <TouchableOpacity onPress={onEndEditing} style={{ padding: 15 }} >
            <Icon name={'arrow-back'} style={{}} />
        </TouchableOpacity>
    );

    interface ClearInputButtonProps {
        readonly visible: boolean;
    }

    const ClearInputButton = ({ visible }: ClearInputButtonProps): JSX.Element => {
        if (!visible) {
            return <EmptyComponent />;
        }
        return <TouchableOpacity onPress={clearSearchTerm} style={{ padding: 15 }} >
            <Icon name={'window-close'} type='MaterialCommunityIcons' style={{ fontSize: 25 }} />
        </TouchableOpacity>;
    };

    const clearSearchTerm = (): void => setSearchTerm('');

    return <Modal visible={props.visible} transparent={false} presentationStyle={'fullScreen'}>
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: colors.darkerGrey,
        }}>
            <BackButton />
            <TextInput
                value={searchTerm}
                onChangeText={setSearchTerm}
                onEndEditing={onEndEditing}
                placeholder={props.placeholder}
                style={{
                    flex: 1,
                    paddingTop: 15,
                    paddingBottom: 15,
                }} />
            <ClearInputButton visible={searchTerm !== ''} />
        </View>
    </Modal>;
};
